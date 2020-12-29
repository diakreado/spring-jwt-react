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
import CreatePost from './components/CreatePost';
import Search from './components/Search';
import Announcement from './components/Announcement';
import Accsettings from './components/Accsettings';
import EditPost from './components/EditPost';

function App() {
  return (
    <div className="App">
      <Router>
                 <Switch>
                     <Route path="/account">
                         <Account />
                     </Route>
                     <Route path="/rent">
                         <CreatePost />
                     </Route>
                     <Route path="/search">
                         <Search />
                     </Route>
                     <Route exact path="/adminpage/">
                         <Accsettings />
                     </Route>
                     <Route path="/adminpage/:id">
                         <Accsettings />
                     </Route>
                     <Route path="/requestediting/:id">
                         <EditPost />
                     </Route>
                     <Route path="/announcemet/:id">
                         <Announcement />
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
