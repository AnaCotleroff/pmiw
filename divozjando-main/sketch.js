let imgColor;
let imgForma;
let resultado;

let currentTonoFactor = 1.0;
let targetTonoFactor = 1.0;

let calor = 0.0;         
let calorActual = 0.0;  

let partesCara = [
    {
        nombre: 'nariz',
        img: null,
        x: 265, y: 150,
        w: 100, h: 475,
        seMueve: false
    },
    {
        nombre: 'boca',
        img: null,
        x: 200, y: 675,
        w: 250, h: 100,
        seMueve: false
    },
    {
        nombre: 'ojo',
        img: null,
        x: 490, y: 255,
        w: 50, h: 75,
        seMueve: false
    }
];
let posicionesOriginales = partesCara.map(parte => ({
    x: parte.x,
    y: parte.y
}));

function preload() {
    imgColor = loadImage('data/foto1.jpg');
    imgForma = loadImage('data/foto2.jpg');

    for (let i = 0; i < partesCara.length; i++) {
        partesCara[i].img = loadImage('data/cara' + i + '.png');
    }
}

function setup() {
    imgForma.resize(imgColor.width, imgColor.height);
    
    // aca redimensione al 50% :)
    createCanvas(imgColor.width / 2, imgColor.height / 2);

    imgColor.resize(width, height);
    imgForma.resize(width, height);

    imgColor.loadPixels();
    imgForma.loadPixels();
    resultado = createImage(width, height);
    resultado.loadPixels();

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4;

            let r = imgColor.pixels[index];
            let g = imgColor.pixels[index + 1];
            let b = imgColor.pixels[index + 2];

            let br = imgForma.pixels[index];
            let bg = imgForma.pixels[index + 1];
            let bb = imgForma.pixels[index + 2];
            let brillo = (br + bg + bb) / 3;
            let escala = brillo / 255;

            resultado.pixels[index] = r * escala;
            resultado.pixels[index + 1] = g * escala;
            resultado.pixels[index + 2] = b * escala;
            resultado.pixels[index + 3] = 255;
        }
    }

    resultado.updatePixels();
}

function draw() {
    background(0);

// aca hice q vayan juntos calidez-brillo, frialdad-opacidad

    if (keyIsDown(67)) { // con la C calidez y brillo
    calor += 0.05;
    targetTonoFactor = constrain(targetTonoFactor + 0.01, 0.3, 2.0);
    }
    if (keyIsDown(70)) { // con la F frialdad + opacidad
    calor -= 0.05;
    targetTonoFactor = constrain(targetTonoFactor - 0.01, 0.3, 2.0);
  }
    let factor = transicionarTonalidad();
    calorActual = lerp(calorActual, calor, 0.08);

    loadPixels();
    resultado.loadPixels();

    for (let i = 0; i < resultado.pixels.length; i += 4) {
        let r = resultado.pixels[i];
        let g = resultado.pixels[i + 1];
        let b = resultado.pixels[i + 2];

        r = constrain(r + calorActual * 20, 0, 255);
        b = constrain(b - calorActual * 20, 0, 255);

        r *= factor;
        g *= factor;
        b *= factor;

        pixels[i] = constrain(r, 0, 255);
        pixels[i + 1] = constrain(g, 0, 255);
        pixels[i + 2] = constrain(b, 0, 255);
        pixels[i + 3] = 255;
    }

    updatePixels();

    for (let i = 0; i < partesCara.length; i++) {
        let parte = partesCara[i];
        let yFinal = parte.y;

        if (parte.nombre === 'boca' && parte.seMueve) {
            yFinal += random(-5, 2.5);
        }

        image(parte.img, parte.x, yFinal, parte.w, parte.h);
    }
}

function keyPressed() {
    if (key === 'n' || key === 'N') {
        targetTonoFactor = 1.0;
        calor = 0.0;
        for (let i = 0; i < partesCara.length; i++) {
            partesCara[i].x = posicionesOriginales[i].x;
            partesCara[i].y = posicionesOriginales[i].y;
        }
    }

    if (key === 'b' || key === 'B') {
        partesCara[1].seMueve = !partesCara[1].seMueve;
    }

    if (key === 'o' || key === 'O') {
        partesCara[2].x -= 5;
    }

    if (key === 'l' || key === 'L') {
        partesCara[0].y += 2.5;
    }
}

function transicionarTonalidad() {
    currentTonoFactor = lerp(currentTonoFactor, targetTonoFactor, 0.05);
    return currentTonoFactor;
}