import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import {Component} from 'react';
import Navbar from './Navbar'
import Main from './Main';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
          account: '',
          loading: true
        }
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

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        // Network ID
        const networkId = await web3.eth.net.getId()
        console.log(networkId);
   }

    render() {
        return (
              <div>
                <Navbar account={this.state.account} />
                { this.state.loading
                  ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                  : <Main
                      images={this.state.images}
                      captureFile={this.captureFile}
                      uploadImage={this.uploadImage}
                      tipImageOwner={this.tipImageOwner}
                    />
                }
              </div>
            );
    }
}

export default App;
