const textP = document.querySelector('p');
const buttonHide = document.getElementById('hide');
const buttonPlus = document.querySelector('#increace-text');
const buttonMinus = document.querySelector('#decreace-text');

let size = 16;
let i = 0;
buttonHide.addEventListener('click', function(){
  if( i == 0 ){
    textP.style = 'display: none';
    buttonPlus.style = 'display: none';
    buttonMinus.style = 'display: none';
    buttonHide.innerText = 'Show text';
    i = 1;
  }else{
    textP.style = 'display: block';
    buttonPlus.style = 'display: inline-block';
    buttonMinus.style = 'display: inline-block';
    buttonHide.innerText = 'Hide text';
    i = 0;
  }
});

buttonPlus.addEventListener('click', () => {
  if(size>1 && size<100){
    size++;
    textP.style.fontSize = size + 'px';
  }
});

buttonMinus.addEventListener('click', () => {
  
  if(size>1 && size<100){
    size--;
    textP.style.fontSize = size + 'px';
  }
  
});