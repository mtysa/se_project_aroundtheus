import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://images.unsplash.com/photo-1583133183696-7e960832aa11?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lake Louise",
    link: "https://images.unsplash.com/photo-1506916275971-678903294dae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://images.unsplash.com/photo-1539540706191-b673a0a5b6d6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://images.unsplash.com/photo-1581520734619-86fbd0a3d083?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

//--------------------------------------------------------------------------------------//
//                                      Elements                                       //
//--------------------------------------------------------------------------------------//

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditform = profileEditModal.querySelector("#profile-edit-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = cardAddModal.querySelector("#card-add-form");
const cardCloseButton = document.querySelector("#card-close-button");
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-image-input");
const imagePreviewModal = document.querySelector("#image-preview-modal");
const imageTitle = document.querySelector(".modal__image-title");
const imageCloseButton = document.querySelector("#image-close-button");
const imagePreview = document.querySelector(".modal__image");

//--------------------------------------------------------------------------------------//
//                              Form Validation                                         //
//--------------------------------------------------------------------------------------//
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, profileEditform);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(config, cardAddForm);
addFormValidator.enableValidation();

//--------------------------------------------------------------------------------------//
//                                      Functions                                       //
//--------------------------------------------------------------------------------------//

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

// function getCardElement(cardData) {
//   // clone the template element with all its content and store it in a cardElement variable
//   const cardElement = cardTemplate.cloneNode(true);
//   // access the card title and image and store them in variables
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   // card like button
//   const cardLikeButton = cardElement.querySelector("#card-like-button");
//   cardLikeButton.addEventListener("click", () =>
//     cardLikeButton.classList.toggle("card__like-button_active")
//   );
//   // card delete button
//   const cardDeleteButton = cardElement.querySelector("#card-delete-button");
//   cardDeleteButton.addEventListener("click", () => cardElement.remove());
//   // image preview
//   cardImageEl.addEventListener("click", () => handleImageClick(cardData));
//   // set the path to the image to the link field of the object
//   cardImageEl.src = cardData.link;
//   // set the image alt text to the name field of the object
//   cardImageEl.alt = cardData.name;
//   // set the card title to the name field of the object, too
//   cardTitleEl.textContent = cardData.name;
//   // return the ready HTML element with the filled-in data
//   return cardElement;
// }

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openPopup(profileEditModal);
}

// function renderCard(cardData) {
//   const cardElement = getCardElement(cardData);
//   cardListEl.prepend(cardElement);
// }

//--------------------------------------------------------------------------------------//
//                                    Event Handlers                                    //
//--------------------------------------------------------------------------------------//

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link }, cardListEl);
  cardAddForm.reset();
  closePopup(cardAddModal);
}

function handleEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function handleImageClick(previewData) {
  imagePreview.src = previewData.link;
  imageTitle.textContent = previewData.name;
  imagePreview.alt = previewData.name;
  openPopup(imagePreviewModal);
}

//--------------------------------------------------------------------------------------//
//                                   Event Listeners                                    //
//--------------------------------------------------------------------------------------//

profileEditButton.addEventListener("click", openEditProfileModal);

profileEditform.addEventListener("submit", handleProfileEditSubmit);

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
  addFormValidator._toggleButtonState();
});

cardAddForm.addEventListener("submit", handleCardAddSubmit);

const popups = document.querySelectorAll(".modal");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(popup);
    }
    if (e.target.classList.contains("modal__close")) {
      closePopup(popup);
    }
  });
});

//--------------------------------------------------------------------------------------//
//                                   Cards                                              //
//--------------------------------------------------------------------------------------//

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}
