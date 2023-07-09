const xhr = new XMLHttpRequest();
const url_xhr = 'https://reqres.in/api/users';

const email = document.getElementById('username');
const pass = document.getElementById('userpass');
const button = document.getElementById('buttonId');
const form = document.getElementById('loginform');
let count = 0;

const divUsers = document.getElementById('users');
const pagination = document.createElement('div');
const text = document.createElement('p');
pagination.id = 'pagination';

class Person {
    constructor(id, name, surname, email, avatar) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.avatar = avatar;
    }
    createCard(){
        const image = this.avatar ? `<img src="${this.avatar}" alt="${this.surname}">` : '';
        return `<div class="card" id="user-${this.id}">
                    <div class="info">
                        <h2>${this.name} ${this.surname}</h2>
                        ${image}
                        <p>${this.email}</p>
                    </div>
                    <div class="buttons">
                        <button id="edit">Edit</button>
                        <button id="delete">Delete</button>
                    </div>
                    <form method="post" action="" class="edit-form">
                        <p> edit info for this user</p>
                        <input type="text" placeholder="First name" value="${this.name}" name="first_name">
                        <input type="text" placeholder="Last name" value="${this.surname}" name="last_name">
                        <input type="email" placeholder="Email" value="${this.email}" name="email">
                        <input type="text" placeholder="Avatar" value="${this.avatar}" name="avatar">
                        <input type="submit" value="Save">
                    </form>
                </div>`;
    }
}

function reloadPage(event){
    ajax(event.target.getAttribute('data-page'));
}

function add(id, name, surname, email, avatar, section){
    const person = new Person(id, name, surname, email, avatar);
    const div = person.createCard();
    section.insertAdjacentHTML('beforeend', div);
}

function ajax( pageNum ){
    xhr.open('GET', url_xhr + '?page=' + pageNum, false);
    xhr.send();
    const response = JSON.parse( xhr.response );
    pagination.innerHTML = '';
    const prev = document.createElement('a');
    const next = document.createElement('a');
    divUsers.innerHTML = '';
    if(response.data){
        for (let index = 0; index < response.data.length; index++) {
            add(response.data[index]['id'], response.data[index]['first_name'], response.data[index]['last_name'], response.data[index]['email'], response.data[index]['avatar'], divUsers);
        }
    }
    if(response.total_pages > 1){
        
        prev.innerText = 'Previous Page';
        prev.disable = false;
        prev.href = '#';
        
        next.innerText = 'Next Page';
        next.disable = false;
        next.href = '#';
        prev.setAttribute('data-page', Number(pageNum)-1);
        next.setAttribute('data-page', Number(pageNum)+1);
        if (pageNum == 1) {
           prev.style = 'color: grey; pointer-events: none';
           prev.setAttribute('data-page', Number(pageNum));
        }
        if( pageNum == response.total_pages ){
            next.style = 'color: grey; pointer-events: none';
            next.setAttribute('data-page', Number(pageNum));
        }
        
        pagination.append(prev);
        pagination.append(next);
        
        const links = pagination.getElementsByTagName('a');
        for (let index = 0; index < links.length; index++) {
            const element = links[index];
            element.addEventListener('click', reloadPage);
        }
        divUsers.after(pagination);
    }
    
}

function login(event){
    event.preventDefault();
    console.log(event);

    const login_info = {
        "email" : email.value,
        "password" : pass.value
    }
    let msg;
    if( count < 1 ) {
        msg = document.createElement('p');
        msg.id = 'form-msg';
    } else{
        msg = document.getElementById('form-msg');
    }
    xhr.open(event.target.method, event.target.action, true);
    
    xhr.onload = (e) => {
        try {
            const response = JSON.parse(e.target.response);

            if(event.target.status === 200) {
                form.style = 'display: none;';
                msg.innerText = 'You are succesfully login!';
                ajax(1);
            }else{
                msg.innerText = response;
                email.value = '';
                pass.value = '';
            }

        } catch(e) {
            console.warn(e);
        }
    };
    
    xhr.send(JSON.stringify(login_info));

    xhr.onerror = (e) => {
        console.log(e)
    }
    console.log(event.target.method, event.target.action, email.value, pass.value);
    if(msg.innerText != ''){
        form.after(msg);
        count++;
    }
}

function emaiValidation(el){
    let error;
    if(el.target){
      const emailarray = [];
      for (let index = 0; index < el.target.value.length; index++) {
        emailarray[index] = el.target.value[index];
      }
      if( count < 1 ) {
        error = document.createElement('p');
        error.id = 'email-error';
       } else{
        error = document.getElementById('email-error');
       }
      if(emailarray.includes('@', 2) && emailarray.includes('.', 5) && emailarray.length > 6){ // **@**.**
        error.remove(); count = 0;
        return true;
      }else{
        error.innerText = 'Email has incorrect format';
      }
      if(el.srcElement && error.innerText != ''){
        el.srcElement.after(error);
        count++;
      }
    }
    return false;
}

function passwordValidation(password){
    let error;
    if(password.target){
      if( count < 1 ) {
        error = document.createElement('p');
        error.id = 'pass-error';
      } else{
        error = document.getElementById('pass-error');
      }
      if(password.target.value.length >= 6){ // ******
        error.remove(); count = 0;
      }else{
        error.innerText = 'Password is less then 6 symbols';
      }
      if(password.srcElement && error.innerText != ''){
        password.srcElement.after(error);
        count++;
      }
    }
    return false;
}

function addNewUser(event){
    event.preventDefault();
    let fName, fLastName, fEmail, fAvatar;
    for (let index = 0; index < event.target.length; index++) {
        const element = event.target[index];
        if(element.name == 'first_name') fName = element.value;
        if(element.name == 'last_name') fLastName = element.value;
        if(element.name == 'email') fEmail = element.value;
        if(element.name == 'avatar') fAvatar = element.value;
    }
    const user = {
        first_name: fName,
        last_name: fLastName,
        email: fEmail,
        avatar: fAvatar
    }
    xhr.open('POST', url_xhr, false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(user));
    const response = JSON.parse(xhr.response);
    text.innerText = '';
    if(response){
        add(response.id, response.first_name, response.last_name, response.email, response.avatar, divNewUsers);
        for (let index = 0; index < event.target.length; index++) {
            const element = event.target[index];
            if(element.type != 'submit') element.value = '';
        }
        text.innerText = `New user with id ${response.id} was created successful!`;
        divNewUsers.before(text);
    }
}

email.addEventListener('focusout', emaiValidation);
pass.addEventListener('focusout', passwordValidation);
form.addEventListener('submit', login);
ajax(1);