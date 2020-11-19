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
    const checkBox = document.createElement('input')
    const showItems = document.querySelector('.done-items')
    let doneItems = 0;
    checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute('class','item-checkbox');
    listItem.appendChild(checkBox);
    listItem.appendChild(listText);
    listText.textContent = myItem;
    
    listItem.appendChild(deleteBtn);
    
    deleteBtn.textContent = 'Delete';

    ul.appendChild(listItem);
  
    deleteBtn.addEventListener('click', () => {
      ul.removeChild(listItem);
      doneItems = document.querySelectorAll('.my-items .striked').length;
      showItems.innerText = doneItems;
    })
    checkBox.addEventListener('change',() => {
        checkBox.parentElement.classList.toggle('striked');
        doneItems = document.querySelectorAll('.my-items .striked').length;
        showItems.innerText = doneItems;
    }) 
    input.value = '';
    input.focus();
  }  

})