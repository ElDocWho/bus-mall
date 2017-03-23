'use strict';

var imageArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var nameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productArray = [];
var img1 = document.getElementById('left');
var img2 = document.getElementById('center');
var img3 = document.getElementById('right');
var button1 = document.getElementById('resultsbutton').style.visibility = 'hidden';
var button2 = document.getElementById('playagainbutton').style.visibility = 'hidden';
var button3 = document.getElementById('clearstorage').style.visibility = 'hidden';
var totalClicks = 0;

function Products(itemName, itemPath) {
  this.itemName = itemName;
  this.itemPath = itemPath;
  this.itemClick = 0;
  this.imageShown = 0;
  productArray.push(this);
};

for (var i = 0; i < imageArray.length; i++) {
  var filePath = 'img/' + imageArray[i];
  new Products(nameArray[i], filePath);
}

function randomImgIndex(){
  return Math.floor(Math.random() * imageArray.length);
};

var prevImgIndexes = [];
function randomImage(){
  var currentImgIndexes = [];
  while (currentImgIndexes.length < 3) {
    var imgSelector = randomImgIndex();
    if (!currentImgIndexes.includes(imgSelector) && !prevImgIndexes.includes(imgSelector)) {
      currentImgIndexes.push(imgSelector);
    }
  }
  var prod1 = productArray[currentImgIndexes[0]];
  var prod2 = productArray[currentImgIndexes[1]];
  var prod3 = productArray[currentImgIndexes[2]];
  img1.src = prod1.itemPath;
  img2.src = prod2.itemPath;
  img3.src = prod3.itemPath;
  img1.alt = currentImgIndexes[0];
  img2.alt = currentImgIndexes[1];
  img3.alt = currentImgIndexes[2];
  prevImgIndexes = currentImgIndexes;
  prod1.imageShown++;
  prod2.imageShown++;
  prod3.imageShown++;
};
randomImage();

var clickLimit = 25;
function handleTheClick(){
  setTimeout(randomImage, 100);
  totalClicks++;
  var productIdx = this.alt;
  productArray[productIdx].itemClick++;

  if (totalClicks === clickLimit) {
    img1.removeEventListener('click', handleTheClick);
    img2.removeEventListener('click', handleTheClick);
    img3.removeEventListener('click', handleTheClick);
    productClicks();
    localStorage['totalVotes'] = JSON.stringify(totalVotes);
    currentVotes.push(totalVotes);
    localStorage['totalShown'] = JSON.stringify(totalShown);
    currentShown.push(totalShown);
    sumVoteArray(totalVotes);
    sumShownArray(totalShown);
    var body = document.getElementsByTagName('body')[0];
    var main = document.getElementById('content');
    body.removeChild(main);
    var button1 = document.getElementById('resultsbutton').style.visibility = 'visible';
    var button2 = document.getElementById('playagainbutton').style.visibility = 'visible';
    var button3 = document.getElementById('clearstorage').style.visibility = 'visible';
  }
};

img1.addEventListener('click', handleTheClick);
img2.addEventListener('click', handleTheClick);
img3.addEventListener('click', handleTheClick);

var graphNames = [];
var totalVotes = [];
var totalShown = [];

function productClicks(){

  for (var i = 0; i < productArray.length; i++) {
    totalVotes.push(productArray[i].itemClick);
    graphNames.push(productArray[i].itemName);
    totalShown.push(productArray[i].imageShown);
    // localStorage['graphNames'] = JSON.stringify(graphNames);
  }
};
var currentVotes = [];
var summedVotes = [];
var currentShown = [];
var summedShown = [];

function sumVoteArray(currentVotes) {
  if (JSON.parse(localStorage.getItem('accumVotes'))) {
    var accumVotes = JSON.parse(localStorage.getItem('accumVotes'));
  } else {
    var accumVotes = [];
  }
  for (var i = 0; i < Math.max(currentVotes.length, accumVotes.length); i++) {
    summedVotes[i] = ((currentVotes[i] || 0) + (accumVotes[i] || 0));
  }
  localStorage['accumVotes'] = JSON.stringify(summedVotes);
  return summedVotes;
};

function sumShownArray(currentShown) {
  if (JSON.parse(localStorage.getItem('accumShown'))) {
    var accumShown = JSON.parse(localStorage.getItem('accumShown'));
  } else {
    var accumShown = [];
  }
  for (var i = 0; i < Math.max(currentShown.length, accumShown.length); i++) {
    summedShown[i] = ((currentShown[i] || 0) + (accumShown[i] || 0));
  }
  localStorage['accumShown'] = JSON.stringify(summedShown);
  return summedShown;
};

var button3 = document.getElementById('clearstorage');
function clearStorage(){
  localStorage.clear();
};
button3.addEventListener('click', clearStorage);
