const button = document.getElementById('buttonId');
let ckeckboxes;
let i=0;
function SaveOnClick(){
  const todoList = document.getElementById('todo-list');
  const heading = document.getElementById('heading'); console.log(heading);
  const description = document.getElementById('description');
  const level = document.getElementById('level');
  const div = document.createElement('div');
  div.className = `item ${level.value}`;
  div.id = `item-${i}`;
  div.innerHTML = `<input id="${i}" type="checkbox"> <h2>${heading.value}</h2><p>${description.value}</p> <button id="remove-${i}" disabled>x</button>`;
  todoList.insertAdjacentElement('afterend', div);
  checkboxes = document.querySelectorAll('input');
  heading.value = '';
  description.value = '';
  level.value = '';
  i++;
}

button.addEventListener('click', SaveOnClick);


console.log(ckeckboxes);