const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('.btn-clear')
const itemFilter = document.querySelector('#filter')
const imageClicked = document.querySelector('.listed')
const formBtn = itemForm.querySelector('button')
let isEditMode = false;
const bdyClick = document.querySelector('body')
function color(){

  if(document.body.style.backgroundColor!=='black'){
    document.body.style.backgroundColor = 'black'
    document.body.style.color='white'
    
    
    
    }else{
    document.body.style.backgroundColor = 'white'
    document.body.style.color='black'
  }
  
}
function displayItems (){
const itemsFromStorage = getItemsFromStorage();
itemsFromStorage.forEach(item=> addItemToDOM
  (item));
  checkUI();


}



function onAddItemSubmit (e){
e.preventDefault();
const newItem = itemInput.value

//Validate Input
if (newItem === ''){
  
alert('Please add an item')
itemInput.style.borderColor = 'red'
return;

}
// check for edit mode
if(isEditMode){
const ItemToEdit = itemList.querySelector('.edit-mode');

removeItemFromStorage(ItemToEdit.textContent);
ItemToEdit.classList.remove('edit-mode');
ItemToEdit.remove();
isEditMode = false;
} else{

  if(checkIfItemExists(newItem)){
     
    alert('that item already exists')

    return;  
  }
}

//create item dom element
addItemToDOM(newItem);
//add item to locale storage
addItemToStorage(newItem)

checkUI();
itemInput.value = ''

}



function addItemToDOM(item){
//create list item
const li = document.createElement('li');
li.appendChild(document.createTextNode(item));

const button = createButton('remove-item btn-link text-red'); 
li.appendChild(button);
//add li to DOM 
itemList.appendChild(li)



}
function addItemToStorage(item){
const itemsFromStorage = getItemsFromStorage()



//add new storage
itemsFromStorage.push(item);

//convert to json string
localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}


function getItemsFromStorage(){
  let itemsFromStorage
  if(localStorage.getItem('items') === null){
  
  itemsFromStorage = []
  
  }else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage


}


function createButton(classes){

const button = document.createElement('button');
button.className = classes;
const icon = createIcon('fa-solid fa-xmark');
button.appendChild(icon);
return button;

}
function createIcon(classes){
const icon = document.createElement('i')
icon.className = classes;
return icon;
}
function onClickItem(e){
  if (e.target.parentElement.classList.contains
    ('remove-item')) {
      removeItem(e.target.parentElement.parentElement);
} else{
  setItemToEdit(e.target)

}



function setItemToEdit(item){
isEditMode = true;
itemList
.querySelectorAll('li')
.forEach((i) => i.classList.remove('edit-mode'));


item.classList.add('edit-mode');
formBtn.innerHTML = '<i class ="fa-solid fa-pen"></i> Update item';
formBtn.style.backgroundColor = '#228B22'
itemInput.value = item.textContent;
}


}
function checkIfItemExists(item){
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);



}


function removeItem(item) {
  if(confirm('are you sure  ')){
    
    //remove item from DOM
    item.remove();
//remove item from storage
 removeItemFromStorage(item.textContent);  

    checkUI();
  }
}
  function removeItemFromStorage(item){
  let itemsFromStorage = getItemsFromStorage();
 // filter out item to be removed
 itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
   //re-set to locale storage     
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function onFocus(){
  if( itemInput.style.borderColor !== 'green'){
  itemInput.style.borderColor = 'green'
itemInput.style.borderWidth = '2px';
  }
return; 
}

function focusOut(){
  
  if( itemInput.style.borderColor = 'green'){
    itemInput.style.borderColor = '#ccc'
  itemInput.style.borderWidth = '2px';
    }
  return;
}



function clearAll(){
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
    localStorage.clear();
  }
  checkUI();
}

function filterItems(e){
  const items = itemList.querySelectorAll('li')
   const text = e.target.value.toLowerCase();
    items.forEach((item) => {
    const itemName = item.firstChild.textContent.
    toLowerCase();

     if(itemName.indexOf(text) != -1){
      item.style.display = 'flex'
     } else{
      item.style.display = 'none'
     }
    })

  }

     function checkUI(){
      itemInput.value = ''; 
      const items = itemList.querySelectorAll('li')
       console.log(items)
       if(items.length === 0){
         clearButton.style.display = 'none';
         itemFilter.style.display = 'none';
      
          } else{
            clearButton.style.display = 'block';
            itemFilter.style.display = 'block'; 

          }

          formBtn.innerHTML = '<i class ="fa-solid fa-plus"></i> Add Item';
          formBtn.style.backgroundColor = '#333';
isEditMode = false;     
     }


//initialize app
function init(){


  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearButton.addEventListener('click', clearAll)
  itemFilter.addEventListener('input', filterItems)
  document.addEventListener('DOMContentLoaded', displayItems)
  imageClicked.addEventListener('click', color);
  itemInput.addEventListener('keydown', onFocus)
  bdyClick.addEventListener('click', focusOut)
  

  checkUI();
  

}
init();
      //event listeners
