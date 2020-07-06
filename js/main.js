const arrA = [
  ["團隊合作", "Teamwork"],
  ["團隊合作", "Teamwork"],

  ["熱情", "Passion"],
  ["熱情", "Passion"],

  ["榮譽", "Honer"],
  ["榮譽", "Honer"],

  ["創新", "Innovation"],
  ["創新", "Innovation"],

  ["速度", "Speed"],
  ["速度", "Speed"],

  ["承諾", "Commmitment"],
  ["承諾", "Commmitment"],

  ["企業道德", "Bussiness Ethics"],
  ["企業道德", "Bussiness Ethics"],

  ["執行力", "Excution"],
  ["執行力", "Excution"],

  ["專注", "Focus"],
  ["專注", "Focus"],

  ["勇氣", "Courage"],
  ["勇氣", "Courage"],
];
var numbersCopy = arrA.map((x) => x);

function putintocard(_this) {
  if (_this.hasClass("choose")) {
  } else {
    let index = Math.floor(Math.random() * numbersCopy.length);
    let putin = numbersCopy[index];

    numbersCopy.splice(index, 1);
    _this.addClass("choose");
    _this.append(`
        <h3>${putin[0]}</h3>
        <p>${putin[1]}</p>
        `);
  }
}

class MemoryGame {
  constructor() {
    this.countTime = 180;
    this.duration = 1000;
    this.cardsContainer = document.querySelector(".js-cards");
    this.cards = Array.from(this.cardsContainer.children);
  }
  StartCountTime() {
    var gameTime = this.countTime;

   
    var interval = setInterval(function () {
        gameTime -= 1;
      if (gameTime === 0) {
        clearInterval(interval);
      }
      console.log(gameTime)
      //do whatever here..
    }, this.duration);
  }

  shuffleCards() {
    this.cards.forEach((card) => {
      const randomNumber = Math.floor(Math.random() * this.cards.length) + 1;

      card.classList.remove("has-match");

      setTimeout(() => {
        card.style.order = `${randomNumber}`;
      }, 400);
    });
  }

  checkAllCards() {
    if (this.cards.every((card) => card.classList.contains("has-match"))) {
      setTimeout(() => {
        this.shuffleCards();
      }, this.duration);
    }
  }

  stopEvent() {
    this.cardsContainer.classList.add("no-event");

    setTimeout(() => {
      this.cardsContainer.classList.remove("no-event");
    }, this.duration);
  }

  checkIfMatched(firstCard, secondCard) {
    if (firstCard.dataset.msi === secondCard.dataset.msi) {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      firstCard.classList.add("has-match");
      secondCard.classList.add("has-match");

      this.checkAllCards();
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
      }, this.duration);
    }
  }

  flip(selectedCard) {
    selectedCard.classList.add("flipped");

    const flippedCards = this.cards.filter((card) =>
      card.classList.contains("flipped")
    );

    if (flippedCards.length === 2) {
      this.stopEvent();
      this.checkIfMatched(flippedCards[0], flippedCards[1]);
    }
  }
}

const game = new MemoryGame();

game.cards.forEach((card) => {
  card.addEventListener("click", game.flip.bind(game, card));
});

game.shuffleCards();
game.StartCountTime();
