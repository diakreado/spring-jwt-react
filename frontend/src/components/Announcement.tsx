import { useEffect, useState } from "react";
import { Link, useParams, withRouter } from 'react-router-dom';
import PostProvider from "../service/PostProvider";

function Announcement(props : any) {
    const [post, setPost] = useState({
        title       : '',
        description : '',
        state       : '',
    });

    const params : any = useParams();

    useEffect(() => {
        async function f() {
            const res = await PostProvider.getPostById(params.id);
            console.log(res);
            const state = res.state === 'wait' ? 'На рассмотрении' : res.state === 'submit' ? 'Одобрено' : '';
            setPost({
                title       : res.title,
                description : res.description,
                state,
            });
        }
        f();
    },[params]);

    function goBack() {
        props.history.goBack();
    }

    return <>
        <header>
            <Link className="back-link" to="/">На главную</Link>
            <h3 onClick={ goBack }>Назад</h3>
        </header>
        <div className="wrapper">
            <div className="dialog">
                <img src="https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg"/>
                <h2>Адрес: { post.title }</h2>
                <p>Описание: {  post.description }</p>
                <p>Состояние: { post.state }</p>
                {/* <p>Осталось мест: {'freespaces'}</p>
                <p className="adress">Адрес: {'adress'}</p>
                <p className="footer">Организатор коливинга: {'name'}, {'contact'}</p> */}
                {/* {'if isThisOrganizer'} */}
                {/* <hr /> */}
                {/* <p>Владелец: {{ ownerName }} {{ ownerContact }}</p> */}
                {/* {% endif %} */}
                {/* {% if isOwner and hasProject %} */}
                {/* {'endif'} */}
            </div>
        </div>
    </>
}


export default withRouter(Announcement);
