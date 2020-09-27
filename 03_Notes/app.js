

const noteContainer = document.querySelector(".container");
const addNewButton = document.querySelector('[name="add-new"]');
const addDeleteAllButton = document.querySelector('[name="delete-all"]');

addNewButton.addEventListener('click', addNewNote);
noteContainer.addEventListener('input', refreshText);
noteContainer.addEventListener('click', tryTodelete);
addDeleteAllButton.addEventListener('click', deleteAll);


function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function readableTime(time) {
 
    return readable = time.replace('T', ' ').slice(0, -5);
}

class Note {
    constructor(id, text = "", date = new Date().toISOString()) {
        this.id = id;
        this.text = text;
        this.date = date;
    }
    render() {
        const div = document.createElement("div");
        const div_info = document.createElement("div");
        const div_text = document.createElement("textarea");
        const deleteBtn = document.createElement("button");
        deleteBtn.className = `delete-note-btn ${this.id}`;
        deleteBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
        div_text.className = `${this.id}`;
        div_text.value = `${this.text}`;
        div_text.placeholder = `Write you note here...`

        div.className = `item ${this.id}`;
        div_info.className = "item-nav";
        div_info.innerHTML = `created at ${readableTime(this.date)} `;
        div.appendChild(div_info);
        div.appendChild(div_text);
        div_info.appendChild(deleteBtn);


        noteContainer.appendChild(div);
    }
}

let arrayOfNotes = [];

const string = 'i' + Math.random().toString(36).substring(7);



function addNewNote() {
    const string = 'i' + Math.random().toString(36).substring(7);
    const newNote = new Note(string);
    arrayOfNotes.push(newNote);
    newNote.render();
    updateLocalStorage();
}

function refreshText(e) {
    const idOfChanged = e.srcElement.className;
    const obj = arrayOfNotes.find(o => o.id === idOfChanged);
    const textInput = document.querySelector(`textArea.${obj.id}`);
    obj.text = textInput.value;
    updateLocalStorage();

}

 

function deleteAll() {
    
    const copyArray = [...arrayOfNotes]
    for(note of copyArray) {
       
        deleteOneNote(note.id);
    }
}

function deleteOneNote(idToDelete) {
   
    const index = arrayOfNotes.findIndex(o => o.id === idToDelete);
    const obj = arrayOfNotes.find(o => o.id === idToDelete);

    const divToRemove = document.querySelector(`div.${obj.id}`);
    arrayOfNotes.splice(index, 1)
    //console.log(index);
    //console.log(index, obj, idToDelete, divToRemove);
    noteContainer.removeChild(divToRemove);

    // arrayOfNotes.splice(index, 1);
  //  console.log(arrayOfNotes);
    updateLocalStorage();
}



function tryTodelete(e) {
    console.log(e);
    if (e.path[1].classList[0] === "delete-note-btn") {
        const idToDelete = e.path[1].classList[1];
        deleteOneNote(idToDelete)

    }

}

function updateLocalStorage() {
    localStorage.setItem(`notes`, JSON.stringify(arrayOfNotes))

}

function readLocalStorage() {
    /*     const items2 =  localStorage.getItem('notes');
        console.log(items2); */

    const items = JSON.parse(localStorage.getItem('notes')) || [];
 //   console.log(items);


    for (noteItem of items) {
        console.log(noteItem);
      
        arrayOfNotes.push(new Note(noteItem.id, noteItem.text, noteItem.date));
    }

    for (note of arrayOfNotes) {
        note.render();
    }

    console.log(arrayOfNotes);

}


window.onload = readLocalStorage;

