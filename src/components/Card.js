export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    handleUnlikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleUnlikeClick = handleUnlikeClick;
  }

  getView() {
    // clone the template element with all its content and store it in a cardElement variable
    this._cardElement = document
      .querySelector("#card-template")
      .content.firstElementChild.cloneNode(true);
    // access the card title and image and store them in variables
    this.cardImageEl = this._cardElement.querySelector(".card__image");
    this.cardTitleEl = this._cardElement.querySelector(".card__title");
    // buttons
    this._cardLikeButton = this._cardElement.querySelector("#card-like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      "#card-delete-button"
    );
    // set the path to the image to the link field of the object
    this.cardImageEl.src = this._link;
    // set the image alt text to the name field of the object
    this.cardImageEl.alt = this._name;
    // set the card title to the name field of the object, too
    this.cardTitleEl.textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    //card like button
    this._cardLikeButton.addEventListener("click", () => {
      if (this._isLiked) {
        this._handleUnlikeClick(this);
      } else {
        this._handleLikeClick(this);
      }
    });
    //card delete button
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    // image preview
    this.cardImageEl.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, name: this._name })
    );
  }

  handleLikeButton(isLiked) {
    this._isLiked = isLiked;
    this._cardLikeButton.classList.add("card__like-button_active");
  }

  handleUnlikeButton(isLiked) {
    this._isLiked = !isLiked;
    this._cardLikeButton.classList.remove("card__like-button_active");
  }

  getId() {
    return this._id;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
