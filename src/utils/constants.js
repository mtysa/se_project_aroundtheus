//--------------------------------------------------------------------------------------//
//                                      Elements                                       //
//--------------------------------------------------------------------------------------//
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditform = document.querySelector("#profile-edit-form");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardAddButton = document.querySelector(".profile__add-button");
export const cardAddForm = document.querySelector("#card-add-form");
export const profileImageButton = document.querySelector(
  "#profile-image-button"
);
export const profileImageForm = document.querySelector(
  "#profile-image-edit-form"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
