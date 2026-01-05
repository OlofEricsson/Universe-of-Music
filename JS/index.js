const classicC = document.querySelector("#classiccard");
const popC = document.querySelector("#popcard");
const hardstyleC = document.querySelector("#hardstylecard");
const hiphopC = document.querySelector("#hiphopcard");
const cards = [classicC, popC, hardstyleC, hiphopC]

cards.forEach (card => {card.style.visibility = "hidden";})

const classicB = document.querySelector("#classiccircle");
const popB = document.querySelector("#popcircle");
const hardstyleB = document.querySelector("#hardstylecircle");
const hiphopB = document.querySelector("#hiphopcircle");
const buttons = [classicB, popB, hardstyleB, hiphopB];

const classicCan = document.querySelector('.classiccanvas');
const popCan = document.querySelector('.popcanvas');
const hardstyleCan = document.querySelector('.hardstylecanvas');
const hiphopCan = document.querySelector('.hiphopcanvas');
const canvases = [classicCan, popCan, hardstyleCan, hiphopCan]

const classicM = document.querySelector('#classicmusic');
const popM = document.querySelector('#popmusic');
const hardstyleM = document.querySelector('#hardstylemusic');
const hiphopM = document.querySelector('#hiphopmusic');
const music = [classicM, popM, hardstyleM, hiphopM];

const WIDTH = 1080;
const HEIGHT = WIDTH * 2 / 3;

canvases.forEach(canvas => {
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
})

const classicCanCtx = canvases[0].getContext('2d');
const popCanCtx = canvases[1].getContext('2d');
const hardstyleCanCtx = canvases[2].getContext('2d');
const hiphopCanCtx = canvases[3].getContext('2d');
const canvasCtx = [classicCanCtx, popCanCtx, hardstyleCanCtx, hiphopCanCtx]

var stars = document.querySelector('#stars');
var starCtx = stars.getContext('2d');

const rect = stars.getBoundingClientRect();
stars.width = rect.width;
stars.height = rect.height;

starCtx.fillStyle = "white";
for (let i = 0; i < 100; i++) {
  starCtx.fillRect(Math.floor(Math.random() * rect.width), Math.floor(Math.random() * rect.height), 2, 2);
}
starCtx.fillStyle = "blue";
for (let i = 0; i < 1000; i++) {
  starCtx.fillRect(Math.floor(Math.random() * rect.width), Math.floor(Math.random() * rect.height), 1, 1);
}

music.forEach((song, index) => {
  song.addEventListener('play', () => {
    stopOtherSongs(song)
    initializeAudio(song, index);
 });
});

function initializeAudio(song, index) {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaElementSource(song);

  audioCtx.resume();
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 2048;

  startVisualizer(analyser, canvasCtx[index]);

}

function startVisualizer(analyser, ctx) {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 6;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = Math.pow(dataArray[i] / 16, 2);

      ctx.fillStyle = 'rgb(255 255 255)';
      ctx.fillRect(
        x,
        HEIGHT / 2 - barHeight,
        barWidth,
        barHeight * 2
      );

      x += barWidth + 10;
    }
  }

  draw();
}

function stopOtherSongs(currentSong) {
  music.forEach(song => {
    if (song !== currentSong) {
      song.pause();
      song.currentTime = 0;
    }
  });
}



function activateButton(btn, index) {
  btn.style.width = '11vw';
  btn.style.height = '11vw';

  cards[index].style.visibility = "visible";
  cards[index].style.marginTop = "25vh";
}

function resetButtons() {
  buttons.forEach(btn => {
    btn.style.width = '';
    btn.style.height = '';
    
    cards.forEach (card => {card.style.visibility = "hidden";})
  });
}

buttons.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetButtons();
    activateButton(btn, index);
  });
});

document.addEventListener('click', () => {
  resetButtons();
});