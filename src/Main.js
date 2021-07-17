import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
        <div className="container-fluid mt-5">
                <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                  <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">Dapp University | Todo List</a>
                  <ul class="navbar-nav px-3">
                    <li class="nav-item text-nowrap d-none d-sm-none d-sm-block">
                      <small><a class="nav-link" href="#"><span id="account"></span></a></small>
                    </li>
                  </ul>
                </nav>
                <div class="container-fluid">
                  <div class="row">
                    <main role="main" class="col-lg-12 d-flex justify-content-center">
                      <div id="loader" class="text-center">
                        <p class="text-center">Loading...</p>
                      </div>
                      <div id="content">
                        <form onSubmit="App.createTask(); return false;">
                          <input id="newTask" type="text" class="form-control" placeholder="Add task..." required/>
                          <input type="submit" hidden=""/>
                        </form>
                        <ul id="taskList" class="list-unstyled">
                          <div class="taskTemplate" class="checkbox" style="display: none">
                            <label>
                              <input type="checkbox" />
                              <span class="content">Task content goes here...</span>
                            </label>
                          </div>
                        </ul>
                        <ul id="completedTaskList" class="list-unstyled">
                        </ul>
                      </div>
                    </main>
                  </div>
                </div>
        </div>
   );
  }
}

export default Main;
