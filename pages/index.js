import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector("add_todo-popup");
//const addTodoForm = document.forms["add-todo-form"];
const todoCounter = new TodoCounter(initialTodos, ".counter__text");
//const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todosList = document.querySelector(".todos__list");

function handleCheck(completed) {
  todoCounter.updateCompleted(true);
};

function handleDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
};

const addTodoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup",
   handleFormSubmit: (inputValues) => {
     const { name, date } = inputValues;

     if (date !== indefined) {
      const dateInput = new Date(date);
      dateInput.setMinutes(dateInput.getMinutes() + dateInput.getTimezoneOffset());

      const id = uuidv4();
      const values = { name, date, dateInput, id };

      const newTodoElement = generateTodo(values);
      section.addItem(newTodoElement);
      todoCounter.updateTotal(true);
      newTodoValidator.resetValidation();
      addTodoPopup.close();
     } else {
      console.log("Date is undefined");
     }
     /*const name = inputValues.name;
     const dateInput = inputValues.date;

     const date = new Date(dateInput);
     date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

     const id = uuidv4();

     const values = { name, date, id };
     const todo =generateTodo(values);
     todosList.addItem(element);

     addTodoFormValidator.resetValidation();
     
     closeModal(addTodoPopupEl);
     */
   },
 });
 addTodoPopup.setEventListeners();


const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

/*
addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
});


function addTodoToList(todoData) {
  const todo = generateTodo(todoData);
  todosList.append(todo);
};
*/
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();