const cardData = [
  { id: 1, frontImg: 'https://clipartix.com/wp-content/uploads/2018/03/big-cartoon-eyes-clipart-2018-46.jpg' },
  { id: 2, frontImg: 'https://static.vecteezy.com/system/resources/previews/000/302/059/original/vector-a-human-ear-on-white-background.jpg' },
  { id: 3, frontImg: 'https://tse2.mm.bing.net/th?id=OIP.EnogpJfIYaGK7n-CwonQfAHaF5&pid=Api&P=0&h=180.jpg' },
  { id: 4, frontImg: 'https://tse3.mm.bing.net/th?id=OIP.t1bwiDb9Z045x7IALqwJTgHaIs&pid=Api&P=0&h=180.jpg' },
  { id: 5, frontImg: 'http://clipartmag.com/images/cartoon-nose-images-33.jpg' },
  { id: 6, frontImg: 'https://tse3.mm.bing.net/th?id=OIP.OAZtY1QgvpLlxPkdQes5gwHaJj&pid=Api&P=0&h=180.jpg' },
  { id: 7, frontImg: 'https://i.pinimg.com/originals/8c/d6/be/8cd6be4eca05c24d84344bb7eb7b6dae.jpg' },
  { id: 8, frontImg: 'https://tse4.explicit.bing.net/th?id=OIP.r_sIkuJOmKGxjAngminQ3AHaGY&pid=Api&P=0&h=180.jpg' },
  { id: 9, frontImg: 'https://tse3.mm.bing.net/th?id=OIP.icZ-xxXfxXvIAYdDsFDifwHaEo&pid=Api&P=0&h=180.jpg' },
  { id: 10, frontImg: 'https://cdn1.vectorstock.com/i/1000x1000/27/65/cute-boy-face-cartoon-vector-23302765.jpg' },
];

let cards = [];
let flippedCards = [];
let score = 0;
let gameStarted = false;

function getRandomCards() {
  const randomCards = [];

  while (randomCards.length < 10) {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    const randomCard = cardData[randomIndex];
    if (!randomCards.includes(randomCard)) {
      randomCards.push(randomCard);
    }
  }

  return randomCards.concat(randomCards);
}

function createCardElements() {
  const gameGrid = document.getElementById('game-grid');
  gameGrid.innerHTML = '';

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    cardInner.addEventListener('click', () => flipCard(cardElement));

    const cardFront = document.createElement('img');
    cardFront.src = card.frontImg;
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('img');
    cardBack.src = 'https://clipartcraft.com/images/question-mark-clipart-animated-3.png';
    cardBack.classList.add('card-back');

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);
    gameGrid.appendChild(cardElement);
  });
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function flipCard(card) {
  if (!gameStarted) {
    return;
  }

  if (card.classList.contains('flipped')) {
    return;
  }

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 1000);
  }
}

function checkForMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  const id1 = card1.dataset.id;
  const id2 = card2.dataset.id;

  if (id1 === id2) {
    removeCards();
    score++;
    updateScore();
    checkWinCondition();
  } else {
    flipCardsBack();
  }

  flippedCards = [];
}

function removeCards() {
  flippedCards[0].style.visibility = 'hidden';
  flippedCards[1].style.visibility = 'hidden';
}

function flipCardsBack() {
  flippedCards.forEach(card => {
    card.classList.remove('flipped');
  });
}

function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Score: ${score}`;
}

function checkWinCondition() {
  const remainingCards = Array.from(document.getElementsByClassName('card')).filter(card => card.style.visibility !== 'hidden');
  if (remainingCards.length === 0) {
    endGame();
  }
}

function startGame() {
  cards = getRandomCards();
  shuffleCards();
  createCardElements();
  score = 0;
  updateScore();
  gameStarted = true;
}

function endGame() {
  gameStarted = false;
  alert('Congratulations! You have won the game!');
}
