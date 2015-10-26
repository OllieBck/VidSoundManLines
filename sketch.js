// takes the darkest points on a camera and renders them into spinning lines; line size varies based off of sound
// code developed from:
// Learning Processing   Daniel Shiffman  http://www.learningprocessing.com  Example 20-9: Mic input
//https://github.com/ITPNYU/ICM-2015/blob/master/09_video_sound/01_sound/example_20_09_mic_input/sketch.js
// and code by Daniel O'Sullivan for ITP ICM course https://github.com/ITPNYU/ICM-2015/wiki/Homework-Dano-Wednesday

var vid; //element to hold video
var img; //element to hold image
var canvas; // element to hold canvas
var pixelToSkip = 5;
var micInput;
var darkPoint = [];
var radius = 5;
var degree = 0;
var backRed, backGreen, backBlue, redValue, greenValue, blueValue, backAlpha, alphaValue;
var redInst, greenInst, blueInst, alphaInst;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  vid = createCapture(VIDEO);
  devicePixelScaling(false);
  vid.position(0, 0);
  vid.size(width, height);
  vid.hide();
  img = createImage(vid.width, vid.height);
  micInput = new p5.AudioIn(); //sound library?
  micInput.start();
  backRed = createSlider(0, 255, 255);
  backRed.position(width-width/4, height/12);
  redInst = createDiv("Control red value of background");
  redInst.style("color", "#ff0000")
  redInst.position(width-width/4, height/12+25);
  backGreen = createSlider(0, 255, 255);
  greenInst = createDiv("Control green value of background");
  greenInst.style("color", "#00e500");
  greenInst.position(width-width/4, height/12+75);
  backGreen.position(width-width/4, height/12+50);
  backBlue = createSlider(0, 255, 255);
  backBlue.position(width-width/4, height/12+100);
  blueInst = createDiv("Control blue value of background");
  blueInst.style("color", "#0000ff");
  blueInst.position(width-width/4, height/12+125);
  backAlpha = createSlider(0, 255, 255);
  backAlpha.position(width-width/4, height/12+150);
  alphaInst = createDiv("Control opacity of background");
  alphaInst.position(width-width/4, height/12+175);
}

function draw() {
redValue = backRed.value();
greenValue = backGreen.value();
blueValue = backBlue.value();
alphaValue = backAlpha.value();
background(redValue, greenValue, blueValue, alphaValue);
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
//find the darker pixels and draw spinning lines there there
      if (r+g+b-255 < 0){ 
        radius = vol*100;
        stroke([r, g, b, 255]);
        strokeWeight(1);
        line(x+width/6, y+height/12, x+width/6+radius*cos(degree), y+height/12+radius*sin(degree));
        degree = degree +1;
      }
    }
  }
}
