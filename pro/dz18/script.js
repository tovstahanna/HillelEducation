const xhr = new XMLHttpRequest();
const url_xhr = 'https://reqres.in/api/users';

const divUsers = document.getElementById('users');
const divNewUsers = document.getElementById('new_users');
const form = document.getElementById('registration');
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
                    <h2>${this.name} ${this.surname}</h2>
                        ${image}
                    <p>${this.email}</p>
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
        //console.log(links);
    }
    
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


form.addEventListener('submit', addNewUser);
ajax(1);