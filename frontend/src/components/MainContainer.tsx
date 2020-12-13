import React, { useState } from 'react';

import {
    Switch,
    Route,
    Link,
} from "react-router-dom";
import auth from '../service/auth';
import LoginForm from './LoginForm';

function MainComponent() {
    const [isLogged, setLogged] = useState(false);

    function handleLogout() {
        auth.logout();
        setLogged(false);
    }

    if (!isLogged) {
        return <LoginForm setLogged={ setLogged } />;
    }
    return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>logout</button>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/about">
                        <div>1</div>
                    </Route>
                    <Route path="/users">
                        <div>2</div>
                    </Route>
                    <Route path="/">
                        <div>3</div>
                    </Route>
                </Switch>
            </div>
    );
}

export default MainComponent;
