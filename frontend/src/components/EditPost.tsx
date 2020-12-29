import { useState, useEffect } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import PostProvider from '../service/PostProvider';
import UserService from '../service/UserService';


function EditPost(props : any) {

    const params : any = useParams();
    const [formData, setFormData] = useState({
        id          : '',
        title       : '',
        description  : '',
        state       : '',
    });

    useEffect(() => {
        async function f() {
            const res = await PostProvider.getPostById(params.id);
            setFormData({
                id           : res.id,
                title        : res.title,
                description  : res.description,
                state        : res.state,
            });
        }
        f();
    },[params]);

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('formData', formData);
        
        await PostProvider.updatePost(formData);

        goBack();
    }

    function handleChangeTitle(e : React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, title : e.target.value });
    }

    function handleChangeDescription(e : React.ChangeEvent<HTMLTextAreaElement>) {
        setFormData({ ...formData, description : e.target.value });
    }

    function handleChangeState(e : React.ChangeEvent<HTMLSelectElement>) {
        setFormData({ ...formData, state : e.target.value });
    }

    function goBack() {
        props.history.goBack();
    }

    return <>
        <header>
            <Link className="back-link" to="/">На главную</Link>
            <h3 onClick={ goBack }>Назад</h3>
        </header>
        <div className="rent-wrapper">
            <h1>Редактирование коливинга</h1>
            <div className="dialog">
                <form onSubmit={ handleSubmit }>
                    <img src="https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg" />
                    <div className="input-container">
                        <input id="title-field" type="text" name="title" placeholder="Заголовок" className="input-field" value={ formData.title } autoComplete="off" required onChange={ handleChangeTitle } />
                        <label htmlFor="title-field" className="textholder">Заголовок</label>
                    </div>
                    {/* <div className="input-container">
                      <input id="adress-field" type="text" name="adress" placeholder="Адресс места для коливинга" className="input-field" value="{{adress}}" autoComplete="off" required />
                      <label htmlFor="adress-field" className="textholder">Адресс места для коливинга</label>
                    </div> */}
                    <div className="input-container">
                      <textarea id="description-field" name="description" placeholder="Описание" className="input-field" autoComplete="off" required onChange={ handleChangeDescription } value={ formData.description } />
                      <label htmlFor="description-field" className="textholder">Описание</label>
                    </div>
                    {/* <div className="input-container">
                      <input id="freespaces-field" type="number" name="freespaces" placeholder="Количество свободных мест" className="input-field" value="{{freespaces}}" autoComplete="off" required />
                      <label htmlFor="freespaces-field" className="textholder">Количество свободных мест</label>
                    </div> */}
                    <div className="input-container">
                        <select name="state" required onChange={ handleChangeState } value={ formData.state } >
                            {/* <option value="{{state.value}}" {{state.selected}}>{{state.text}}</option> */}
                            <option value="submit"  >Одобрено</option>
                            <option value="cancel"  >Отклонено</option>
                            <option value="work"    >Реализация проекта</option>
                        </select>
                    </div>
                <input type="submit" value="Сохранить" className="styled-btn"/>
            </form>
          </div>
        </div>
    </>
}

export default withRouter(EditPost);
