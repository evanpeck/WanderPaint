var mic;
var min_radius = 1;
var max_radius = 20;

// variables for movement
var xoff = 0.0;
var yoff = 0.0;


// Circle style
var r, g, b;

// For corner labels
var TEXT_BUFFER = 10;
var TEXT_SIZE = 16;

// Canvas height is ALMOST size of screen
var HEIGHT; 
var SCREEN_BUFFER = 20;

var LABELS_AFTER = 25;
var count = 0;

function setup() {
  HEIGHT = windowHeight - SCREEN_BUFFER; 
  createCanvas(windowWidth, HEIGHT);
  mic = new p5.AudioIn()
  mic.start();
  background(0);
  fill(255);
  ellipseMode(CORNER);
  textFont("Helvetica");
}

function draw(){
  // Wait LABELS_AFTER frames to put labels on screen 
  // fixes some strange layout issues
  if (count < LABELS_AFTER) {
    count = count + 1;
  }
  else if (count == LABELS_AFTER) {
    // Corner labels to help control movement
    // TODO: Map to something else
    textSize(12);
    fill(240);
    textAlign(LEFT);
    text("[meander]", TEXT_BUFFER, TEXT_SIZE + TEXT_BUFFER);
    text("[vertical splatter]", TEXT_BUFFER, HEIGHT - TEXT_SIZE)
    textAlign(RIGHT);
    text("[sideways splatter]", windowWidth - TEXT_BUFFER, TEXT_SIZE + TEXT_BUFFER);
    text("[chaos]", windowWidth - TEXT_BUFFER, HEIGHT - TEXT_SIZE);
    count = count + 1;
  }
  
  // The pseudo-random(ish) movement is based on mouse position
  xoff = xoff + mouseX/10000;
  yoff = yoff + mouseY/10000;
  var x = noise(xoff) * windowWidth;
  var y = noise(yoff) * HEIGHT;

  // The size of the paint brush is based on mic volume
  micLevel = mic.getLevel(0.7);
  radius = map(micLevel, 0, 0.2, min_radius, max_radius);

  // Draw the paint brush
  fill(r, g, b);
  noStroke();
  ellipse(x, y, radius, radius);
}

function mouseClicked() {
  // Randomly change color based on mouse clicks
  r = random(255);
  g = random(255);
  b = random(255);
}

function keyTyped() {
  // Space clears the screen. 
  if (key == ' ') {
    background(0);
    mouseClicked();
  }
  // Saves the canvas as an image with 's'
  if (key == 's') {
    saveCanvas('splatter', 'jpg');
  }
  
}

function windowResized() {
  // Fit the canvas to the size of the window, even if it is resized
  HEIGHT = windowHeight - SCREEN_BUFFER;
  resizeCanvas(windowWidth, HEIGHT);
  background(0);
  count = 0;
}