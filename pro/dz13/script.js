const email = document.getElementById('username');
const pass = document.getElementById('userpass');
const button = document.getElementById('buttonId');
const form = document.getElementById('loginform');
const user_email = 'admin@adm.com';
const user_pass = 'adm123';
let count = 0;

email.addEventListener('focusout', emaiValidation);
pass.addEventListener('focusout', passwordValidation);
form.addEventListener('submit', login);

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
      pass.disabled = false;
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
      button.disabled = false;
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

function login(event){
  event.preventDefault();
  let msg;
  if( count < 1 ) {
    msg = document.createElement('p');
    msg.id = 'form-msg';
  } else{
    msg = document.getElementById('form-msg');
  }
  if( email.value == user_email && pass.value == user_pass ){
    msg.innerText = 'You are succesfully login!';
    form.style = 'display: none;';
  }else{
    msg.innerText = 'There is no user with such credentials. Try again, please!';
    email.value = '';
    pass.value = '';
    pass.disabled = true;
    button.disabled = true;
  }

  if(msg.innerText != ''){
    form.after(msg);
    count++;
  }
}
