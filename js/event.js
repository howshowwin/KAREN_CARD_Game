$(".frame__mask-btn").on("click", function () {
  $(".frame__mask").addClass("animate__bounceOutUp animate__animated");
  game.shuffleCards();
  game.StartCountTime();
});
