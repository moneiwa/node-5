const cardValues = [
    '😎', '😎', '😍', '😍', '😴', '😴',  
    '🤣', '🤣', '😶‍🌫️', '😶‍🌫️', '😌', '😌',  
    '🙄', '🙄', '🤪', '🤪', '🤐', '🤐',
    '👻', '👻', '🎃', '🎃', '🌟', '🌟',
    '🌈', '🌈', '🍉', '🍉', '🍕', '🍕',
    '🍦', '🍦', '🎉', '🎉', '🚀', '🚀'
];

const totalCards = cardValues.length; 
let shuffledCards = []; 
let flippedCards = []; 
let matchedCards = []; 
let isGameOver = false;

function initGame() {
    shuffledCards = cardValues.sort(() => Math.random() - 0.5);
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index; 
        cardElement.addEventListener('click', flipCard); 
        gameBoard.appendChild(cardElement); 
    });
}

function flipCard() {
    if (isGameOver || this.classList.contains('flipped') || flippedCards.length >= 2) return;

    this.classList.add('flipped'); 
    const cardIndex = this.dataset.index; 
    flippedCards.push(cardIndex); 

    this.textContent = shuffledCards[cardIndex];

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000); 
    }
}

function checkMatch() {
    const [firstIndex, secondIndex] = flippedCards;
    if (shuffledCards[firstIndex] === shuffledCards[secondIndex]) {
        matchedCards.push(firstIndex, secondIndex); 
        if (matchedCards.length === totalCards) {
            alert('Congratulations! You won!'); 
            isGameOver = true; 
        }
    } else {
        const firstCard = document.querySelector(`.card[data-index='${firstIndex}']`);
        const secondCard = document.querySelector(`.card[data-index='${secondIndex}']`);
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = ''; 
            secondCard.textContent = ''; 
        }, 1000);
    }
    flippedCards = [];
}


document.getElementById('resetBtn').addEventListener('click', () => {
    isGameOver = false; 
    matchedCards = []; 
    initGame(); 
});


document.getElementById('submitBtn').addEventListener('click', () => {
    if (isGameOver) {
        alert('The game is already over!reset');
    } else {
        isGameOver = true;
        alert('Game submitted!');
        matchedCards = []; 
    }
});

initGame();
