// Video Youtube: https://www.youtube.com/watch?v=MmpeGdZOSCg

let img;
let tamañoCirculos = 132;
let tamañoMinimoCirculos = 92;
let tamañoCuadrados = 133;
let colorCirculo1, colorCirculo2, colorCirculo3, colorCirculo4, colorCirculo5, colorCirculo6, colorCirculo7, colorCirculo8, colorCirculo9;



function preload() {
img = loadImage("data/IMGOBRA.jpg");
}



function setup() {
  createCanvas(800, 400);
  coloresCircus();
}



function draw() {
  background(255);
  image(img, 0, 0, 400, 400);
  dibujarObra();
}



function keyPressed() {
  if (key == '-') {
    if (tamañoCirculos > tamañoMinimoCirculos) {
      tamañoCirculos -= 10;
    }
  } else if (key == '+') {
    tamañoCirculos = min(tamañoCirculos + 10, 132);
  } else if (key == 'r') {
    resetearVariables();
  }
}
