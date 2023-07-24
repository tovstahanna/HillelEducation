const API_URL = 'https://reqres.in/api/';

export default class API {
    constructor() {
        this._xhr = new XMLHttpRequest();
    }

    login({email, password}) {
        return fetch(`${API_URL}login`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    })
                .then();
    }

    async fetchUsers(params){
        try {
            const response = await fetch(`${API_URL}users?page=${params.page}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const response_1 = await response.json();
            return response_1;
        } catch (error) {
            return console.log(error);
        }
    }

    async edit(params){
        console.log(params);
        try {
            const response = await fetch(`${API_URL}user/${params.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            const response_1 = await response.json();
            return response_1;
        } catch (error) {
            return console.log(error);
        }
    }

    delete(params){
        const res = fetch(`${API_URL}users/${params.id}`, {
            method: 'DELETE'
        })
        .then((responce) => {
            return responce.ok;
        })
        .catch(error => console.log(error));
        return res;
    }

    create(params){
        return fetch(`${API_URL}users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(response => response)
        .catch(error => console.log(error));
    }

}