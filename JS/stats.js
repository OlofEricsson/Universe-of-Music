const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

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

const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Classic', 'Pop', 'Hardstyle', 'Hiphop'],
    datasets: [{
      label: 'Popularity',
      data: [12, 19, 3, 5],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

//behöver fixas
window.addEventListener('load', () => {
  chart.resize();
});

