let escenas = [];
let estado;
let sonidoClick;

function preload() {
  for (let i = 0; i < 4; i++) {
    escenas[i] = loadImage("data/escena" + i + ".jpg");
  }
  sonidoClick = loadSound("data/sonidoclick.mp3"); // Asegúrate que la ruta es correcta
}

function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 4; i++) {
    escenas[i].resize(480, 480);
  }
  estado = "inicio";
}

function draw() {
  background(200);

  if (estado === "inicio") {
    cargaOtroFondo(escenas[0], width - 480, 0, 480, 480, RIGHT);
    fill(255);
    textSize(30);
    textAlign(LEFT);
    text("Dora:", 10, 20);
    textSize(15);
    text("Aventura Navideña", 10, 45);
    dibujarBoton(20, height - 60, 120, 60, "Empecemos");
  } else if (estado === "primera") {
    cargaOtroFondo(escenas[1], width - 480, 0, 480, 480, RIGHT);
    dibujarBoton(20, height - 100, 200, 60, "Dora: Camino Seguro");
    dibujarBoton(220, height - 100, 200, 60, "Dora: Atajo");
  } else if (estado === "segunda") {
    cargaOtroFondo(escenas[2], width - 480, 0, 480, 480, RIGHT);
    dibujarBoton(20, height - 60, 120, 60, "Inicio");
  } else if (estado === "tercera") {
    cargaOtroFondo(escenas[3], width - 480, 0, 480, 480, RIGHT);
    dibujarBoton(20, height - 60, 120, 60, "Inicio");
  }
}

function mousePressed() {
  if (estado === "inicio") {
    if (detectarBoton(20, height - 60, 120, 60)) {
      sonidoClick.play(); // Reproducir sonido
      estado = "primera";
    }
  } else if (estado === "primera") {
    if (detectarBoton(20, height - 100, 200, 60)) {
      sonidoClick.play(); // Reproducir sonido
      estado = "segunda";
    } else if (detectarBoton(220, height - 100, 200, 60)) {
      sonidoClick.play(); // Reproducir sonido
      estado = "tercera";
    }
  } else if (estado === "segunda" || estado === "tercera") {
    if (detectarBoton(20, height - 60, 120, 60)) {
      sonidoClick.play(); // Reproducir sonido
      estado = "inicio";
    }
  }
}

function dibujarBoton(px, py, pan, pal, texto) {
  if (detectarBoton(px, py, pan, pal)) {
    fill(255, 0, 0);
  } else {
    fill(255, 0, 255);
  }
  rect(px, py, pan, pal, pal / 4);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(texto, px + pan / 2, py + pal / 2);
}

function detectarBoton(x, y, an, al) {
  return mouseX > x && mouseX < x + an && mouseY > y && mouseY < y + al;
}

function cargaFondos(imag, index, x, y, ancho, alto, alinea) {
  imageMode(alinea);
  image(imag[index], x, y, ancho, alto);
}

function cargaOtroFondo(imag, x, y, ancho, alto, alinea) {
  imageMode(alinea);
  image(imag, x, y, ancho, alto);
}
