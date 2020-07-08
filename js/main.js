const arrA = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];

function putintocard() {
  let numbersCopy = arrA.map((x) => x);

  let index = Math.floor(Math.random() * numbersCopy.length);
  let putin = numbersCopy[index];

  numbersCopy.splice(index, 1);
}

class MemoryGame {
  constructor() {
    this.countTime = 180000;
    this.duration = 1000;
    this.cardsContainer = document.querySelector(".js-cards");
    this.cards = Array.from(this.cardsContainer.children);
  }
  setTimeInDom(time) {
    console.log(time);
  }

  StartCountTime() {
    var gameTime = this.countTime;
    var interval = setInterval(function () {
      gameTime -= 10;

      let min = Math.floor(gameTime / 60000);
      let sec = Math.floor((gameTime - min * 60000) / 1000);
      let secc = (gameTime - min * 60000) / 1000;

      $(".game__box-min").text(`${min}`);
      $(".game__box-sec").text(`${sec < 10 ? `0${sec}` : `${sec}`}`);
      let a = Math.floor((secc % 1) * 60);
      $(".game__box-ssec").text(a < 10 ? `0${a}` : `${a}`);

      if (gameTime === 0) {
        clearInterval(interval);
      }
    }, 10);
  }

  shuffleCards() {
    let numbersCopy = arrA.map((x) => x);

    this.cards.forEach((card) => {
      let index = Math.floor(Math.random() * numbersCopy.length);
      let putin = numbersCopy[index];

      numbersCopy.splice(index, 1);

      card.classList.remove("has-match");
      card.classList.remove("check");
    
      setTimeout(() => {
        card.style.order = `${putin}`;
        // card.style.background = `url('../images/game-2.jpg')`;
        // card.style.backgroundSize = "cover";
      }, 400);
    });
    setTimeout(() => {
      for (var i = 0; i < 20; i++) {
        let a = $(".game__card").eq(i).css("order")
  
        $(".game__back-card").eq(i).css({
             background : `url('../images/game-${a}.jpg')`,
             backgroundSize : "cover",
        });
      }
    }, 500);
  
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

      firstCard.classList.add("check");
      secondCard.classList.add("check");

 

      this.checkAllCards();
    } else {
      firstCard.classList.add("false");
      secondCard.classList.add("false");
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        firstCard.classList.remove("false");
        secondCard.classList.remove("false");
      
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

