import auth from"./components/authentication-component.js";const loginTemplate=document.getElementById("login-template").innerHTML,rootEl=document.getElementById("main"),loginComponent=new auth(loginTemplate,rootEl);