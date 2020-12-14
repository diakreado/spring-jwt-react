import React, { useState } from 'react';
import Auth from '../service/AuthService';


function LoginForm(props : any) {
    const [form,  setForm]  = useState({ login : "", password : "" });

    async function handleLoginForm(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const result = await Auth.login(form.login, form.password);
        props.setLogged(result);
    }

    function handleLoginInput(e : React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name] : e.target.value });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={ handleLoginForm }>
                <div>
                    <input type="login"
                           name="login"
                           placeholder="login"
                           value={ form.login }
                           onChange={ handleLoginInput } />
                </div>
                <div>
                    <input type="password"
                           name="password"
                           placeholder="password"
                           value={ form.password }
                           onChange={ handleLoginInput } />
                </div>
                <div>
                    <button type="submit">sign in</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;