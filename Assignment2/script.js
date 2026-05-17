const myVideo = document.querySelector("#my-video");

// ----------------------------------------------------------------------
// Play / pause logic
// ----------------------------------------------------------------------

const playPauseButton = document.querySelector("#play-pause-button");
const playPauseImg = document.querySelector("#play-pause-img");

playPauseButton.addEventListener("click", toggleVideo);

function toggleVideo() {
  if (myVideo.paused === true || myVideo.ended === true) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  }
}

// ----------------------------------------------------------------------
// Mute / unmute logic
// ----------------------------------------------------------------------

const muteUnmuteButton = document.querySelector("#mute-unmute-button");
const muteUnmuteImg = document.querySelector("#mute-unmute-img");

muteUnmuteButton.addEventListener("click", toggleSound);

function toggleSound() {
  if (myVideo.muted === true) {
    myVideo.muted = false;
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
  } else {
    myVideo.muted = true;
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  }
}

// ----------------------------------------------------------------------
// Fast forward logic
// This button helps users quickly skip forward while watching the cooking
// process. It is useful for tutorial videos because users may want to move
// past waiting moments, such as heating the pan or frying time.
// ----------------------------------------------------------------------

const fastForwardButton = document.querySelector("#fast-forward-button");

fastForwardButton.addEventListener("click", fastForwardVideo);

function fastForwardVideo() {
  myVideo.currentTime = myVideo.currentTime + 5;
}

// ----------------------------------------------------------------------
// Cooking step logic
// These buttons are customised for the cooking tutorial context.
// Instead of using generic numbers, the buttons jump to specific cooking
// actions: adding oil, placing chicken, seasoning, and flipping.
// You can adjust these currentTime values after checking the exact timing
// of your own video.
// ----------------------------------------------------------------------

const stepMessage = document.querySelector("#step-message");

const step1Button = document.querySelector("#step1-button");
const step2Button = document.querySelector("#step2-button");
const step3Button = document.querySelector("#step3-button");
const step4Button = document.querySelector("#step4-button");

step1Button.addEventListener("click", gotoStep1);
step2Button.addEventListener("click", gotoStep2);
step3Button.addEventListener("click", gotoStep3);
step4Button.addEventListener("click", gotoStep4);

// This selects the paragraph that gives feedback to the user.
// I added this message because the website is designed as a cooking tutorial,
// so the user should not only jump to a video time, but also understand
// what cooking action they are watching. This improves usability because
// each step button gives clear feedback after it is clicked.

function gotoStep1() {
  myVideo.currentTime = 0;
  stepMessage.textContent = "Current step: add oil to the pan.";
}

function gotoStep2() {
  myVideo.currentTime = 5;
  stepMessage.textContent = "Current step: place the chicken steak in the pan.";
}

function gotoStep3() {
  myVideo.currentTime = 12;
  stepMessage.textContent = "Current step: add seasoning powder.";
}

function gotoStep4() {
  myVideo.currentTime = 18;
  stepMessage.textContent = "Current step: flip the chicken.";
}

const heartButton = document.querySelector("#heart-button");
const likes = document.querySelector("#likes");

let likesCount = 0;

heartButton.addEventListener("click", showLikes);

function showLikes() {
  likesCount++;
  likes.textContent = likesCount;
}

const fullscreenButton = document.querySelector("#fullscreen-button");

fullscreenButton.addEventListener("click", goFullscreen);
myVideo.addEventListener("dblclick", goFullscreen);

function goFullscreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const progressBar = document.querySelector("#progress-bar");

myVideo.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  let progress = Math.floor((myVideo.currentTime / myVideo.duration) * 100);
  progressBar.style.width = progress + "%";
}

// ----------------------------------------------------------------------
// Kitchen timer logic
// This timer is designed for the cooking tutorial context.
// Users can start a short countdown while frying the chicken or waiting
// before flipping it. This makes the media player more useful as a
// step-by-step cooking assistant rather than a normal video player.
// ----------------------------------------------------------------------

const timer30Button = document.querySelector("#timer-30-button");
const timer60Button = document.querySelector("#timer-60-button");
const timer120Button = document.querySelector("#timer-120-button");
const timerResetButton = document.querySelector("#timer-reset-button");

const timerDisplay = document.querySelector("#timer-display");
const timerMessage = document.querySelector("#timer-message");

let timerInterval;
let timeLeft = 0;

timer30Button.addEventListener("click", function () {
  startTimer(30);
});

timer60Button.addEventListener("click", function () {
  startTimer(60);
});

timer120Button.addEventListener("click", function () {
  startTimer(120);
});

timerResetButton.addEventListener("click", resetTimer);

function startTimer(seconds) {
  clearInterval(timerInterval);

  timeLeft = seconds;
  timerMessage.textContent = "";
  updateTimerDisplay();

  timerInterval = setInterval(function () {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerMessage.textContent = "Time is up! Check or flip the chicken.";
    }
  }, 1000);
}

function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(seconds).padStart(2, "0");

  timerDisplay.textContent =
    "Time left: " + formattedMinutes + ":" + formattedSeconds;
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 0;
  timerDisplay.textContent = "Time left: 00:00";
  timerMessage.textContent = "";
}
