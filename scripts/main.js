const addTaskBtn = document.getElementById("addTaskBtn")
const taskList = document.getElementById("taskList")
let taskInput = document.getElementById("taskInput");
let taskNo = 1;
let inputNo = 1; 
let editBtnNo = 1;
let deleteBtnNo = 1;

scriptInit()

function scriptInit() {

  document.addEventListener("DOMContentLoaded", () => {

    taskInput.value = ""
    taskInput.focus()

    storeTemporaryInput("savedInput");
    addTaskButton()
    addTaskEnterKey()

    /* Under Construction 
    storeData()
    Under Construction */

  })

}

function addTaskButton() {

  addTaskBtn.addEventListener("click", () => {

    let input = taskInput.value

    createElt("input", input)
    clearTemporaryStorage("savedInput");

  });

}

function addTaskEnterKey() {

  taskInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

      let input = taskInput.value

      createElt("input", input)
      clearTemporaryStorage("savedInput");

    }

  });

}


function createElt(elt, input) {

  if(input.trim().length === 0 || input === null || input === undefined) {

    taskInput.value = ""

    console.log(
      "Warning! Either there is no input added in the input field or only contains whitespace."
    )
    alert("Please add a task!")

    return

  }

  const div = document.createElement("div")
  const element = document.createElement(elt)
  const editBtn = document.createElement("button")
  const editBtnTxt = document.createTextNode("Edit Task")
  const deleteBtn = document.createElement("button")
  const deleteBtnTxt = document.createTextNode("Delete Task")

  editBtn.appendChild(editBtnTxt)
  deleteBtn.appendChild(deleteBtnTxt)
  div.appendChild(element)
  div.appendChild(editBtn)
  div.appendChild(deleteBtn)
  taskList.appendChild(div)
  
  setAttributes(div, {
    class: "taskItem",
    id: `taskNo${taskNo}`
  });
  
  setAttributes(element, {
    value: input,
    readonly: "true",
    class: "input",
    id: `inputNo${inputNo}`
    
  });
  
  setAttributes(editBtn, {
    class: "editBtn",
    id: `editBtnNo${editBtnNo}`
  });

  setAttributes(deleteBtn, {
    class: "deleteBtn",
    id: `deleteBtnNo${deleteBtnNo}`
  });

  /* Under Construction */

  enterEditMode();

  /* Under Construction */

  parentNodeRemover()

  taskInput.value = ""
  taskNo++
  inputNo++
  editBtnNo++
  deleteBtnNo++

}

function setAttributes(element, attributes) {

  for (let key in attributes) {
    element.setAttribute(key, attributes[key])
  }

}

function enterEditMode() {
  const button = document.getElementById(`editBtnNo${editBtnNo}`);
  const input = document.getElementById(`inputNo${inputNo}`);
  let editMode = false;

  button.addEventListener("click", () => {
    if (!editMode) {
      editMode = !editMode;
      input.readOnly = false;
      input.select();
      button.innerHTML = "Finish Editing";

      return;
    }

    if (editMode) {
      editMode = !editMode;
      input.readOnly = true;
      input.blur();
      button.innerHTML = "Edit Task";

      return;
    }
  });
}

function parentNodeRemover() {
  
  const button = document.getElementById(`deleteBtnNo${deleteBtnNo}`);

  button.addEventListener("click", () => {

    button.parentNode.remove();
    taskInput.focus();

  })

}


function storeTemporaryInput(storedData) {
  taskInput.value = localStorage.getItem(storedData);

  taskInput.addEventListener("keyup", (e) => {

    localStorage.setItem(storedData, e.target.value);

  });
}

/* Under Construction 
function storeData() {

  // taskInput.value = localStorage.getItem(storedData);

  // taskInput.addEventListener("keyup", (e) => {
  //   localStorage.setItem(storedData, e.target.value);
  // });

}
Under Construction */

function clearLocalStorage() {

  taskInput.focus()
  localStorage.clear()

}

function clearTemporaryStorage(storedData) {

  taskInput.focus();
  localStorage.removeItem(storedData)

}