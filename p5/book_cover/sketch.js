const tileSize = 70;
const sin30 = 1/2;
const cos30 = Math.sqrt(3)/2;
const halfTileLength = tileSize*cos30;
const halfTileBreadth = tileSize*sin30;
const tileLength = halfTileLength*2;
const tileBreadth = halfTileBreadth*2;
const student_name = "Héctor Iván Patricio Moreno";
const course = "Data and Reality";
const minimum_color_value = 0;
let top_and_right_same_color = false;
const urlParams = new URLSearchParams(window.location.search);
const print_key = urlParams.get('print_key');
let random_key = "5eq7tb0ubum" + print_key; // secret key here
// random_key = "5eq7tb0ubumu"; // secret key here

let prng1 = isaacCSPRNG(student_name + " " + course + " " + random_key);
const generalMargin = 0;

function setup(){
  createCanvas(1020, 1320);
  angleMode(DEGREES);
  noLoop();
  // Agregar botón de impresión
  let printButton = createButton('Imprimir');
  // printButton.position(20, 20);
  printButton.class('no-print');
  printButton.mousePressed(() => print());
}

let top_start_color = "#004242";
let top_end_color = "#2f4f4f";

// ensure colors are not too dark


let right_start_color = "white";
let right_end_color = "#004242";
if (top_and_right_same_color) {
  right_end_color = top_end_color;
  right_start_color = top_start_color;
}

let left_start_color = "white";
let left_end_color = "white";


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
      // Dedice if drawing the tile
      // let draw_tile = choice(true, false, 0.98);
      // if (!draw_tile) {
      //   continue;
      // }
    generateGradient(x, y, x+halfTileLength, y, top_start_color, top_end_color);
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
rect(100, 100, width-200, 200);

fill(66, 66, 66);
textAlign(CENTER, CENTER); 
// text("Diploma", width/2, 120);

textSize(80);
textFont('Helvetica');
textStyle(BOLD);

text("Data and Reality", width/2, 180);

textSize(40);
fill("#004242");
text("William C. Kent", width/2, 250);

// fill(0);
// textSize(20);
// text("Por Participar y completar el Bootcamp:", width/2, 300);

// textSize(40);
// text(course, width/2, 350);

}

// Generate a random color hex
function pickRandomColor(){
  const r_pick = choice(0,1, 0.3);
  const g_pick = choice(0,1, 0.3);
  const b_pick = choice(0,1, 0.3);
  let r = Math.floor(prng1.random(0.8, 1)*256*r_pick);

  let g = Math.floor(prng1.random(0.8, 1)*256*g_pick); console.log(g);
  let b = Math.floor(prng1.random(0.8, 1)*256*b_pick); console.log(b);
  return "#" + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
}

function choice(a, b, p=0.5){
  const c = prng1.random() < p ? a : b;
  console.log(c);
  return c;
}

function generateGradient(x1, y1, x2, y2, start_color, end_color){
  let gradient = drawingContext.createRadialGradient(x1, y1, 0, x2, y2, 200);
  // gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
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
  gradient.addColorStop(0.5, end_color);
  drawingContext.fillStyle = gradient;

}
// function mouseMoved(){
//   redraw();
// }
