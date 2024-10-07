let player;
let img;

function preload() {
  soundFormats('mp3');
  player = loadSound('data/ricky.mp3');
  img = loadImage('data/MUNDIAL.jpg');
}

function setup() {
  createCanvas(1000, 700);
}

function draw() {
  background(190, 230, 255);
  stroke(255);
  
  line(0, 700, 1000, 0);
  strokeWeight(12);

  line(0, 0, 1000, 700);
  strokeWeight(12);
  
  fill(0, 0, 250);
  textSize(15);

  if (player.isPlaying()) {
    text('Presiona cualquier tecla para detener la Iconic Argentinan Scene.', 275, 28);
  } else {
    text('Presiona cualquier tecla para escuchar una Iconic Argentinan Scene.', 275, 28);
  }
  
  image(img, 365, 250, 270, 195);
}

function keyPressed() {
  if (player.isPlaying()) {
    player.pause();
  } else {
    player.play();
  }
}
