const xhr = new XMLHttpRequest();
const url_xhr = 'https://reqres.in/api/users';

const email = document.getElementById('username');
const pass = document.getElementById('userpass');
const button = document.getElementById('buttonId');
const form = document.getElementById('loginform');
let count = 0;
let count_email = 0;
let count_pass = 0;

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
                        <button id="edit-${this.id}">Edit</button>
                        <button id="delete-${this.id}">Delete</button>
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
    fetchUsers(event.target.getAttribute('data-page'));
}

function add(id, name, surname, email, avatar, section){
    const person = new Person(id, name, surname, email, avatar);
    const div = person.createCard();
    section.insertAdjacentHTML('beforeend', div);
    document.getElementById(`edit-${id}`).addEventListener('click', editUser);
    document.getElementById(`delete-${id}`).addEventListener('click', deleteUser);
}

function editUser(event){

    const id = event.target.id.replace('edit-', '');
    const allCards = document.getElementsByClassName('card');
    let currentElement = null;

    for (let index = 0; index < allCards.length; index++) {
        const element = allCards[index];
        const current_id = `user-${id}`;
        if( element.id != current_id ) { 
            element.style = 'opacity: 0.5; pointer-events: none;';
        } 
        if(element.id === current_id){
            currentElement = element;
        }
    }

    const editForm = currentElement.getElementsByClassName('edit-form')[0];
    const buttons = currentElement.getElementsByClassName('buttons')[0];
    const info = currentElement.getElementsByClassName('info')[0];

    editForm.style = 'display: block;';
    buttons.style = 'display: none;';
    info.style = 'display: none;';
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let msg = '';
        let first_name = '';
        let last_name = '';
        let email = '';
        let avatar = '';
        for (let j = 0; j < event.target.length-1; j++) {
            const input = event.target[j];
            if(input.name == 'first_name') first_name = input.value;
            if(input.name == 'last_name') last_name = input.value;
            if(input.name == 'email') email = input.value;
            if(input.name == 'avatar') avatar = input.value; 
        }
        const update_info = {
            email,
            first_name,
            last_name,
            avatar
        }
        xhr.open('PUT', 'https://reqres.in/api/users/' + id, true);

        xhr.onload = (e) => {
            try {
                const response = JSON.parse(e.target.response);
                if(e.target.status === 200) {
                    for (let index = 0; index < allCards.length; index++) {
                        const element = allCards[index];
                        const current_id = `user-${id}`;
                        if( element.id != current_id ) { 
                            element.style = 'opacity: 1; pointer-events: auto;';
                        } 
                        if(element.id === current_id){
                            currentElement = element;
                        }
                    }
                    editForm.style = 'display: none;';
                    buttons.style = 'display: block;';
                    info.style = 'display: block;';
                    const image = response.avatar ? `<img src="${response.avatar}" alt="${response.surname}">` : '';
                    info.innerHTML = `<h2>${response.first_name} ${response.last_name}</h2>
                                        ${image}
                                        <p>${response.email}</p>`;

                }else{
                    for (const [key, value] of Object.entries(response)) {
                        msg.innerText = `${key}: ${value}`;
                    }
                }
    
            } catch(e) {
                console.warn(e);
            }
            if(msg.innerText != ''){
                editForm.after(msg);
            }
        };
    
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(update_info));
    
        xhr.onerror = (e) => {
            console.log(e)
        }   
    });
}

function deleteUser(event){
    const id = event.target.id.replace('delete-', '');
    const userCard = document.getElementById('user-' + id);
    const deleteButton = document.getElementById('delete-' + id);

    console.log(deleteButton,userCard );

    deleteButton.addEventListener('click', (e) => {
        xhr.open('DELETE', 'https://reqres.in/api/users/' + id, true);
        xhr.onload = (e) => {
            let msg = '';
            try {
                if(e.target.status === 204) {
                    userCard.remove();
                }else{
                    for (const [key, value] of Object.entries(response)) {
                        msg.innerText = `${key}: ${value}`;
                    }
                }
            } catch(e) {
                console.warn(e);
            }
        };
        xhr.send();
        xhr.onerror = (e) => {
            console.log(e)
        }   
    });
}

function fetchUsers( pageNum ){
    xhr.open('GET', url_xhr + '?page=' + pageNum, true);
    xhr.onload = (e) => {
        try {
            const response = JSON.parse(e.target.response)
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
        } catch(e) {
            console.warn(e);
        }
    };
    
    xhr.onerror = (e) => {
        console.log(e)
    }

    xhr.send();
}

function login(event){
    event.preventDefault();
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
            if(e.target.status === 200) {
                if(pass.value === 'cityslicka'){
                    form.style = 'display: none;';
                    msg.innerText = 'You are succesfully login!';
                    fetchUsers(1);
                }else{
                    msg.innerText = 'error: Password is wrong. Try again';
                    email.value = '';
                    pass.value = '';
                }
            }else{
                for (const [key, value] of Object.entries(response)) {
                    msg.innerText = `${key}: ${value}`;
                }
                email.value = '';
                pass.value = '';
            }

        } catch(e) {
            console.warn(e);
        }
        if(msg.innerText != ''){
            form.after(msg);
            count++;
        }
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(login_info));

    xhr.onerror = (e) => {
        console.log(e)
    }    
}

function emaiValidation(el){
    let error = '';
    if(el.target){
      const emailarray = [];
      for (let index = 0; index < el.target.value.length; index++) {
        emailarray[index] = el.target.value[index];
      }
      if( count_email < 1 ) {
        error = document.createElement('p');
        error.id = 'email-error';
       } else{
        error = document.getElementById('email-error');
       }
      if(emailarray.includes('@', 2) && emailarray.includes('.', 5) && emailarray.length > 6){ // **@**.**
        error.remove(); count_email = 0;
        return true;
      }else{
        error.innerText = 'Email has incorrect format';
      }
      if(el.srcElement && error.innerText != ''){
        el.srcElement.after(error);
        count_email++;
      }
    }
    return false;
}

function passwordValidation(password){
    let error = '';
    if(password.target){
      if( count_pass < 1 ) {
        error = document.createElement('p');
        error.id = 'pass-error';
      } else{
        error = document.getElementById('pass-error');
      }
      if(password.target.value.length >= 6){ // ******
        error.remove(); count_pass = 0;
        return true;
      }else{
        error.innerText = 'Password is less then 6 symbols';
      }
      if(password.srcElement && error.innerText != ''){
        password.srcElement.after(error);
        count_pass++;
      }
    }
    return false;
}

function updateUser(event){
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