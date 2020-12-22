import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// import {
//     Switch,
//     Route,
//     Link,
// } from "react-router-dom";
import Auth  from '../service/AuthService';
// import LoginForm from './LoginForm';
// import CreatePostForm from './CreatePostForm';
// import PostsContainer from './PostsContainer';

function AccountComponent() {
  const [isLogged, setLogged] = useState(Auth.checkAuth());


  function openTab(str : string) {
    console.log('openTab',str);
  }

  function choose() {
    console.log('choose');
  }

  function deleteRequest() {
    console.log('deleteRequest');
  }

  function deleteUser() {
    console.log('deleteUser');
  }
  
  function handleLogout() {
    Auth.logout();
    setLogged(false);
  }

    return (
        <>
        { !isLogged ? <Redirect to="/" /> : null }
          <header>
            <h3 id="logout" onClick={ handleLogout }>Выйти из аккаунта</h3>
            <a className="back-link" href="/">На главную</a>
          </header>
          <div className="grid-wrapper">
            <div className="col-1">
              <div className="acc-info">
                <div className="circle"></div>
                {/* <h2>{{name}}</h2> */}
                <h2>name</h2>
                <p></p>
              </div>
              <div className="acc-menu">
                <button className="menu-btn tablinks" onClick={ () => {openTab('1')} } id="defaultOpen">
                  {/* {% if roleUser %} */}
                    Список отправленных заявок
                  {/* {% elif roleStaff %} */}
                    Список заявок
                  {/* {% endif %} */}
                </button>
                <button className="menu-btn tablinks" onClick={ () => {openTab('2')} }>Личная информация</button>
                {/* {% if isSuper %} */}
                <button className="menu-btn tablinks" onClick={ () => {openTab('3')} }>Список аккаунтов</button>
                {/* {% endif %} */}
                {/* {% if roleOrganizer %} */}
                <button className="menu-btn tablinks" onClick={ () => {openTab('3')} }>Список принятых заявок</button>
                {/* {% endif %} */}
              </div>
            </div>
            <div className="col4">
              <div className="workspace">
                <div id="1" className="tabcontent">
                  <h3>Список</h3>
                  <div className="requests-list">
                    {/* {% for request in requests %} */}
                    <div>
                      <div className="request">
                        {/* <div className="state {{request.stateClass}}">{{request.stateText}}</div> */}
                        <div className="state {{request.stateClass}}">request.stateText</div>
                        <img src="https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg" />
                        <div className="text">
                          {/* <p>{{ request.title }}</p> */}
                          <p> request.title </p>
                          {/* <p>{{ request.adress }}</p> */}
                          <p> request.adress</p>
                          {/* <p>{{ request.description }}</p> */}
                          <p> request.description</p>
                          {/* {% if roleOrganizer %} */}
                          <p><button className="styled-btn" onClick={ choose }>Добавить в свой список</button></p>
                          {/* {% endif %} */}
                          {/* {% if roleUser %} */}
                          <p><button className="styled-btn" onClick={deleteRequest}>Удалить заявку</button></p>
                          {/* {% endif %} */}
                          <p><a href="announcemet/{{ request.id }}"><button className="styled-btn">Перейти к странице коливинга</button></a></p>
                        </div>
                      </div>
                    </div>
                    {/* {% empty %} */}
                      {/* Список пуст */}
                    {/* {% endfor %} */}
                  </div>
                </div>
                <div id="2" className="tabcontent">
                  <h3>Личная информация</h3>
                  <form id="data-form">
                    <div className="input-container">
                      <input id="name-field" name="name" type="text" placeholder="Ваше полное имя" className="input-field" autoComplete="off" value="{{userFullName}}"/>
                      <label htmlFor="name-field" className="textholder">Ваше полное имя</label>
                    </div>
                    <div className="input-container">
                      <input id="password-field" name="password" type="password" placeholder="Ваш пароль" className="input-field" autoComplete="off" value="{{userPassword}}"/>
                      <label htmlFor="password-field" className="textholder">Ваш пароль</label>
                    </div>
                    <div className="input-container">
                      <input id="contact-field" type="text" name="contact" placeholder="Ваши контактные данные" className="input-field" autoComplete="off" value="{{userContact}}"/>
                      <label htmlFor="contact-field" className="textholder">Ваши контактные данные</label>
                    </div>
                    <div id="error-msg" className="error-msg"></div>
                    <div id="ok-msg" className="ok-msg"></div>
                    <input type="submit" value="Изменить информацию" className="styled-btn"/>
                  </form>
                </div>
                {/* {% if isSuper %} */}
                <div id="3" className="tabcontent">
                  <h3>Список аккаунтов</h3>
                  <a href="adminpage/create">
                    <button className="styled-btn">Создать новый аккаунт</button>
                  </a>
                  <div className="accs-list">
                    <p>Имя</p>
                    <p>Логин</p>
                    <p>Контакт</p>
                    <p>Роль</p>
                    <p></p>
                    <p></p>
                    {/* {% for acc in accounts %} */}
                      {/* <p>{{ acc.name }}</p> */}
                      <p> acc.name </p>
                      {/* <p>{{ acc.login }}</p> */}
                      <p> acc.login</p>
                      {/* <p>{{ acc.contact }}</p> */}
                      <p> acc.contact </p>
                      <p>
                        {/* {% if acc.isUser %} */}
                          user
                        {/* {% elif acc.isOrganizer %} */}
                          organizer
                        {/* {% elif acc.isConsultant %} */}
                          consultant
                        {/* {% endif %} */}
                      </p>
                      <p><a href="adminpage/change/{{acc.login}}"><button className="styled-btn">Редактировать</button></a></p>
                      <p><button className="styled-btn" onClick={deleteUser}>Удалить</button></p>
                    {/* {% endfor %} */}
                  </div>
                </div>
                {/* {% endif %} */}
                {/* {% if roleStaff and not isSuper %} */}
                <div id="3" className="tabcontent">
                  <h3>Список принятых заявок</h3>
                  <div className="requests-list">
                    {/* {% for request in accepted %} */}
                    <a href="requestediting/{{ request.id }}">
                      <div className="request">
                        {/* <div className="state {{request.stateClass}}">{{request.stateText}}</div> */}
                        <div className="state {{request.stateClass}}">request.stateText</div>
                        {/* <img src="{% get_media_prefix %}{{ request.image }}"/> */}
                        <img src="https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg"/>
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
                {/* {% endif %} */}
              </div>
            </div>
          </div>
        </>
    );
}

export default AccountComponent;
