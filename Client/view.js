//view
//show information
//build html
const todoList = document.getElementById("list");
const typeBox = document.getElementById('textbox');
const ulElement = document.getElementById('ul-todo-list');

// Execute a function when the user releases a key on the keyboard
typeBox.addEventListener("keyup", function (event) {
    // Number 13 is the "nter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        addItem(typeBox.value);
        typeBox.value = "";
       
    }
});

function render(notes) {
    ulElement.innerHTML = "";
    notes.forEach(note => {
        createLi(note);
    });

    //color of selected filter
    document.getElementById("f0").classList.remove("selected-filter");
    document.getElementById("f1").classList.remove("selected-filter");
    document.getElementById("f2").classList.remove("selected-filter");
    document.getElementById("f" + model.todoListFilter).classList.add("selected-filter");
}

function createLi(note) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    var btnDel = document.createElement('img');
    var btnToggleDone = document.createElement('img');
    span.appendChild(document.createTextNode(note.title));
    li.appendChild(span);
    li.appendChild(btnDel);
    li.appendChild(btnToggleDone);
    ulElement.appendChild(li);

    btnToggleDone.onclick = function () {
        toggleDone(note);
    }
    if (note.done) {
        btnToggleDone.src = "done.jpg";
    } else {
        btnToggleDone.src = "notdone.jpg";
    }

    btnDel.onclick = function () {
        deleteItem(note);
    }
    btnDel.src = "delete.jpg";
}

