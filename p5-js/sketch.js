function setup() {
	createCanvas(800, 800);

	const start = [20, 20];

	// 	var endPoints = drawBranch(start);
	// 	var end = converge(endPoints[0], endPoints[1]);
	// 	endPoints = drawBranch(end);
	// 	endPoints = [drawPrint(endPoints[0]), drawPrint(endPoints[1])];
	// 	end = converge(endPoints[0], endPoints[1]);

	var end = example3(start);

	drawOpen(start);
	drawOpen(end);
}

function example3(start) {
	var endPoints = drawBranch(start);
	var end = converge(endPoints[0], endPoints[1]);
	drawPrint(endPoints[0]);
	drawPrint(endPoints[1]);
	return end;
}


// last rendered thing should be decalred first
function draw() {}

// height of branch or while
const HEIGHT = 160;
const HEIGHT_PRINT = 40;
const WIDTH_BRANCH = 160;
const LEN_BOX = 20;
const CIRCLE_RAD = 5;

// function drawPrint(p) {

// 	var x = p[0];
// 	var y = p[1];

// 	fill(255);
// 	line(p[0], p[1], x, y + HEIGHT_PRINT);
// 	quad(x, y + HEIGHT_PRINT / 2 - LEN_BOX / 2, x + LEN_BOX / 2, y + HEIGHT_PRINT / 2, x, y + HEIGHT_PRINT / 2 + LEN_BOX / 2, x - LEN_BOX / 2, y + HEIGHT_PRINT / 2);

// 	fill(0);
// 	circle(p[0], p[1], CIRCLE_RAD);
// 	circle(x, y + HEIGHT_PRINT, CIRCLE_RAD);

// 	return [x, y + HEIGHT_PRINT]
// }

function drawPrint(p) {

	var x = p[0];
	var y = p[1];

	fill(255);
	// line(p[0], p[1], x, y + HEIGHT_PRINT);
	quad(x, y - LEN_BOX / 2, x + LEN_BOX / 2, y, x, y + LEN_BOX / 2, x - LEN_BOX / 2, y);

	return [x, y];
}

// for start, end circles
function drawOpen(point) {
	fill(255);
	circle(point[0], point[1], CIRCLE_RAD);
}

// merge two coordinates
function converge(p1, p2) {
	fill(0);
	line(p1[0], p1[1], p1[0], p1[1] + HEIGHT / 2);
	line(p2[0], p2[1], p1[0], p1[1] + HEIGHT / 2);
	// circle(p1[0], p1[1], CIRCLE_RAD);
	// circle(p2[0], p2[1], CIRCLE_RAD);
	// circle(p1[0], p1[1] + HEIGHT, CIRCLE_RAD);

	return [p1[0], p1[1] + HEIGHT / 2];
}

// Only supporting if else right now
function drawBranch(start) {
	var x = start[0];
	var y = start[1];
	var end1 = [x, y + HEIGHT];
	var end2 = [x + WIDTH_BRANCH / 2, y + HEIGHT];

	fill(0);
	// circle(end1[0], end1[1], CIRCLE_RAD);
	// circle(end2[0], end2[1], CIRCLE_RAD);

	line(x, y, x, y + HEIGHT);
	line(x + WIDTH_BRANCH / 2, y + WIDTH_BRANCH / 2, x + WIDTH_BRANCH / 2, y + HEIGHT);
	line(x, y + HEIGHT / 2, x + WIDTH_BRANCH / 2, y + HEIGHT / 2);

	// circle(x, y, CIRCLE_RAD);

	fill(255);
	rect(x - LEN_BOX / 2, y + WIDTH_BRANCH / 2 - LEN_BOX / 2, LEN_BOX, LEN_BOX);

	return [end1, end2];
}

function drawWhile(x, y, nodes) {
	fill(0);
	circle(x, y + HEIGHT, CIRCLE_RAD);

	fill(255);
	// circle(60, 90, 35);
	rect(x + 5, y + 20, 70, 100, 10);

	line(x, y, x, y + HEIGHT);

	rect(x - 10, y + 60, 20, 20);

	fill(0);
	circle(x, y, CIRCLE_RAD);
}