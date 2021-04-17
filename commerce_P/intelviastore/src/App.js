import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import  RegisterForm from './components/Login/Login';


function App() {
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path='/Dashboard'>
            <Dashboard />
          </Route>
          <Route path='/login'>
            <RegisterForm />
          </Route>
          <Route path='/Preferences'>
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App; 