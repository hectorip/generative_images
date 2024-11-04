const tileSize = 25;
const sin30 = 1/2;
const cos30 = Math.sqrt(3)/2;
const halfTileLength = tileSize*cos30;
const halfTileBreadth = tileSize*sin30;
const tileLength = halfTileLength*2;
const tileBreadth = halfTileBreadth*2;
let img;
const student_name = "Héctor Iván Patricio Moreno";
const course = "Arquitectura de software";
const minimum_color_value = 64;
let top_and_right_same_color = true;
// Load the image.
function preload() {
  img = loadImage('logo_cf.png');
}
let random_key = "5eq7tb0ubum"; // secret key here
// random_key = "5eq7tb0ubumu"; // secret key heredd

let prng1 = isaacCSPRNG(student_name + " " + course + " " + random_key);
const generalMargin = 10 * choice(0, 1);

function setup(){
  createCanvas(1056, 816);
  angleMode(DEGREES);
  noLoop();
  // Agregar botón de impresión
  let printButton = createButton('Imprimir');
  printButton.position(20, 20);
  printButton.mousePressed(() => print());
}

let top_start_color = pickRandomColor();
let top_end_color = pickRandomColor();

let right_start_color = pickRandomColor();
let right_end_color = pickRandomColor();
if (top_and_right_same_color) {
  right_end_color = top_end_color;
  right_start_color = top_start_color;
}

let left_start_color = pickRandomColor();
let left_end_color = pickRandomColor();

console.log(top_start_color, top_end_color, right_start_color, right_end_color, left_start_color, left_end_color);
// rightColor = 'LightSteelBlue';
// leftColor = 'SlateGray';

function draw(){
  let row = 0;
  let col = 0;
noStroke();
textSize(100);
// textAlign(CENTER, CENTER);

  margin = generalMargin * prng1.random();
  for(let y = 0;
	y < height+tileBreadth;
	y += tileSize+halfTileBreadth+margin){
    
	for(let x = (row % 2) * -halfTileLength;
	  x < width + halfTileLength;
	  x += tileLength+margin){
	  let d = dist(x, y, mouseX, mouseY);
	  let b = max(0, 100-d/2);
    generateGradient(x, y, x, y-tileBreadth, top_start_color, top_end_color);
	  quad(x, y, x-halfTileLength, y-halfTileBreadth,
		   x, y-tileBreadth, x+halfTileLength, y-halfTileBreadth);
	  // fill(b+map(mouseX-x, -width, width, 50, 250));
    // fill(rightColor);
	  generateGradient(x, y, x+halfTileLength, y, right_start_color, right_end_color);

    quad(x, y, x+halfTileLength, y-halfTileBreadth,
		   x+halfTileLength, y-halfTileBreadth+tileSize, x, y+tileSize);
	  // fill(b+map(mouseX-x, -width, width, 250, 50));
    // fill(leftColor);
	  generateGradient(x, y, x-halfTileLength, y, left_start_color, left_end_color);

	  quad(x, y, x, y+tileSize, x-halfTileLength, y-halfTileBreadth+tileSize,
		   x-halfTileLength, y-halfTileBreadth);				
	  col++;
	}
	row++;
	col = 0;
  }
fill(255, 255, 255, 220);
rect(30, 30, width-60, height-60);
fill(255);
// Top inner margin
rect(30, 30, width-60, 20);
// Bottom inner margin
rect(30, height-40, width-60, 20);
// Left inner margin
rect(30, 50, 20, height-70);
// Right inner margin
rect(width-50, 50, 20, height-70);
fill(0);
textAlign(CENTER, CENTER); 
// text("Diploma", width/2, 120);
img.width = 400;
image(img, width/2 - img.width/2, 100);

textSize(25);
textFont('Helvetica');
textStyle(BOLD);

text("Certifica a:", width/2, 200);

textSize(50);
fill("#00ba9d");
text(student_name, width/2, 250);

}

// Generate a random color hex
function pickRandomColor(){
  const r_pick = choice(0,1, 0.7);
  const g_pick = choice(0,1, 0.5);
  const b_pick = choice(0,1, 0.5);
  let r = Math.floor(prng1.random(0.7, 1)*256*r_pick);
  let g = Math.floor(prng1.random(0.7, 1)*256*g_pick); 
  let b = Math.floor(prng1.random(0.7, 1)*256*b_pick);
  return "#" + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
}

function choice(a, b, p=0.5){
  const c = prng1.random() < p ? a : b;
  console.log(c);
  return c;
}

function generateGradient(x1, y1, x2, y2, start_color, end_color){
  let gradient = drawingContext.createRadialGradient(x1, y1, tileSize, x2, y2, tileSize/4);
  // gradient.addColorStop(0, '#900');
  if (start_color == undefined) {
    start_color = pickRandomColor();
  }
  if (end_color == undefined) {
    end_color = pickRandomColor();
  }
  gradient.addColorStop(0, start_color);
  // gradient.addColorStop(0.5, '#A0A');
  // gradient.addColorStop(0.5, pickRandomColor());
  gradient.addColorStop(1, end_color);
  drawingContext.fillStyle = gradient;

}
// function mouseMoved(){
//   redraw();
// }