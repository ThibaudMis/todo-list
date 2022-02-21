const todoInput = document.querySelector('.input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filtered');
var initloop= true;


todoButton.addEventListener('click',addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filtertodo);


while(initloop){
    
   load()

    


    initloop=false;
};


function addTodo(event){
    event.preventDefault();
    
    if(todoInput.value===""){
        
        return;
        }
      
        
    const tododiv = document.createElement('div');
    tododiv.classList.add('todo');

   

    const completedButton= document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    tododiv.appendChild(completedButton);
    
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    tododiv.appendChild(newTodo);

    const trashButton= document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    tododiv.appendChild(trashButton);

    todoList.appendChild(tododiv);
    addlist(todoInput.value,false,Date.now())
    todoInput.value="";

}

function addlist(text,comp,date){
           const objetString= { "text": text,
                             "comp":comp,
                             "date":date}
            const objetJSON=JSON.stringify(objetString);
        console.log(objetJSON);


}

function deleteCheck(e){
    const item= e.target;

    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function() {
            todo.remove();
            });
      }

    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }  

}

function filtertodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
            break;

            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                    }
                else{todo.style.display = 'none';}    

            break;

            case "unfinish":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                    }
                else{todo.style.display = 'none';} 
            break;
        }
    }    
    );
}


async function load(){
    const data= await fetch("list.json");
     const table= await data.json();
        
    
        for(i=0;i<table.list.length;i++){

            const tododiv = document.createElement('div');
            tododiv.classList.add('todo');

   

            const completedButton= document.createElement('button');
            completedButton.innerHTML='<i class="fas fa-check"></i>';
            completedButton.classList.add("complete-btn");
            tododiv.appendChild(completedButton);
            
            const newTodo = document.createElement('li');
            newTodo.innerText=table.list[i].text;
            newTodo.classList.add('todo-item');
            tododiv.appendChild(newTodo);

            const trashButton= document.createElement('button');
            trashButton.innerHTML='<i class="fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            tododiv.appendChild(trashButton);

            todoList.appendChild(tododiv);
            
            if(table.list[i].comp===true){
                
                tododiv.classList.toggle('completed')
                }
            
            }
}