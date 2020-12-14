import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PostProvider from '../service/PostProvider';

function CreatePostForm(props : any) {
    const [form,  setForm]  = useState({ title : "", description : "" });
    const [redirect, setRedirect] = useState(false);

    async function handleLoginForm(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        PostProvider.createPost(form.title, form.description);
        setRedirect(true);
    }

    function handleInput(e : React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name] : e.target.value });
    }

    function handleTextArea(e : React.ChangeEvent<HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name] : e.target.value });
    }

    return (
        <div>
            { redirect ? <Redirect to="/" /> : null }
            <h1>Create post</h1>
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
            </form>
        </div>
    );
}

export default CreatePostForm;