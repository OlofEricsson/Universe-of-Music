const WIDTH = 1080;
const HEIGHT = WIDTH * 2 / 3;

const canvas = document.querySelector('canvas');
const audio = document.querySelector('audio');

const classicC = document.querySelector("#classiccard");
const popC = document.querySelector("#popcard");
const hardstyleC = document.querySelector("#hardstylecard");
const hiphopC = document.querySelector("#hiphopcard");

const classicB = document.querySelector("#classiccircle");
const popB = document.querySelector("#popcircle");
const hardstyleB = document.querySelector("#hardstylecircle");
const hiphopB = document.querySelector("#hiphopcircle");
const buttons = [classicB, popB, hardstyleB, hiphopB];

canvas.width = WIDTH;
canvas.height = HEIGHT;
const canvasCtx = canvas.getContext('2d');

let isInitialized = false;
audio.addEventListener('play', () => {
  if (!isInitialized) {
    initialize();
    isInitialized = true
  }
})

function initialize() {    
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination)

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw)

        analyser.getByteFrequencyData(dataArray)

        
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 6;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight =  Math.pow(dataArray[i] / 16, 2);
            canvasCtx.fillStyle = 'rgb(255 255 255)';
            canvasCtx.fillRect(x, (HEIGHT / 2 ) - barHeight, barWidth, barHeight * 2);
            x += barWidth + 10;
        }
    }

    draw();
}

function activateButton(btn) {
  btn.style.width = '11vw';
  btn.style.height = '11vw';
  //lägg i array
  classicC.style.visibility = "visible";
  popC.style.visibility = "visible";
  hardstyleC.style.visibility = "visible";
  hiphopC.style.visibility = "visible";
}

function resetButtons() {
  buttons.forEach(btn => {
    btn.style.width = '';
    btn.style.height = '';
    classicC.style.visibility = "hidden";
    popC.style.visibility = "hidden";
    hardstyleC.style.visibility = "hidden";
    hiphopC.style.visibility = "hidden";
  });
}

buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetButtons();
    activateButton(btn);
  });
});

document.addEventListener('click', () => {
  resetButtons();
});