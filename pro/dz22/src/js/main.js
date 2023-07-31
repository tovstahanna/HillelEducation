import auth from './components/authentication-component.js';

const loginTemplate = document.getElementById('login-template').innerHTML;
const rootEl = document.getElementById('main');

const loginComponent = new auth(loginTemplate, rootEl);

