import React, { useEffect, useState } from 'react';
import PostProvider from '../service/PostProvider';

interface Post {
    id : number,
    title : string,
    description : string,
}

function PostsContainer() {
    const voidArr : Post[] = [];
    const [data,  setData] = useState(voidArr);

    async function getPostsData() {
        const res : Post[] = await PostProvider.getPosts();
        // console.log(res);
        setData(res);
    }

    useEffect(() => {
        getPostsData();
    }, []);

    function handleDeleteButton(id : number, title : string, description : string) {
        // console.log(id, title, description);
        PostProvider.deletePost(id, title, description);

        const filteringData = data.filter(post => post.id !== id);
        setData(filteringData);
        // getPostsData();
    }

    return (
        <div>
            <h2>Posts</h2>
            <nav>
                {
                    data.map((post, i) => { 
                        return (
                            <li key={i}>
                                { i }. { post.title } <button onClick={ () => { handleDeleteButton(post.id, post.title, post.description) } }>×</button>
                                <p>{ post.description }</p>
                            </li>
                        );
                    })
                }
            </nav>
        </div>
    );
}

export default PostsContainer;