import { useState, useEffect } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import UserService from '../service/UserService';


function AccSettings(props : any) {

    const params : any = useParams();
    const [user, setUser] = useState({} as any);
    const [formData, setFormData] = useState({
        id : user.id,
        username : user.username,
        password : user.password,
        email : user.email,
        role : user.role,
    });

    useEffect(() => {
        async function f() {
            if (params.id) {
                const res = await UserService.getUser(params.id);
                setUser(res);
                setFormData({
                    id : res.id,
                    username : res.username,
                    password : res.password,
                    email : res.email,
                    role : res.role,
                });
            }
        }
        f();
    },[params]);

    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
        if (params.id) {
            UserService.updateUser(formData);
        } else {
            UserService.createUser(formData);
        }
        goBack();
    }

    function handleChangeUsername(e : React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, username : e.target.value });
    }

    function handleChangePassword(e : React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, password : e.target.value });
    }

    function handleChangeContact(e : React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, email : e.target.value });
    }

    function handleChangeRole(e : React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, role : e.target.value });
    }

    function goBack() {
        props.history.goBack();
    }

    return <>
        <header>
            <Link className="back-link" to="/">На главную</Link>
            <h3 onClick={ goBack }>Назад</h3>
        </header>
        <div className="wrapper">
            <h1>
                {
                    params.id ? 'Редактирование '
                              : 'Создание нового '
                }
                аккаунта
            </h1>
            <div className="dialog">
                <form id="accsettings-form" onSubmit={ handleSubmit }>
                    {/* <div className="input-container">
                        <input id="name-field" name="name" type="text" placeholder="Полное имя" className="input-field" value="{{name}}" autoComplete="off" required />
                        <label htmlFor="name-field" className="textholder">Полное имя</label>
                    </div> */}
                    {/* {% if not isChanging %} */}
                    {
                        !params.id ? 
                                    <div className="input-container">
                                        <input id="accsettings-login-field" name="login" type="text" placeholder="Логин" className="input-field" autoComplete="off" required value={ formData.username } onChange={ handleChangeUsername } />
                                        <label htmlFor="accsettings-login-field" className="textholder">Логин</label>
                                    </div>
                                : <p>Login: { user.username }</p>
                    }
                    {/* {% endif %} */}
                    <div className="input-container">
                        <input id="accsettings-password-field" name="password" type="password" placeholder="Пароль" className="input-field" onChange={ handleChangePassword } value={ formData.password } autoComplete="off" required />
                        <label htmlFor="accsettings-password-field" className="textholder">Пароль</label>
                    </div>

                    <div className="input-container">
                        <input id="contact-field" type="text" name="contact" placeholder="Контактные данные" className="input-field" onChange={ handleChangeContact } value={ formData.email } autoComplete="off" required />
                        <label htmlFor="contact-field" className="textholder">Контактные данные</label>
                    </div>

                    <div className="input-container">
                        <input id="role-field-1" type="radio" name="role" value="default" checked={ formData.role === 'default' } required  onChange={ handleChangeRole } />
                        <label htmlFor="role-field-1"> Пользователь </label>
                    </div>

                    <div className="input-container">
                        <input id="role-field-2" type="radio" name="role" value="consultant" checked={ formData.role === 'consultant' } required onChange={ handleChangeRole } />
                        <label htmlFor="role-field-2"> Консультант</label>
                    </div>

                    <div className="input-container">
                        <input id="role-field-3" type="radio" name="role" value="organizer" checked={ formData.role === 'organizer' } required onChange={ handleChangeRole } />
                        <label htmlFor="role-field-3"> Организатор</label>
                    </div>

                    <div id="accsettings-error-msg" className="error-msg"></div>
                    <input type="submit" value={ params.id ? 'Сохранить' : 'Создать' } className="styled-btn" />
                </form>
            </div>
        </div>
    </>
}

export default withRouter(AccSettings);
