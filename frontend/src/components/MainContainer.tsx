import React, { useState } from 'react';

import {
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Auth  from '../service/AuthService';
import LoginForm from './LoginForm';
import CreatePostForm from './CreatePostForm';
import PostsContainer from './PostsContainer';

function MainComponent() {
    const [isLogged, setLogged] = useState(Auth.checkAuth());

    function handleLogout() {
        Auth.logout();
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
                            <Link to="/create">Create</Link>
                        </li>
                        <li>
                            <button onClick={ handleLogout }>logout</button>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/create">
                        <CreatePostForm />
                    </Route>
                    <Route path="/">
                        <div>
                            <h1>Home</h1>
                        </div>
                        <PostsContainer />
                    </Route>
                </Switch>
            </div>
    );
}

export default MainComponent;
