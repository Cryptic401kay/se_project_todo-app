import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    const inputValues = {};
    this._inputList.forEach((input) => {[
      input.name = input.value,
      input.dateInput = date.value,

    ]});
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const inputValues = this._getInputValues();
        // pass results to _getInputValue to sub handler
        this._handleFormSubmit(evt);
    });
  };
}

export default PopupWithForm;
