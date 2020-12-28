import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ConsultantService from '../service/UserService';
import PostProvider from '../service/PostProvider';

export default function Search() {
    const [findValue, setFindValue] = useState('');
    const [posts,     setPosts    ] = useState([] as any[]);
    const [contactConsultant, setContactConsultant] = useState({ name    : '',
                                                                 contact : '', });

    useEffect(() => {
        async function f() {
            const posts = await PostProvider.getPosts();
            console.log('posts',posts);
            
            setPosts(posts);
        }
        f();
    },[]);

    async function handleFind(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setFindValue(value);
        // const post = await PostProvider.findPost(value);
    }

    async function handleFindConsultant() {
        const consultant = await ConsultantService.getConsultant();
        setContactConsultant({
            name    : consultant.username,
            contact : consultant.email,
        });
        console.log('consultant', consultant);
    }

    return <>
        <header>
            <Link className="back-link" to="/">На главную</Link>
        </header>
        <div className="search-wrapper">
            <div className="dialog">
                <div className="input-container">
                    <input id="search-field" type="text" placeholder="Поиск..." value={ findValue } className="input-field" onChange={ handleFind } />
                    <label htmlFor="search-field" className="textholder"></label>
                </div>
                <div id="preloader">
                    <svg className="filter" version="1.1">
                        <defs>
                            <filter id="gooeyness">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooeyness" />
                                <feComposite in="SourceGraphic" in2="gooeyness" operator="atop"    />
                            </filter>
                        </defs>
                    </svg>
                    <div className="dots">
                        <div className="dot mainDot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="announcemets-grid">
                    {
                        posts.map((post, i) => (
                            <a key={ i } href={ `announcemet/${post.id}` }><div className="announcemet">
                              <div className="img-wrapper">
                                <img src="https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg"/>
                              </div>
                              <div className="description">
                                <h3>{ post.title }</h3>
                                <p>{  post.description }</p>
                              </div>
                            </div></a>
                        ))
                    }
                </div>
            </div>
        </div>
        <div id="search-consultant">
            <button className="styled-btn" onClick={ handleFindConsultant }>Найти консультанта</button>
            {
                contactConsultant.name !== '' ?
                        <div id="output">
                            <p>Имя: {      contactConsultant.name }</p>
                            <p>Контакты: { contactConsultant.contact }</p>
                        </div>
                    : null
            }
        </div>
    </>;
}