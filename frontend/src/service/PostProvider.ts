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
                'Content-Type'  : 'application/json',
            }),
            body    : JSON.stringify({
                title,
                description,
            }),
        });
        console.log('res :', res);
    }

    async getPostById(key : string) {
        const res = await httpBuilder.sendRequset('/post/' + key, {
            method : 'GET',
            headers : new Headers({
                'Authorization' : `Bearer ${localStorage.token}`,
                'Content-Type'  : 'application/json',
            }),
            // body    : JSON.stringify({ postId : key, }),?
        });
        // console.log('res :', res);
        return res;
        
    }

    async getRequests() {
        const res = await httpBuilder.sendRequsetWithAuth('/requests');
        return res;
    }

    async deletePost(id : number) {
        const res = await httpBuilder.sendRequset('/delete-post', {
            method : 'DELETE',
            headers : new Headers({
                'Authorization' : `Bearer ${localStorage.token}`,
                'Content-Type'  : 'application/json',
            }),
            body    : JSON.stringify({ id }),
        });
        console.log('res :', res);
    }
    
    async updatePost(post : object) {
        const res = await httpBuilder.sendRequset('/post', {
            method : 'PUT',
            headers : new Headers({
                'Authorization' : `Bearer ${localStorage.token}`,
                'Content-Type'  : 'application/json',
            }),
            body : JSON.stringify(post),
        });
        console.log('res :', res);
    }

    async addPostToOrganizer(postId : number) {
        const res = await httpBuilder.sendRequset('/attach-organizer', {
            method : 'PUT',
            headers : new Headers({
                'Authorization' : `Bearer ${localStorage.token}`,
                'Content-Type'  : 'application/json',
            }),
            body : JSON.stringify({
                id : postId,
            }),
        });
        console.log('res :', res);
    }
}

export default new PostProvider();
