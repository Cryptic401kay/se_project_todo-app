import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
};

function handleDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
}
      
const addTodoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup",
   handleFormSubmit: (inputValues) => {
     const { name, date } = inputValues;

     if (date !== undefined) {
      const dateInput = new Date(date);
      dateInput.setMinutes(dateInput.getMinutes() + dateInput.getTimezoneOffset());
      
      

      const id = uuidv4();

      const values = { name, date, dateInput, id };
      
      renderTodo(values);
      
      todoCounter.updateTotal(true);
      newTodoValidator.resetValidation();
      addTodoPopup.close();
     }
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
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();