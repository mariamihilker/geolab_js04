const ul = document.querySelector('ul');
const input = document.querySelector('input');
const button = document.querySelector('button');
const form = document.querySelector('form');
let idForNewElement = getRandomInt(1, 10)
const showDoneItems = document.querySelector('.done-items');
let doneItems = 0;
getData();




form.addEventListener('submit', (e) => {
  e.preventDefault();

  let myItem = input.value;
  saveinDb(myItem)
  createItem(myItem, idForNewElement, false)

})

function getData() {
    fetch('https://us-central1-js04-b4877.cloudfunctions.net/tasks')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Error:' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
            //sorting with date
            const sortedData = data.data.sort((element1, element2) => {
              return element1.create_time - element2.create_time
            })
            //console.log(sortedData)
            data.data.forEach(element => {
            const dataText = element.text
            const dataId = element.id
            const createdAt = element.create_time
            const dataStatus = element.completed
            var newTime = new Date(createdAt);
            //let converted =  newTime.getHours()
            //newTime = newTime.getHours() + ":" + newTime.getMinutes() + ", " + newTime.toDateString();
            console.log('time')
            console.log(newTime)
              createItem(dataText,dataId,dataStatus)
          });

        });
      })
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    })

}



//Get all items from database
  function createItem(itemText , itemId , itemStatus) {
    if(itemText != 0) {
      const listItem = document.createElement('li');
      const listText = document.createElement('span');
      const deleteBtn = document.createElement('button');
      const checkBox = document.createElement('input')
      const checkboxStyle = document.createElement('span')
      
      
      checkBox.setAttribute('type','checkbox');
      checkBox.setAttribute('class','item-checkbox');
      checkboxStyle.setAttribute('class','checkbox-style');
      listItem.appendChild(checkBox);
      listItem.appendChild(checkboxStyle);
      listItem.appendChild(listText);
      
      listText.textContent = itemText;
      
      listItem.appendChild(deleteBtn);
      listItem.setAttribute('data-id', itemId)
      listItem.setAttribute('data-id', itemId)
      listItem.setAttribute('data-status', itemStatus)
      deleteBtn.textContent = 'Delete';
      // console.log('status')
      // console.log(itemStatus)
      const itemgetId = listItem.getAttribute('data-id')
      if(itemStatus === true) {
        listItem.classList.add('completed')
        checkBox.checked = true;
        doneItems ++;
      }
      ul.appendChild(listItem);
      //console.log(document.querySelectorAll('.my-items .completed').length);
      showItems();
      deleteBtn.addEventListener('click', () => {
    //   console.log('id-check')
    //   console.log(itemgetId) 
       
        ul.removeChild(listItem);        
        removeItem(itemgetId)
        showItems();
      })
      checkBox.addEventListener('change',() => {
          const itemElem = checkBox.parentElement;
          const elId = itemElem.getAttribute('data-id')
          let elStatus = itemElem.getAttribute('data-status')
          itemElem.classList.toggle('completed');

          

          if(elStatus === 'false') {
            itemElem.setAttribute('data-status', 'true')
            checkItem(elId, 'true')
          } else if(elStatus === 'true') {
            itemElem.setAttribute('data-status','false')
            uncheckItem(elId, 'false')
          }
        //   console.log('status')
        //   console.log(elStatus)
          showItems();
          //saveOrUpdateDb()
          

      }) 
      input.value = '';
      input.focus();
    }  
  }


function saveinDb(dataText) {
const data = { text: dataText ,completed: 'false' };
if(data != 0) {
fetch('https://us-central1-js04-b4877.cloudfunctions.net/tasks/create', {
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
fetch(`https://us-central1-js04-b4877.cloudfunctions.net/tasks/${id}`, {
  method: 'DELETE',
})
.then(res => res.text()) // or res.json()
.then(res => console.log(res))
}


//Mark as completed
function checkItem(id, itemStatus) {
    fetch(`https://us-central1-js04-b4877.cloudfunctions.net/tasks/check/${id}`, {
    method: "POST",
    headers: {
        "Content-Type" : "application/json"
      },
    body: JSON.stringify(
      {
        "completed": itemStatus 
      }
    )
  });
}


//Mark as uncompleted
function uncheckItem(id, itemStatus) {
    fetch(`https://us-central1-js04-b4877.cloudfunctions.net/tasks/uncheck/${id}`, {
    method: "POST",
    headers: {
        "Content-Type" : "application/json"
      },
    body: JSON.stringify(
      {
        "completed": itemStatus 
      }
    )
  });
}




/**
 * Return a random Int Num between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Calculate completed items
function showItems() {
    let doneItems = document.querySelectorAll('.my-items .completed').length;
    //console.log(doneItems)
    showDoneItems.innerText = doneItems;
    // return doneItems
}