import httpBuilder from '../utils/httpBuilder';

class PostProvider {

    async getPosts() {
        const res = await httpBuilder.sendRequsetWithAuth('/posts');
        return res;
    }

    async createPost(title : string, description : string) {
        const res = await httpBuilder.sendRequset('/create-post', {
            method : 'POST',
            headers : new Headers({
                'Authorization' : `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json',
            }),
            body    : JSON.stringify({
                title,
                description,
            }),
        });
        console.log('res :', res);
    }

    async deletePost(id : number, title : string, description : string) {
        const res = await httpBuilder.sendRequset('/delete-post', {
            method : 'DELETE',
            headers : new Headers({
                'Authorization' : `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json',
            }),
            body    : JSON.stringify({
                id,
                // title,
                // description,
            }),
        });
        console.log('res :', res);
    }
}

export default new PostProvider();
