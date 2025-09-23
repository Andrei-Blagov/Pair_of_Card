import Card from './card.js';
import AmazingCard from './amazingCard.js';

const TIME_OF_GAME = 60000;
const TIME_OF_DISPLAY = 5000;
let cardsArray = [];
let selectedCards = [];

const buttonStart = document.createElement('button');
buttonStart.textContent = 'Начать игру';
buttonStart.classList.add('btn', 'btn-danger', 'btn-lg', 'btn__buttonstart');

const listItems = document.createElement('div');
listItems.classList.add('row', 'justify-content-center', 'listitems');

const displeyEnd = document.createElement('div');
displeyEnd.textContent = 'Время вышло!';
displeyEnd.classList.add('displey-end');

const winMessage = document.createElement('div');
winMessage.textContent = 'Победа!';
winMessage.classList.add('win-message');

function createNumbersArray(count) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i, i);
  }
  return arr;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createCardsArray(count, container, CardType) {
  const numbersArray = shuffle(createNumbersArray(count));
  cardsArray = numbersArray.map(number => new CardType(container, number, handleCardFlip));
}

function handleCardFlip(card) {
  selectedCards.push(card);
  console.log('Клик по карте', card);

  if (selectedCards.length === 2) {
    const [first, second] = selectedCards;
    if (first._cardNumber === second._cardNumber) {
      first.success = true;
      second.success = true;
      selectedCards = [];
      checkWinCondition();
    } else {
      setTimeout(() => {
        first.open = false;
        second.open = false;
        selectedCards = [];
      }, 1000);
    }
  }
}

function checkWinCondition() {
  if (cardsArray.every(card => card.success)) {
    document.body.append(winMessage);
    setTimeout(() => location.reload(), TIME_OF_DISPLAY);
  }
}

function startGame(count, CardType) {
  document.body.append(listItems);
  createCardsArray(count, listItems, CardType);

  setTimeout(() => {
    document.body.append(displeyEnd);
    setTimeout(() => location.reload(), TIME_OF_DISPLAY);
  }, TIME_OF_GAME);
}

buttonStart.addEventListener('click', () => {
  let count = parseInt(prompt('Введите чётное количество пар карточек от 2 до 10:', ''), 10);
  if (count % 2 !== 0 || count < 2 || count > 10) {
    count = 4;
  }

  const cardType = prompt('Играть с картинками или с числами? (Введите "картинки" или "числа")').toLowerCase();
  if (cardType === 'картинки') {
    const CardType = AmazingCard;
    buttonStart.style.display = 'none';
    startGame(count, CardType);
  } else {
    const CardType = Card;
    buttonStart.style.display = 'none';
    startGame(count, CardType);
  };
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.append(buttonStart);
});
