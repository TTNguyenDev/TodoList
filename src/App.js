import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import {Component} from 'react';
import Navbar from './Navbar'
import Main from './Main';
import Todo from './abis/TodoList.json';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
          account: '',
          todo: null,
          tasks: [],
          loading: true 
        }
        this.createTask = this.createTask.bind(this)
        this.toggleCompleted = this.toggleCompleted.bind(this)
    }

    async componentWillMount() {
        await this.loadWeb3()    
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    createTask = content => {
        this.setState({ loading: true })
        console.log(this.state.todo.tasks)
        this.state.todo.methods.createTask(content).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
            window.location.reload()
      })
    }
   
    toggleCompleted = taskId => {
        if (this.state.todo == null) { return }
        this.setState({ loading: true })
        this.state.todo.methods.toggleCompleted(taskId).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
        })
    }    


    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        // Network ID
        const networkId = await web3.eth.net.getId()
        const networkData = Todo.networks[networkId]

        if (networkData) {
            const todo = new web3.eth.Contract(Todo.abi, networkData.address)
            this.setState({ todo })

            const taskCount = await todo.methods.taskCount().call()
            this.setState({taskCount})

            //load tasks
            for (var i = 1; i <= taskCount; i++) {
                const task = await todo.methods.tasks(i).call()
                this.setState({
                    tasks: [...this.state.tasks, task]
                })
            }

            this.setState({
                loading: false
            })
        } else {
            window.alert('Cannot load web3 contract')
        }
   }

    render() {
        return (
              <div>
                <Navbar account={this.state.account} />
                { this.state.loading
                  ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                  : <Main tasks={this.state.tasks} 
                    createTask={this.createTask}
                    toggleCompleted={this.toggleCompleted}/>
                }
              </div>
            );
    }
}

export default App;
