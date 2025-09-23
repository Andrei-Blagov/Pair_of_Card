export default class Card {
  constructor(container, cardNumber, flipCallback) {
    this.container = container;
    this._open = false;
    this._success = false;
    this.flipCallback = flipCallback;
    this.cardElement = this.createElement();
    container.append(this.cardElement);
    this.cardNumber = cardNumber;
  }

  createElement() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col-4', 'mb-4', 'card-container');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const imgFront = document.createElement('img');
    imgFront.src = './img/cardFront.jpg';
    imgFront.style.width = '100%';
    imgFront.style.height = '100%';
    cardFront.append(imgFront);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardContainer.append(cardFront, cardBack);

    cardContainer.addEventListener('click', () => {
      if (!this._open && !this._success) {
        this.open = true;
        this.flipCallback(this);
      }
    });

    return cardContainer;
  }

  set cardNumber(value) {
    this._cardNumber = value;
    if (this.cardElement) {
      const cardBack = this.cardElement.querySelector('.card-back');
      if (cardBack) {
        cardBack.textContent = value;
      } else {
        console.error('Элемент .card-back отсутствует!');
      }
    } else {
      console.error('cardElement не определен!');
    }
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this._open = value;
    this.cardElement.style.transform = value ? 'rotateY(180deg)' : 'rotateY(0deg)';
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    if (value) {
      this.cardElement.classList.add('matched');
    }
  }

  get success() {
    return this._success;
  }
}
