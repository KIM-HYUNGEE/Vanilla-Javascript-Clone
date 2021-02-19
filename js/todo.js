const toDoForm = document.querySelector(".js-todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-todo-list");

const toDos_localStorage = "toDos";

let toDos = []; 
function saveToDos() {
    localStorage.setItem(toDos_localStorage,JSON.stringify(toDos));
}

function deleteToDo(e) {    
    const btn = e.target;
    const li = btn.parentNode.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); 
        // 주어진 함수 통과하는 놈들(조건 맞지 않는 놈)만 모아 새 배열 형성
    });
    toDos = cleanToDos;
    saveToDos(); 
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    // li.setAttribute("id", newId);
    li.id = newId;
    span.innerHTML = text;
    li.appendChild(span);
    span.appendChild(delBtn);
    toDoList.appendChild(li);
    
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function submitHandler(e) {
    e.preventDefault();

    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(toDos_localStorage);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", submitHandler);
}

init();