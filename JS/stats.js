const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

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

window.addEventListener('load', () => {
  chart.resize();
});