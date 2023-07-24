
//import utils from './utils/render-template.js';
//import services from './service/api.js';
import auth from './components/authentication-component.js';
//import usr from './components/user-component.js';



const loginTemplate = document.getElementById('login-template').innerHTML;
const rootEl = document.getElementById('main');

const loginComponent = new auth(loginTemplate, rootEl);