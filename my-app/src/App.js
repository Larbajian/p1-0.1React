import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Input } from './components/input';
import { Output } from './components/output';


function App() {
  return (
    <Router>
      <div>
      <Switch>
          <Route exact path="/input">
            <h1>Upload Your Docs to Start Chatting</h1>
            <Input />
          </Route>

          <Route path="/output">
            <Output />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
