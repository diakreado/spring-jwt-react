import httpBuilder from '../utils/httpBuilder';

class AuthService {

    checkAuth() : boolean {
        return localStorage.token ? true : false;
    }

    name() : string {
        return localStorage.name;
    }

    async login(username : string, password : string) : Promise<boolean> {
        const data = await httpBuilder.sendRequset('/login', {
            method  : 'POST',
            mode    : 'cors',
            headers : new Headers({ 'Content-Type': 'application/json' }),
            body    : JSON.stringify({ username, password }),
        });
        if (data.jwt) { 
            localStorage.token = data.jwt;
            localStorage.name = username;
            return true;
        }
        return false;
    }


    async register(email : string, username : string, password : string) : Promise<boolean> {
        const data = await httpBuilder.sendRequset('/register', {
            method  : 'POST',
            mode    : 'cors',
            headers : new Headers({ 'Content-Type': 'application/json' }),
            body    : JSON.stringify({ email, username, password }),
        });
        console.log(data);
        return await this.login(username, password);
    }


    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
    }
}

export default new AuthService();