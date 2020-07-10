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
// 參數管理
var timeCount = 0;
var gameStart = 0;
var gameTime = 180000;
var d = new Date();
var idle = false;
var finish = false;
function startCountTime() {
  gameTime = 180000;
  this.timeCount = false;
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
      game.gameOver();
    }
    if (timeCount == 1) {
      clearInterval(interval);
    }
  }, 10);
}

inactivityTime();
function inactivityTime() {
  var t;
  window.onload = resetTimer;
  // DOM Events
  window.onmousemove = resetTimer;
  window.onkeypress = resetTimer;
  window.onmousedown = resetTimer; // catches touchscreen presses
  window.onclick = resetTimer; // catches touchpad clicks

  function logout() {
    //alert("You are now logged out.")
    if (gameStart == 1) {
      console.log("ongame");
      timeCount = 1;
      idle = true;
      game.gameOver();
    } else if (gameStart == 0) {
      console.log("notongame");
    }
  }

  function resetTimer() {
    clearTimeout(t);
    var sessionTimeoutWarning = 1; //min
    // var sTimeout = parseInt(sessionTimeoutWarning) * 60 * 1000;
    var sTimeout = 5000;

    t = setTimeout(logout, sTimeout);
    // 1000 milisec = 1 sec
  }
}

class MemoryGame {
  constructor() {
    this.duration = 1000;
    this.cardsContainer = document.querySelector(".js-cards");
    this.cards = Array.from(this.cardsContainer.children);
    this.timeCount = false;
  }
  gameOver() {
    gameStart = 0;
    end.play();
    // 資料串接這
    let gameTimeNow = 180000 - gameTime;
    let min = Math.floor(gameTimeNow / 60000);
    let sec = Math.floor((gameTimeNow - min * 60000) / 1000);
    if (idle == true) {
      $(".scoreboard__lightbox-item--now p").text("閒置超時");
    }
    if (finish == true) {
      $(".scoreboard__lightbox-item--now p").text(`${min}分${sec}秒`);
    }
    finish = false;
    idle = false;
    $(".scoreboard__lightbox-item--date p").text(
      `${d.getFullYear()}/ ${d.getMonth() + 1}/ ${d.getDate()}`
    );

    $(".scoreboard")
      .removeClass("displaynone animate__bounceOut")
      .addClass("animate__fadeIn");
  }

  setDiminishing() {
    let a = 0;
    this.cards.forEach(function (card) {
      if (card.classList.contains("has-match")) {
        a++;
      }
    });
    a = 10 - a / 2;
    $("#game__diminishing").text(a < 10 ? `0${a}` : a);
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
      }, 400);
    });
    setTimeout(() => {
      for (var i = 0; i < 20; i++) {
        let a = $(".game__card").eq(i).css("order");

        $(".game__back-card")
          .eq(i)
          .css({
            background: `url('./images/game-${a}.jpg')`,
            backgroundSize: "cover",
          });
      }
    }, 500);
  }

  checkAllCards() {
    if (this.cards.every((card) => card.classList.contains("has-match"))) {
      setTimeout(() => {
        finish = true
        timeCount = 1;
        this.gameOver();
        // this.shuffleCards();
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
      tureclick.play();
      this.checkAllCards();
      this.setDiminishing();
    } else {
      firstCard.classList.add("false");
      secondCard.classList.add("false");
      falseclick.play();

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
    clickfirst.play();
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
