import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar.js';
import HeadBar from './components/HeadBar.js';

import Login from './components/Login';
import Home from './components/Home';
import SelectPage from './components/SelectPage';
import Hire from './components/Hire';
import Navigation from './components/Navigation';
import NewProject from './components/NewProject';

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Login} exact/>
             <Route path="/home" component={Home}/>
             <Route path="/newproject" component={NewProject}/>
             <Route path="/select" component={SelectPage}/>
             <Route path="/hire" component={Hire}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;
