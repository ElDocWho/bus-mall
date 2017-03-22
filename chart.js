'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function renderChart(){
  var data = {
    labels: graphNames,
    datasets: [{
      label: 'Times Clicked',
      data: totalVotes,
      backgroundColor: 'red',
    },
    {
      label: 'Times Shown',
      data: totalShown,
      backgroundColor: 'blue',
    }]
  };

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
};
