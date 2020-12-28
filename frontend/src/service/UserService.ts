import httpBuilder from '../utils/httpBuilder';

class ConsultantService {

    async getConsultant() {
        const res = await httpBuilder.sendRequsetWithAuth('/consultant');
        return res;
    }

    async getAll() {
        const res = await httpBuilder.sendRequsetWithAuth('/users');
        return res;
    }

    async getUser(id : number) {
        const res = await httpBuilder.sendRequsetWithAuth('/user/' + id);
        return res;
    }

    async createUser(user : object) {
        const res = await httpBuilder.sendRequset('/register', {
            method : 'POST',
            headers : new Headers({
                'Authorization' : `Bearer ${localStorage.token}`,
                'Content-Type'  : 'application/json',
            }),
            body    : JSON.stringify(user),
        });
        console.log('res :', res);
    }

    async updateUser(user : object) {
        const res = await httpBuilder.sendRequset('/user', {
            method : 'PUT',
            headers : new Headers({
                'Authorization' : `Bearer ${localStorage.token}`,
                'Content-Type'  : 'application/json',
            }),
            body    : JSON.stringify(user),
        });
        console.log('res :', res);
    }

    
    async deleteUser(user : object) {
        const res = await httpBuilder.sendRequset('/user', {
            method : 'DELETE',
            headers : new Headers({
                'Authorization' : `Bearer ${localStorage.token}`,
                'Content-Type'  : 'application/json',
            }),
            body    : JSON.stringify(user),
        });
        console.log('res :', res);
    }
}

export default new ConsultantService();