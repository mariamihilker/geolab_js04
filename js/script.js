const ul = document.querySelector('ul');
const input = document.querySelector('input');
const button = document.querySelector('button');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let myItem = input.value;

  if(input.value != 0) {
    const listItem = document.createElement('li');
    const listText = document.createElement('span');
    const deleteBtn = document.createElement('button');
  
    listItem.appendChild(listText);
    listText.textContent = myItem;
    listItem.appendChild(deleteBtn);
    deleteBtn.textContent = 'Delete';
    ul.appendChild(listItem);
  
    deleteBtn.addEventListener('click', () => {
      ul.removeChild(listItem);
    })
  
    input.value = '';
    input.focus();
  }  

})