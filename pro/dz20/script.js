const loginTemplate = document.getElementById('login-template').innerHTML;
const userTemplate = document.getElementById('user-card-template').innerHTML;
const addNewUserTemplate = document.getElementById('add-template').innerHTML;
const rootEl = document.getElementById('main');

const loginComponent = new LoginComponent(loginTemplate, rootEl);
const usersComponent = new Cards(userTemplate, rootEl, {} );

loginComponent.onSuccess = function() {
    // hide form
    loginComponent.hideLoginForm();
    // fetch new users
    usersComponent.fetchCards({page: 1});
    // show add new user form
    console.log(usersComponent);
    usersComponent.addNewCard(addNewUserTemplate)
}
