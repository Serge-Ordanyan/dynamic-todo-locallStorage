// for creating title
const createAppTitle = (title) => {
   const appTitle = document.createElement('h1');
   appTitle.innerHTML = title;

   return appTitle;
};


// cr.. form
const createTodoForm = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const addButton = document.createElement('button');
  const wrapper = document.createElement('div');

  //if nothing in value button de-activated
  addButton.disabled = !input.value.length;

  input.addEventListener('input',()=>{
    addButton.disabled = !input.value.length;
  })

  form.classList.add('input-group','mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Write name of todo';
  addButton.classList.add('btn','btn-primary');
  wrapper.classList.add('input-group-append');
  addButton.textContent = 'Add todo';

  wrapper.append(addButton);
  form.append(input);
  form.append(wrapper);


  return{
      form,
      input,
      addButton
  }
};



//cr.. list(ul)
const createTodoList = () => {
  const list = document.createElement('ul');
  list.classList.add('list-group');

  return list;
};


// cr.item(li) with btns
const createTodoItem = (name) => {
 const todoItem = document.createElement('li');
 const btnWrapper = document.createElement('div');
 const doneBtn = document.createElement('button');
 const deleteBtn = document.createElement('button');


 // make manual UID 
 const randomId = Math.random() * 15.75;
 //and send to todo id
 todoItem.id = randomId.toFixed(2)


 todoItem.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
 doneBtn.classList.add('btn','btn-success');
 deleteBtn.classList.add('btn','btn-danger');
 todoItem.textContent = name;
 doneBtn.textContent = 'Ready';
 deleteBtn.textContent = 'Delete';

 btnWrapper.append(doneBtn,deleteBtn);
 todoItem.append(btnWrapper);


 return{
     todoItem,
     doneBtn,
     deleteBtn,
     btnWrapper
 }
};


//make Fin.. Appl..
const createTodoApp = (container,title,key) => {
    const appTitle = createAppTitle(title);
    const appForm = createTodoForm();
    const appList = createTodoList();

    container.append(appTitle,appForm.form,appList);


    // printing todos  from loc.stor.. to screen, 
    if(localStorage.getItem(key)){
        todoArray = JSON.parse(localStorage.getItem(key));

        for(const obj of todoArray){
            const todoItem = createTodoItem(appForm.input.value);

            todoItem.todoItem.textContent = obj.name;
            todoItem.todoItem.id = obj.id;

            if(obj.done === true){
                todoItem.todoItem.classList.add('list-group-item-success');
            }else{
                todoItem.todoItem.classList.remove('list-group-item-success');
            }

            completeTodoItem(todoItem.todoItem,todoItem.doneBtn);
            deleteTodoItem(todoItem.todoItem,todoItem.deleteBtn);


            appList.append(todoItem.todoItem);
            todoItem.todoItem.append(todoItem.btnWrapper);
        }
    }



    appForm.form.addEventListener('submit',e => {
        e.preventDefault();

        const todoItem = createTodoItem(appForm.input.value);

        if(!appForm.input.value){
            return;
        }

        completeTodoItem(todoItem.todoItem,todoItem.doneBtn);
        deleteTodoItem(todoItem.todoItem,todoItem.deleteBtn);

        //get items from locallStorage
        let locallStorrageData = localStorage.getItem(key);

        if(locallStorrageData == null){
            todoArray = [];
        }else{
            todoArray = JSON.parse(locallStorrageData);
        }
        
        // for send locallStorrage
        const createItemObj = (arr) => {
           const itemObj = {};
           itemObj.name = appForm.input.value;
           itemObj.id = todoItem.todoItem.id;
           itemObj.done = false;

           arr.push(itemObj);
        };

        //todoArray from locallStorrage.js
        createItemObj(todoArray);
        localStorage.setItem(key,JSON.stringify(todoArray));

        appList.append(todoItem.todoItem);
        appForm.input.value = '';
        appForm.addButton.disabled = !appForm.addButton.disabled;
    })
};



// change done
const changeItemDone = (arr,item) => {
   arr.map(obj => {
       if(obj.id === item.id && obj.done === false){
           obj.done = true;
       }else if(obj.id === item.id && obj.done === true){
           obj.done = false;
       }
   })
};


// make list completed and call this inside createTodoApp 
function completeTodoItem(item,btn){
  btn.addEventListener('click',()=>{

    todoArray = JSON.parse(localStorage.getItem(key));

      item.classList.toggle('list-group-item-success');

      changeItemDone(todoArray,item);

      localStorage.setItem(key,JSON.stringify(todoArray));
  })
};


// delete our list and call this inside createTodoApp 
function deleteTodoItem(item,btn){
   btn.addEventListener('click',()=>{
    if(confirm('✺◟(ʘ.ʘ)◞✺ Are You Sure? You want to delete list ?')){

        // deleting process from loc.stor...
        todoArray = JSON.parse(localStorage.getItem(key));
        const newList = todoArray.filter((obj) => obj.id !== item.id);
        localStorage.setItem(key,JSON.stringify(newList));

        item.remove();
    }   
    
   })
};