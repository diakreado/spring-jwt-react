import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// import {
//     Switch,
//     Route,
//     Link,
// } from "react-router-dom";
import Auth  from '../service/AuthService';
// import LoginForm from './LoginForm';
// import CreatePostForm from './CreatePostForm';
// import PostsContainer from './PostsContainer';

function MainComponent() {
    const [isLogged, setLogged] = useState(Auth.checkAuth());
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [whichTabIsOpen, setWhichTabIsOpen] = useState('login');
    const [authData, setAuthData] = useState({ login : Auth.name(), password : '' });
    const [registerData, setRegisterData] = useState({ login : '', password : '', email : '', fullname : '' });

    // const userName = "foo";

    // function handleLogout() {
    //     Auth.logout();
    //     setLogged(false);
    // }

    async function handleLogin(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('authData', authData);
        const result = await Auth.login(authData.login, authData.password);
        if (result) {
          toggleLogin();
          setLogged(true);
        }
    }

    function onLoginChange(e : React.ChangeEvent<HTMLInputElement>) {
      setAuthData({ ...authData, login : e.target.value });
    }
  
  function onPasswordChange(e : React.ChangeEvent<HTMLInputElement>) {
    setAuthData({ ...authData, password : e.target.value });
  }

    function toggleInfo() {
        console.log('toggleInfo');
    }

    function toggleLogin() {
      setLoginOpen(!isLoginOpen);
    }

    function openTab(tab : string) {
        console.log('openTab', tab);
        setWhichTabIsOpen(tab);
        console.log(whichTabIsOpen);
    }

    function handleRegisterEmailChange(e : React.ChangeEvent<HTMLInputElement>) {
      setRegisterData({ ...registerData, email : e.target.value });
    }

    function handleRegisterFullnameChange(e : React.ChangeEvent<HTMLInputElement>) {
      setRegisterData({ ...registerData, fullname : e.target.value });
    }

    function handleRegisterLoginChange(e : React.ChangeEvent<HTMLInputElement>) {
      setRegisterData({ ...registerData, login : e.target.value });
    }

    function handleRegisterPasswordChange(e : React.ChangeEvent<HTMLInputElement>) {
      setRegisterData({ ...registerData, password : e.target.value });
    }

    async function handleRegister(e : React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      console.log('handleRegister', registerData);
      Auth.register(registerData.email, registerData.login, registerData.password);
    }


    return (
        <div>
          <header>
            <h3 onClick={ toggleInfo }>Как это работает?</h3>

            { isLogged ? <Link to="/account">{ authData.login }</Link>
                       : <h3 onClick={ toggleLogin }>Войти / Зарегистрироваться</h3> }

          </header>
          <div className="flex-wrapper">
            <div className="container searching">
              <div className="greetings">
                <h2>Я ищу жилье!</h2>
                { isLogged ? <Link to="/search" className="link-button">Начать поиск</Link>
                           : "Сначала нужно зарегистрироваться" }
              </div>
            </div>
            <div className="container renting">
              <div className="greetings">
                <h2>Я сдаю жилье!</h2>

                { isLogged ? <Link to="/rent" className="link-button">Создать анкету</Link>
                           : "Сначала нужно зарегистрироваться" }

              </div>
            </div>
          </div>
          <div className="placeholder placeholder-info">
            <div className="dialog">
              <h2>Как это работает?</h2>
              <p>Люди, которые предлагают место жительства для коливинга, создают объявления. А люди, которые ищут коливинг, выбирают подходящее себе из списка!</p>
              <button  className="styled-btn" onClick={ toggleInfo }>Понятно</button>
            </div>
          </div>
          <div className="placeholder placeholder-login" style={{ display : isLoginOpen ? 'flex' : 'none', }}>
            <div className="dialog">
              <div className="close-btn" onClick={ toggleLogin }></div>
              <div className="tab">
                <button className="styled-btn tablinks" onClick={ () => { openTab('login')    } } id="defaultOpen">Войти</button>
                <button className="styled-btn tablinks" onClick={ () => { openTab('register') } }>Создать аккаунт</button>
              </div>
              {
                whichTabIsOpen === 'login' ?
                              <div id="Login" className="tabcontent">
                              <form id="login-form" onSubmit={ handleLogin }>
                                <div className="input-container">
                                  <input id="login-field" name="login" type="text" placeholder="Ваш логин" value={ authData.login }
                                         className="input-field"  autoComplete="off" required onChange={ onLoginChange }/>
                                  <label htmlFor="login-field" className="textholder">Ваш логин</label>
                                </div>
                                <div className="input-container">
                                  <input id="password-field" name="password" type="password" placeholder="Ваш пароль" value={ authData.password }
                                         className="input-field" autoComplete="off" required onChange={ onPasswordChange } />
                                  <label htmlFor="password-field" className="textholder">Ваш пароль</label>
                                </div>
                                <div id="login-error-msg" className="error-msg"></div>
                                <input type="submit" value="Войти" className="styled-btn" />
                              </form>
                            </div>
                   : null
              }
              {
                whichTabIsOpen === 'register' ?
                            <div id="Register" className="tabcontent">
                              <form id="register-form" onSubmit={ handleRegister }>
                                <div className="input-container">
                                  <input id="name-field" name="name" type="text" placeholder="Ваше полное имя" value={ registerData.fullname }
                                              className="input-field" autoComplete="off" required onChange={ handleRegisterFullnameChange } />
                                  <label htmlFor="name-field" className="textholder">Ваше полное имя</label>
                                </div>
                                <div className="input-container">
                                  <input id="register-login-field" name="login" type="text" placeholder="Ваш логин" value={ registerData.login }
                                              className="input-field" autoComplete="off" required onChange={ handleRegisterLoginChange } />
                                  <label htmlFor="register-login-field" className="textholder">Ваш логин</label>
                                </div>
                                <div className="input-container">
                                  <input id="register-password-field" name="password" type="password" placeholder="Ваш пароль" value={ registerData.password }
                                              className="input-field" autoComplete="off" required onChange={ handleRegisterPasswordChange } />
                                  <label htmlFor="register-password-field" className="textholder">Ваш пароль</label>
                                </div>
                                <div className="input-container">
                                  <input id="contact-field" type="text" name="contact" placeholder="Ваши контактные данные" value={ registerData.email }
                                              className="input-field" autoComplete="off" required onChange={ handleRegisterEmailChange } />
                                  <label htmlFor="contact-field" className="textholder">Ваши контактные данные</label>
                                </div>
                                <div id="register-error-msg" className="error-msg"></div>
                                <input type="submit" value="Зарегистрироваться" className="styled-btn" />
                              </form>
                            </div>
                     : null
                }
            </div>
          </div>
          <div className="tooltip"></div>
        </div>
    );
}

export default MainComponent;
