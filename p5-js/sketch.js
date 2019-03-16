function setup() {
	createCanvas(400, 400);
	
		// background(100);

	drawWhile(20, 20);
	
	// var val = drawBranch(20, 20);
	
	// drawBranch(20, val[0][1]);
}


// last rendered thing should be decalred first
function draw() {

}

// height of branch or while
const HEIGHT = 160;
const WIDTH_BRANCH = 160;
const LEN_BOX = 20;

// merge two coordinates
function converge(c1, c2) {
	
}

// Only supporting if else right now
function drawBranch(x, y) {
	
	var end1 = [x, y + HEIGHT];
	var end2 = [x + WIDTH_BRANCH/2, y + HEIGHT];

	fill(0);
	circle(end1[0], end1[1], 5);
	circle(end2[0], end2[1], 5);

	line(x, y, x, y + HEIGHT);
	line(x + WIDTH_BRANCH/2, y + WIDTH_BRANCH/2, x + WIDTH_BRANCH/2, y + HEIGHT);
	line(x, y + HEIGHT/2, x + WIDTH_BRANCH/2, y + HEIGHT/2);
	
	circle(x, y, 5);
	
	fill(255);
	rect(x - LEN_BOX/2, y + WIDTH_BRANCH/2 - LEN_BOX/2, LEN_BOX, LEN_BOX);
	
	return [end1, end2];
}

function drawWhile(x, y, nodes) {

	fill(0);
	circle(x, y + HEIGHT, 5);

	fill(255);
	// circle(60, 90, 35);
	rect(x + 5, y + 20, 70, 100, 10);

	line(x, y, x, y + HEIGHT);

	rect(x - 10, y + 60, 20, 20);

	fill(0);
	circle(x, y, 5);


}