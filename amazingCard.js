import Card from './Card.js';

export default class AmazingCard extends Card {
  set cardNumber(value) {
    this._cardNumber = value;

    const cardsImgArray = [
      './img/1.jpg',
      './img/2.jpg',
      './img/3.jpg',
      './img/5.jpg',
      './img/6.jpg',
      './img/1.jpg',
      './img/2.jpg',
      './img/3.jpg',
      './img/5.jpg',
      './img/6.jpg',
      './img/1.jpg',
      './img/2.jpg',
      './img/3.jpg',
      './img/5.jpg',
      './img/6.jpg',
      './img/noneimage.jpg'
    ];

    const img = document.createElement('img');
    img.src = cardsImgArray[value];
    img.style.width = '100%';
    img.style.height = '100%';

    img.onerror = () => {
      img.src = './img/default.jpg';
      console.error(`Ошибка загрузки изображения для cardNumber: ${value}`);
    };

    const cardBack = this.cardElement.querySelector('.card-back');
    if (cardBack) {
      cardBack.textContent = '';
      cardBack.append(img);
    } else {
      console.error('Элемент .card-back отсутствует!');
    }
  }
}
