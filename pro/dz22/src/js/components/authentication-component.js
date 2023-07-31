
import utils from '../utils/render-template.js';
import api from '../service/api.js';
import usr from './user-component.js';

export default class Authentication {
        constructor(template, containerEl) {
            this._template = template;
            this._container = containerEl;
            this._api = new api('https://reqres.in/api/');
            this._userTemplate = document.getElementById('user-card-template').innerHTML;
            this._addNewUserTemplate = document.getElementById('add-template').innerHTML;
            this._usersComponent = new usr(this._userTemplate, this._container, {} );

            if(localStorage.getItem('auth_token') && localStorage.getItem('auth_token') == 'QpwL5tke4Pnpja7X4'){
                this.authorizedAccess();
            } else{
                this.render();
            }
            
        }
    
        render() {
            this._container.innerHTML = utils.renderTemplate(this._template, {});
            document.getElementById('login-form').addEventListener('submit', (e) => {
                e.preventDefault();
                this.onSumbit();
            })
        }
    
        onSumbit() {
            const email = this._container.querySelector('#email').value;
            const password = this._container.querySelector('#password').value;
    
            const msg = utils.validation(email, password).join("<br>").toUpperCase();
            const err = document.getElementById('error');
            if(msg){
                if(err) err.remove();
                this._container.insertAdjacentHTML('beforebegin', `<p id="error">${msg}</p>`);
            }
    
            if (!msg && email && password) {
                if(err) err.remove();
                this._api.login({email, password})
                    .then(response => {
                        if(response.status == 400){
                            return response.json();
                        }else{
                            this.hideLoginForm();
                            this.authorizedAccess();
                            const res = response.json();
                            res.then( result => {
                                    localStorage.setItem('auth_token', JSON.stringify(result).replace('{"token":"','').replace('"}',''));
                                });
                                
                            return;
                        }
                    })
                    .then(response => {
                        if(response) this._container.insertAdjacentHTML('beforebegin', `<p id="error">${JSON.stringify(response).replace('{"error":"','').replace('"}','').toUpperCase()}</p>`);                    
                    })
                    .catch(error => console.log(error));
            }
        }

        authorizedAccess(){
            this._container.insertAdjacentHTML('beforebegin', `<button id="logout">Logout</button>`);
            this._usersComponent.fetchCards({page: 1});
            this._usersComponent.addNewCard(this._addNewUserTemplate);

            document.getElementById('logout').addEventListener('click', (e) => {
                this.onLogout();
            })

        }

        onLogout(){
            localStorage.removeItem('auth_token');
            window.location.reload();
        }
    
        hideLoginForm() {
            document.getElementById('login-form').hidden = true;
        }
    }

