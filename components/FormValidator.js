class FormValidator {
    constructor(settings, formEl) {
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._errorClass = settings.errorClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._formEl = formEl;
    }

    _showInputError() {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = formElement.querySelector(errorElementId);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    }

   _hideInputError() {
     const errorElementId = `#${inputElement.id}-error`;
     const errorElement = formElement.querySelector(errorElementId);
     inputElement.classList.remove(this._inputErrorClass);
     errorElement.classList.remove(this._errorClass);
     errorElement.textContent = "";
   }

    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        showInputError(
          formElement,
          inputElement,
          inputElement.validationMessage,
          settings,
        );
      } else {
        hideInputError(formElement, inputElement, settings);
  }
    }

    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
    }

    _toggleButtonState() {
      if (this._hasInvalidInput(this._inputList)) {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    }

    _setEventListeners() {
      this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector),
      );
      this._buttonElement = this._formEl.querySelector(
        this._submitButtonSelector);

      this._toggleButtonState(this._inputList, this._buttonElement, this._inputSelector);

      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          toggleButtonState(this._inputList, this._buttonElement, this._inputSelector);
        });
      });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}

export default FormValidator;