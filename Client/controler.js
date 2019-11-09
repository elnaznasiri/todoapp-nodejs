//contoroler
//logic
init();

function addItem(value) {
    if (!value) return;
    model.notes.push({ title: value, done: false });
    typeBox.value = '';
    renderList();
}

function deleteAll() {
    model.notes = [];
    renderList();
}

function deleteItem(note) {
    model.notes.splice(model.notes.indexOf(note), 1);
    renderList();
}

function toggleDone(note) {
    note.done = !note.done; 
    renderList();
}

function getFilteredNotes() { //which one select
    if (model.todoListFilter == 1) {
        return model.notes.filter(function (note) {//kole list note
            return !note.done;
        });
    }
    if (model.todoListFilter == 2) {
        return model.notes.filter(function (note) {
            return note.done;
        });
    }

    return model.notes;
}

function setFilter(value) {
    model.todoListFilter = value;
    renderList();
}
// =================================================================
function download() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = xhr.responseText;
            console.log('download result:', data);
            if (!data) return alert('there is nothing on the server to download.');
            var confirmResult = confirm('data on the local storage will be repaced!,are you sure to continue?');
            if (!confirmResult) return;
            dataBase.setModel(JSON.parse(data));
            init();
        }
    };
    xhr.open('GET', 'read', true);
    xhr.send();
}


function upload() {
    var data =  dataBase.getModel();
    if (!data) return alert('there is nothing to upload.');

    var confirmResult = confirm('data on the server will be replaced!, are you sure to continue?');
    if (!confirmResult) return;
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert('upload done successfully.');
        }
    }
    xhr.open('POST', 'write', true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(data));
    
}


function init() {
		var result = dataBase.getModel() || { notes: [], filter: 0 };
		model.notes = result.notes;
		model.todoListFilter = result.filter;
		renderList();
}


function renderList() {
    dataBase.setModel({ notes: model.notes, filter: model.todoListFilter });
    render(getFilteredNotes());
}
