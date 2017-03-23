'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function renderChart(){
  // var summedVotes = localStorage['accumVotes'];
  // var summedShown = localStorage['accumShown'];
  // var graphNames = localStorage['graphNames'];
  var data = {
    labels: graphNames,
    datasets: [{
      label: 'Times Clicked',
      data: summedVotes,
      backgroundColor: 'red',
    },
    {
      label: 'Times Shown',
      data: summedShown,
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
// renderChart();
