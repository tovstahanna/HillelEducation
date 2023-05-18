const button = document.getElementById('buttonId');

let i=0;
function SaveOnClick(){
  const todoList = document.getElementById('todo-list');
  const heading = document.getElementById('heading');
  const description = document.getElementById('description');
  const level = document.getElementById('level');
  const div = document.createElement('div');
  div.className = `item ${level.value}`;
  const className = div.className;
  div.id = `item-${i}`;
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.className = 'settodone';
  check.id = i;
  div.insertAdjacentElement("beforeend", check);
  check.addEventListener('change', () => {
    if(check.checked){
      div.className = className + ' done';
      button.disabled = false;
        button.className = 'remove';
        button.addEventListener('click', () => {
          div.remove();
        });
    }else{
      button.disabled = true;
      div.className = className;
    }
    
  });
  const headingH2 = document.createElement('h2');
  const descriptionP = document.createElement('p');
  const button = document.createElement('button');
  headingH2.innerText = heading.value;
  descriptionP.innerText = description.value;
  button.id = 'remove-' + i;
  button.innerText = 'x';
  button.disabled = true;
  div.insertAdjacentElement("beforeend", headingH2);
  div.insertAdjacentElement("beforeend", descriptionP);
  div.insertAdjacentElement("beforeend", button);
  todoList.insertAdjacentElement('beforeend', div);
  
  heading.value = '';
  description.value = '';
  level.value = 'low';
  i++;
}

button.addEventListener('click', SaveOnClick);