import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PostProvider from '../service/PostProvider';


export default function CreatePost(props: any) {
    const [form, setForm] = useState({ adress: "", description: "" });
    const [redirect, setRedirect] = useState(false);

    async function handleSavePost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(form);

        PostProvider.createPost(form.adress, form.description);
        setRedirect(true);
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div>
            { redirect ? <Redirect to="/" /> : null}
            {/* <h1>Create post</h1>
            <form onSubmit={ handleLoginForm }>
                <div>
                    <label htmlFor ="title">title : </label>
                    <input type="text"
                           id="title"
                           name="title"
                           placeholder="title"
                           value={ form.title }
                           onChange={ handleInput } />
                </div>
                <div>
                    <label htmlFor ="description">description : </label>
                    <textarea id="description"
                              name="description"
                              placeholder="description"
                              value={ form.description }
                              onChange={ handleTextArea } />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form> */}

            <header>
                <Link className="back-link" to="/">На главную</Link>
            </header>
            <div className="rent-wrapper">
                <h1>Заполните заявку</h1>
                <div className="dialog">
                    <form onSubmit={handleSavePost} >
                        {/* <div className="input-container">
                      <input id="" type="text" placeholder="" className="input-field">
                      <label for="" className="textholder"></label>
                    </div> */}
                        <div className="input-container">
                            <input id="adress-field" type="text" name="adress" placeholder="Адресс места для коливинга"
                                className="input-field" autoComplete="off" required onChange={handleInput} value={form.adress} />
                            <label htmlFor="adress-field" className="textholder">Адресс места для коливинга</label>
                        </div>
                        <div className="input-container">
                            <textarea id="description-field" name="description" placeholder="Описание"
                                className="input-field" autoComplete="off" required onChange={handleTextArea}  >{form.description}</textarea>
                            <label htmlFor="description-field" className="textholder">Описание</label>
                        </div>
                        {/* <div className="input-container">
                      <input id="file-field" type="file" name="file" className="input-field" accept=".jpg, .jpeg, .png" required/>
                      <label htmlFor="file-field" id="dropbox">Выбрать изображение</label> */}
                        {/* <div id="preloader"> */}
                        {/* <svg className="filter" version="1.1">
                          <defs>
                            <filter id="gooeyness">
                              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooeyness" />
                              <feComposite in="SourceGraphic" in2="gooeyness" operator="atop" />
                            </filter>
                          </defs>
                        </svg> */}
                        {/* <div className="dots">
                          <div className="dot mainDot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div> */}
                        {/* </div> */}
                        {/* <div id="choosen-images"></div> */}
                        {/* </div> */}
                        <input type="submit" value="Оставить заявку" className="styled-btn" />
                    </form>
                </div>
            </div>
        </div>
    );
}