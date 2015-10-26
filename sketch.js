var vid; //element to hold video
var img; //element to hold image
var canvas; // element to hold canvas
var pixelToSkip = 5;
var micInput;
var darkPoint = [];
var radius = 5;
var degree = 0;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  vid = createCapture(VIDEO);
  devicePixelScaling(false);
  vid.position(0, 0);
  vid.size(width, height);
  vid.hide();
  img = createImage(vid.width, vid.height);
  micInput = new p5.AudioIn();
  micInput.start();
}

function draw() {
background(0);
//load the pixels from the camera image
  vid.loadPixels();
// go line by line of that image to get the pixel properties, but skip some to limit results
  for (var y = 0; y < vid.height; y = y+pixelToSkip) {
    for (var x = 0; x < vid.width; x = x+pixelToSkip){
      var pixelArray = vid.get(x, y);
//store those pixel properties with a variable name of red, green, blue      
      var r = pixelArray[0];
      var g = pixelArray[1];
      var b = pixelArray[2];
      var vol = micInput.getLevel();
//find the darkest pixels and draw an ellipse there
      if (r+g+b-255 > 0){ 
        radius = vol*100;
        stroke(255, 255, 255);
        strokeWeight(1);
        line(x+width/4, y+height/12, x+width/4+radius*cos(degree), y+height/12+radius*sin(degree));
        degree = degree +10;
      }
    }
  }
}