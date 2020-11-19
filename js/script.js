const ul = document.querySelector('ul');
const input = document.querySelector('input');
const button = document.querySelector('button');
const form = document.querySelector('form');
let idForNewElement = getRandomInt(1, 10)
getData();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let myItem = input.value;
  saveinDb(myItem)
  createItem(myItem , idForNewElement)

})

function getData() {
    fetch('http://localhost:3000/posts')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Error:' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {          
          data.forEach(element => {
            const dataText = element.text
            const dataId = element.id
            //   console.log('id-check')
            //   console.log(itemId)
            createItem(dataText,dataId)
          });

        });
      })
        .catch(function(err) {
        console.log('Fetch Error :-S', err);
        });
}



//Get all items from database
  function createItem(itemText , itemId) {
    if(itemText != 0) {
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
      
      listText.textContent = itemText;
      
      listItem.appendChild(deleteBtn);
      listItem.setAttribute('data-id', itemId)
      deleteBtn.textContent = 'Delete';
    //   console.log('id-check')
    //   console.log(itemId)
      const itemgetId = listItem.getAttribute('data-id')
      ul.appendChild(listItem);
    
      deleteBtn.addEventListener('click', () => {
    //   console.log('id-check')
    //   console.log(itemgetId) 
        removeItem(itemgetId)  
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
  }


function saveinDb(dataText) {
const data = { text: dataText };
if(data != 0) {
fetch('http://localhost:3000/posts', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
}
}

//Removing item
function removeItem(id) {
fetch(`http://localhost:3000/posts/${id}`, {
  method: 'DELETE',
})
.then(res => res.text()) // or res.json()
.then(res => console.log(res))
}


/**
 * Return a random Int Num between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}