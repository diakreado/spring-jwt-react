import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './stylesheets/account.css';
import './stylesheets/accsettings.css';
import './stylesheets/announcemet.css';
import './stylesheets/main.css';
import './stylesheets/rent.css';
import './stylesheets/requestediting.css';
import './stylesheets/search.css';

import MainContainer from './components/MainContainer';
import Account from './components/Account';

function App() {
  return (
    <div className="App">
      <Router>
                 <Switch>
                     <Route path="/account">
                         <Account />
                     </Route>
                     <Route path="/">
                          <MainContainer />
                     </Route>
                 </Switch>
      </Router>
    </div>
  );
}

export default App;
