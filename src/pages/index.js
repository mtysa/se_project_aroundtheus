//--------------------------------------------------------------------------------------//
//                                   Imports                                            //
//--------------------------------------------------------------------------------------//

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditform,
  cardListEl,
  cardTemplate,
  cardAddButton,
  cardAddForm,
  config,
} from "../utils/constants.js";

//--------------------------------------------------------------------------------------//
//                                   Edit Profile                                       //
//--------------------------------------------------------------------------------------//

const editFormValidator = new FormValidator(config, profileEditform);
editFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    job: inputValues.description,
  });
  profileEditPopup.close();
}

profileEditButton.addEventListener("click", openEditProfileModal);

const profileEditPopup = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

function openEditProfileModal() {
  const displayInfo = userInfo.getUserInfo();
  profileTitleInput.value = displayInfo.name;
  profileDescriptionInput.value = displayInfo.job;
  profileEditPopup.open();
}

//--------------------------------------------------------------------------------------//
//                                       Cards                                          //
//--------------------------------------------------------------------------------------//

const addFormValidator = new FormValidator(config, cardAddForm);
addFormValidator.enableValidation();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

cardSection.renderItems();

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  return card.getView();
}

const cardAddPopup = new PopupWithForm(
  { popupSelector: "#card-add-modal" },
  handleCardAddSubmit
);
cardAddPopup.setEventListeners();

function handleCardAddSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.description;
  renderCard({ name, link }, cardListEl);
  cardAddForm.reset();
  cardAddPopup.close();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

cardAddButton.addEventListener("click", () => {
  cardAddPopup.open();
  addFormValidator.toggleButtonState();
});

//--------------------------------------------------------------------------------------//
//                                    Image Popup                                       //
//--------------------------------------------------------------------------------------//

function handleImageClick(data) {
  imagePopup.open(data);
}

const imagePopup = new PopupWithImage({
  popupSelector: "#image-preview-modal",
});

imagePopup.setEventListeners();
