import httpBuilder from '../utils/httpBuilder';

class AuthService {

    checkAuth() : boolean {
        return localStorage.token ? true : false;
    }

    async login(username : string, password : string) {
        const data = await httpBuilder.sendRequset('/authenticate', {
            method  : 'POST',
            mode    : 'cors',
            headers : new Headers({ 'Content-Type': 'application/json' }),
            body    : JSON.stringify({ username, password }),
        });
        console.log(data);
        if (data.jwt) { 
            localStorage.token = data.jwt;
            return true;
        }
        return false;
    }

    async logout() {
        localStorage.removeItem('token');
    }
}

export default new AuthService();