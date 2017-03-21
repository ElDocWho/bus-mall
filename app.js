'use strict';

var imageArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var nameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productArray = [];
var totalClicks = 0;
var img1 = document.getElementById('left');
var img2 = document.getElementById('center');
var img3 = document.getElementById('right');

// create a constructor function
function Products(itemName, itemPath) {
  this.itemName = itemName;
  this.itemPath = itemPath;
  this.itemClick = 0;
  this.imageShown = 0;
  productArray.push(this);
};

// create all of our item objects
for (var i = 0; i < imageArray.length; i++) {
  var filePath = 'img/' + imageArray[i];
  new Products(nameArray[i], filePath);
}

// generate a random index in the imageArray
function randomImgIndex(){
  return Math.floor(Math.random() * imageArray.length);
};

// use the random number above to select images
var prevImgIndexes = []; // <-- holds indexes for images just shown
function randomImage(){
  var currentImgIndexes = []; // <-- holds indexes for images we're about to show
  while (currentImgIndexes.length < 3) {
    var imgSelector = randomImgIndex();
    // if image we selected is not in the currentImgIndexes array or prevImgIndexes array...
    if (!currentImgIndexes.includes(imgSelector) && !prevImgIndexes.includes(imgSelector)) {
      currentImgIndexes.push(imgSelector);
    }
  } // generated 3 unique random image indexes
  // take the currentImgIndexes and use them to pull actual images into the HTML
  var prod1 = productArray[currentImgIndexes[0]];
  var prod2 = productArray[currentImgIndexes[1]];
  var prod3 = productArray[currentImgIndexes[2]];
  img1.src = prod1.itemPath;
  img2.src = prod2.itemPath;
  img3.src = prod3.itemPath;
  // setting the alt attribute so that the product that was clicked can be kept track of
  img1.alt = currentImgIndexes[0]; // 12
  img2.alt = currentImgIndexes[1]; // 7
  img3.alt = currentImgIndexes[2]; // 13
  // after this point, the images in currentImgIndexes have been shown
  prevImgIndexes = currentImgIndexes; // make whatever was current now be previous for the next call
  // images have been shown. let the product objects themselves know that
  prod1.imageShown++;
  prod2.imageShown++;
  prod3.imageShown++;
};
randomImage();

// when I click an image, it runs the above function to get three new random images.
// when I click an image, the counter of total clicks goes up one
var clickLimit = 25;
function handleTheClick(){ // ...handle each click
  randomImage();
  totalClicks++;
  // get the index of the item that was clicked
  var productIdx = this.alt;
  // use the index to point at a product in productArray
  // increment up the number of clicks for the image that was clicked. Property name: itemClick
  productArray[productIdx].itemClick++;

  // if I've clicked 25 times, then disallow clicking
  if (totalClicks === clickLimit) {
    img1.removeEventListener('click', handleTheClick);
    img2.removeEventListener('click', handleTheClick);
    img3.removeEventListener('click', handleTheClick);
    productClicks();
  }
};

img1.addEventListener('click', handleTheClick);
img2.addEventListener('click', handleTheClick);
img3.addEventListener('click', handleTheClick);

// show the user how many times each product was clicked
function productClicks(){
  var content = document.getElementById('content');
  var ul = document.createElement('ul');
  content.appendChild(ul);
  for (var i = 0; i < productArray.length; i++) {
    var li = document.createElement('li');
    var dataStr = productArray[i].itemClick + ' clicks for ' + productArray[i].itemName;
    li.innerText = dataStr;
    ul.appendChild(li);
  }
}
