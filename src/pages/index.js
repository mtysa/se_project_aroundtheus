//--------------------------------------------------------------------------------------//
//                                   Imports                                            //
//--------------------------------------------------------------------------------------//

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  profileEditButton,
  profileEditform,
  cardListEl,
  cardTemplate,
  cardAddButton,
  cardAddForm,
  config,
  profileImageButton,
  profileImageForm,
} from "../utils/constants.js";

//--------------------------------------------------------------------------------------//
//                                         API                                          //
//--------------------------------------------------------------------------------------//

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "51c65eaa-1f8a-47ac-8e22-d8720367b4fb",
    "Content-Type": "application/json",
  },
});

//--------------------------------------------------------------------------------------//
//                                   Edit Profile                                       //
//--------------------------------------------------------------------------------------//

const editFormValidator = new FormValidator(config, profileEditform);
editFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, profileImageForm);
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Get User Info

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      description: res.about,
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Update User Info

function handleProfileEditSubmit(inputValues) {
  api
    .updateUserInfo(inputValues.title, inputValues.description)
    .then(() => {
      userInfo.setUserInfo({
        name: inputValues.title,
        job: inputValues.description,
      });
    })
    .catch((err) => {
      console.error(err);
    });
  profileEditPopup.close();
}

const profileEditPopup = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  profileEditPopup.open();
});

const profileImagePopup = new PopupWithForm(
  {
    popupSelector: "#profile-image-edit-modal",
  },
  handleProfilePicSubmit
);
profileImagePopup.setEventListeners();

profileImageButton.addEventListener("click", () => {
  profileImagePopup.open();
});

function handleProfilePicSubmit(inputValues) {
  api.updateAvatar(inputValues.description).then((res) => {
    userInfo.setUserAvatar({ link: inputValues.des });
  });
  profileImagePopup.close();
}

//--------------------------------------------------------------------------------------//
//                                       Cards                                          //
//--------------------------------------------------------------------------------------//

const addFormValidator = new FormValidator(config, cardAddForm);
addFormValidator.enableValidation();

// Render Cards
let cardSection;
api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: createCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    cardTemplate,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    handleUnlikeClick
  );
  return card.getView();
}

// Add Card

const cardAddPopup = new PopupWithForm(
  { popupSelector: "#card-add-modal" },
  handleCardAddSubmit
);
cardAddPopup.setEventListeners();

function handleCardAddSubmit(inputValues) {
  api.addCard(inputValues.title, inputValues.description).then(() => {
    renderCard(
      {
        name: inputValues.title,
        link: inputValues.description,
      },
      cardListEl
    );
  });
  cardAddForm.reset();
  cardAddPopup.close();
}

cardAddButton.addEventListener("click", () => {
  cardAddPopup.open();
  addFormValidator.toggleButtonState();
});

// Delete Card
function handleDeleteClick(card) {
  cardDeletePopup.open();
  cardDeletePopup.setSubmitAction(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        cardDeletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
const cardDeletePopup = new PopupWithConfirmation(
  {
    popupSelector: "#delete-card-modal",
  },
  handleDeleteClick
);
cardDeletePopup.setEventListeners();

// Card Likes
function handleLikeClick(card) {
  api.likeCard(card.getId()).then((res) => {
    card.handleLikeButton(res.isLiked);
  });
}

function handleUnlikeClick(card) {
  api.unlikeCard(card.getId()).then((res) => {
    card.handleUnlikeButton(!res.isLiked);
  });
}

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
