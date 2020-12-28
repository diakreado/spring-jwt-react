import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

// import {
//     Switch,
//     Route,
//     Link,
// } from "react-router-dom";
import Auth from '../service/AuthService';
import PostProvider from '../service/PostProvider';
import UserService from '../service/UserService';
// import LoginForm from './LoginForm';
// import CreatePostForm from './CreatePostForm';
// import PostsContainer from './PostsContainer';

function AccountComponent() {
    const [isLogged, setLogged] = useState(Auth.checkAuth());
    const [whichTabIsOpen, setWhichTabIsOpen] = useState('1');
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState([]);


    const [role, setRole] = useState('');
    
    useEffect(() => {
        async function f() {
            {
                const res = await Auth.getUserRole(Auth.name());
                setRole(res.role);
            }
            {
                const res = await PostProvider.getRequests();
                setRequests(res);
            }
            {
                const res = await UserService.getAll();
                setUsers(res);
            }
        }
        f();
    }, []);


    function openTab(str: string) {
        console.log('openTab', str);
        setWhichTabIsOpen(str);
    }

    function organizerAddToList() {
        console.log('organizerAddToList');
    }

    function userDeleteRequest(id : number) {
        console.log('deleteRequest', id);
        PostProvider.deletePost(id);

    }

    function deleteUser(id : number) {
        console.log('deleteUser', id);
        UserService.deleteUser({ id });
        setUsers(users.filter((user : any) => user.id !== id));
    }

    function handleLogout() {
        Auth.logout();
        setLogged(false);
    }

    // map(
    //     lambda x: {
    //       'stateText': 'Одобрено' if x.state == 1 else 'Отклонено' if x.state == 2 else 'На рассмотрении' if x.state == 0 else 'Реализация проекта',
    //       'stateClass': 'submit' if x.state == 1 else 'cancel' if x.state == 2 else 'watching',
    //       'title': x.title,
    //       'adress': x.adress,
    //       'description': x.description,
    //       'image': x.image,
    //       'id': x.id
    //     }, filter(lambda x: 
    //       x.user == user
    //       or user.isAdmin()
    //       or (user.isOrganizer() and x.state == 0)
    //       or user.isConsultant(),
    //     Request.objects.all())
    //   )
    // )

    // accounts = list(
    //     map(
    //       lambda x: {
    //         'name': x.name,
    //         'login': x.login,
    //         'contact': x.contact,
    //         'isUser': x.isUser(),
    //         'isOrganizer': x.isOrganizer(),
    //         'isConsultant': x.isConsultant(),
    //       }, filter(lambda x: not x.isAdmin(), ColivingUser.objects.all()))
    //   )
    

    // if user.isConsultant() or user.isOrganizer():
    // acceptedRequests = list(
    //     map(
    //       lambda x: {
    //         'stateText': 'Одобрено' if x.state == 1 else 'Отклонено' if x.state == 2 else 'На рассмотрении' if x.state == 0 else 'Реализация проекта',
    //         'stateClass': 'submit' if x.state == 1 else 'cancel' if x.state == 2 else 'watching',
    //         'title': x.title,
    //         'adress': x.adress,
    //         'description': x.description,
    //         'image': x.image,
    //         'id': x.id,
    //         'name': x.user.name,
    //         'contact': x.user.contact,
    //       }, filter(lambda x: user.isOrganizer() and x.organizer == user,
    //       Request.objects.all())
    //     )
    //   )

    // context = {
    //   'name': userLogin,
    //   'roleUser': user.isUser(),
    //   'roleStaff': user.isOrganizer() or user.isConsultant() or user.isAdmin(),
    //   'roleOrganizer': user.isOrganizer(),
    //   'userFullName': user.name,
    //   'userPassword': user.password,
    //   'userContact': user.contact,
    //   'requests': requests,
    //   'isSuper': user.isAdmin(),
    //   'accounts': accounts,
    //   'accepted': acceptedRequests
    // }

    return (
        <div>
            { !isLogged ? <Redirect to="/" /> : null}
            <header>
                <h3 id="logout" onClick={handleLogout}>Выйти из аккаунта</h3>
                <Link to="/" className="back-link">На главную</Link>
            </header>
            <div className="grid-wrapper">
                <div className="col-1">
                    <div className="acc-info">
                        <div className="circle"></div>
                        <h2>{ Auth.name() }</h2>
                        <p></p>
                    </div>
                    <div className="acc-menu">
                        <button className="menu-btn tablinks" onClick={() => { openTab('1') }} id="defaultOpen">
                            {
                                role === 'default' ?
                                        <>Список отправленных заявок</>
                                    :   <>Список заявок</>
                            }
                        </button>
                        {/* <button className="menu-btn tablinks" onClick={() => { openTab('2') }}>Личная информация</button> */}
                            {
                                role === 'super' ?
                                        <button className="menu-btn tablinks" onClick={() => { openTab('3') }}>Список аккаунтов</button>
                                    : null
                            }
                            {
                                role === 'organizer' ?
                                        <button className="menu-btn tablinks" onClick={() => { openTab('3') }}>Список принятых заявок</button>
                                    : null
                            }
                    </div>
                </div>
                <div className="col4">
                    <div className="workspace">
                        {
                            whichTabIsOpen.includes('1') ?
                                <div id="1" className="tabcontent">
                                    <h3>Список</h3>
                                    <div className="requests-list">

                                    {
                                        requests.map((request : any, i) => {
                                            return (
                                                <div>
                                                    <div className="request">
                                                        {
                                                            request.state === 'submit' ?
                                                                    <div className="state submit">Одобрено</div>
                                                          : request.state === 'cancel' ?
                                                                    <div className="state cancel">Отклонено</div>
                                                          : request.state === 'wait' ?
                                                                    <div className="state watching">На рассмотрении</div>
                                                                :
                                                                    <div className="state watching">Реализация проекта</div>
                                                        }
                                                        <div className="state {request.stateClass}">{ request.state === 'wait' ? 'На рассмотрении' : '' }</div>
                                                        <img src="https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg" />
                                                        <div className="text">
                                                            <p>{ request.title }</p>
                                                            {/* <p> request.adress</p> */}
                                                            <p>{ request.description }</p>

                                                            {
                                                                role === 'organizer' ?
                                                                        <p><button className="styled-btn" onClick={ organizerAddToList }>Добавить в свой список</button></p>
                                                                    : null
                                                            }
                                                            {
                                                                role === 'default' ?
                                                                        <p><button className="styled-btn" onClick={ () => userDeleteRequest(request.id) }>Удалить заявку</button></p>
                                                                    : null
                                                            }
                                                            <p><Link style={{ backgroundColor : 'blue' }} to={ `announcemet/${ request.id }` }>Перейти к странице коливинга</Link></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                        {/* {% for request in requests %} */}
                                        {/* {% empty %} */}
                                        {/* Список пуст */}
                                        {/* {% endfor %} */}
                                    </div>
                                </div>
                                : null
                        }
                        {/* {
                            whichTabIsOpen.includes('2') ?
                                <div id="2" className="tabcontent">
                                    <h3>Личная информация</h3>
                                    <form id="data-form">
                                        <div className="input-container">
                                            <input id="name-field" name="name" type="text" placeholder="Ваше полное имя" className="input-field" autoComplete="off" value="{{userFullName}}" />
                                            <label htmlFor="name-field" className="textholder">Ваше полное имя</label>
                                        </div>
                                        <div className="input-container">
                                            <input id="password-field" name="password" type="password" placeholder="Ваш пароль" className="input-field" autoComplete="off" value="{{userPassword}}" />
                                            <label htmlFor="password-field" className="textholder">Ваш пароль</label>
                                        </div>
                                        <div className="input-container">
                                            <input id="contact-field" type="text" name="contact" placeholder="Ваши контактные данные" className="input-field" autoComplete="off" value="{{userContact}}" />
                                            <label htmlFor="contact-field" className="textholder">Ваши контактные данные</label>
                                        </div>
                                        <div id="error-msg" className="error-msg"></div>
                                        <div id="ok-msg" className="ok-msg"></div>
                                        <input type="submit" value="Изменить информацию" className="styled-btn" />
                                    </form>
                                </div>
                                : null
                        } */}
                        {
                            whichTabIsOpen.includes('3') ?
                                <div id="3" className="tabcontent">
                                    <h3>Список аккаунтов</h3>
                                    <Link style={{ backgroundColor : 'blue', color : 'white' }} to='/adminpage/' >Создать новый аккаунт</Link>

                                    <div className="accs-list">
                                        <p>ID</p>
                                        <p>Логин</p>
                                        <p>Контакт</p>
                                        <p>Роль</p>
                                        <p></p>
                                        <p></p>
                                        {
                                            users.map((user : any) => {
                                                return <>
                                                    <p>{ user.id }</p>
                                                    <p>{ user.username }</p>
                                                    <p>{ user.email }</p>
                                                    <p>{ user.role }
                                                    </p>
                                                    <p><Link style={{ backgroundColor : 'blue', color : 'white' }} to={ `/adminpage/${ user.id }` } >Редактировать</Link></p>
                                                    <p><button className="styled-btn" onClick={ () => deleteUser(user.id) }>Удалить</button></p>
                                                </>
                                            })
                                        }
                                    </div>
                                </div>
                                : null
                        }
                        {
                            whichTabIsOpen.includes('3') && (role === 'organizer' || role === 'consultant') ?
                                <div id="3" className="tabcontent">
                                    <h3>Список принятых заявок</h3>
                                    <div className="requests-list">
                                        {/* {% for request in accepted %} */}
                                        <a href="requestediting/{{ request.id }}">
                                            <div className="request">
                                                {/* <div className="state {{request.stateClass}}">{{request.stateText}}</div> */}
                                                <div className="state {{request.stateClass}}">request.stateText</div>
                                                {/* <img src="{% get_media_prefix %}{{ request.image }}"/> */}
                                                <img src="https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg" />
                                                <div className="text">
                                                    {/* <p>{{ request.title }}</p> */}
                                                    <p>request.title</p>
                                                    {/* <p>{{ request.adress }}</p> */}
                                                    <p> request.adress </p>
                                                    {/* <p>{{ request.description }}</p> */}
                                                    <p> request.description</p>
                                                    {/* <p><b>Владелец: {{ request.name }}, {{ request.contact }}</b></p> */}
                                                    <p><b>Владелец: request.name ,  request.contact</b></p>
                                                </div>
                                            </div>
                                        </a>
                                        {/* {% empty %} */}
                                        {/* Список пуст */}
                                        {/* {% endfor %} */}
                                    </div>
                                </div>
                                : null
                        }

                        {/* {% if isSuper %} */}
                        {/* {% endif %} */}
                        {/* {% if roleStaff and not isSuper %} */}
                        {/* {% endif %} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountComponent;
