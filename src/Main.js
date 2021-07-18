import React, { Component } from 'react';
import logo from './logo.svg';

class Main extends Component {
  render() {
    return (
        <div className="contianer-fluid mt-5">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                  className="navbar-brand col-sm-3 col-md-2 mr-0"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                   Todo List | TTNguyen 
                </a>
                <ul className="navbar-nav px-3">
                  <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-secondary">
                      <small id="account">{this.props.account}</small>
                    </small>
                  </li>
                </ul>
                </nav>
                 <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                <div className="content mr-auto ml-auto">
                  <p>&nbsp;</p>
                  <h2>Todo List</h2>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const content = this.content.value
                        this.props.createTask(content)
                    }}> 
                    <div className="form-group">
                      <input
                        type="text"
                        ref={(input) => {this.content = input}}
                        className="form-control"
                        id="content"
                        required
                      />
                     <br/>
                     <button type="submit" class="btn btn-primary btn-block btn-lg">Create New Task</button>
                    </div>
                    </form>
                    <p>&nbsp;</p>
                    { this.props.tasks.map((task, key) => {
                        return (
                             <ul id="imageList" className="list-group list-group-flush">
                            <li key={key} className="list-group-item py-2">

                            <small className="float-left mt-1 text-muted">
                            {(key+1) + '. ' +  task.content}
                            </small>
                            <button disabled={task.completed}
                              className="btn btn-link btn-sm float-right pt-0"
                              onClick={(event) => {
                                  this.props.toggleCompleted(key)
                              }}
                            >
                            Make It done
                            </button>
                            </li>
                            </ul>
                        )
                    })}
                </div>
                </main>
        </div>
  );
  }
}

export default Main;
