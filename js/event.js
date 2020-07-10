$(".frame__mask-btn").on("click", function () {
  $(".frame__mask").addClass("animate__bounceOutUp animate__animated");
  game.shuffleCards();
  gameStart = 1;
  start.play();
  startCountTime();
});

$(".scoreboard__lightbox-btn").on("click", function () {
  $(".scoreboard")
    .removeClass("animate__fadeIn displaynone")
    .addClass("animate__bounceOut ");
  setTimeout(() => {
    $(".scoreboard").addClass("displaynone");
  }, 1000);
  $("#game__diminishing").text('10');
  game.shuffleCards();
  gameStart = 1;

  start.play();
  startCountTime();
});
