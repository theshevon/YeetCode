var a = document.currentScript.getAttribute('one'); //1
var b = document.currentScript.getAttribute('two');

function setup() {

	createCanvas(700, 600);
	scale(1.5);

	const start = [60, 80];

	let end = example3(start);

	drawOpen(start);
	drawOpen(end);
}

// branching example
function example1(start) {
	let endPoints = drawBranch(start);
	let end = converge(endPoints[0], endPoints[1]);
	drawPrint(endPoints[0]);
	drawPrint(endPoints[1]);
	return end;
}

// while / loop example
function example2(start) {
	let points = drawWhile(start, [{
		'type': 'print'
	}], false);
	return points.end;
}

// branch in loop
function example3(start) {
	let points = drawWhile(start, [{
		'type': 'branch',
		body: [{
				'type': 'print',
				'body': []
			},
			{
				'type': 'print',
				'body': []
			}
		]
	}], false);
	return points.end;
}

// loop nested in loop
function example4(start) {
	let points = drawWhile(start, [{
		'type': 'loop',
		'body': []
	}, {
		'type': 'loop',
		'body': []
	}], false);
	return points.end;
}

// loop nested in loop
function example5(start, j) {

	let points = {
		'end': start,
		'nodes': []
	};
	for (let i = 0; i < j.length; i++) {
		if (j[i].type == 'loop') {
			points = drawWhile(points.end, j[i].body, false);
		}

		// TODO: start with if
	}

	return points.end;
}

function drawBranch2(start, objs) {
	let endpoints = drawBranch(start);
	fill(0);
	
	let end = converge(endpoints[0], endpoints[1]);

	// NOTE: Branch is contrained to only one IF and one ELSE, and no ELSIF's
	// NOTE2: obj w/ i==0 is if, obj w/ i==1 is else
	let x, y;
	for (let i = 0; i < objs.length; i++) {
		x = endpoints[i][0], y = endpoints[i][1];

		if (objs[i].type == 'print') {
			drawPrint([x, y]);
		}

		if (objs[i].type == 'loop') {
			let inner = drawWhile([x, y], objs[i].body, true);
			// curveBetween(inner.end[0], inner.end[1], xWhile, yWhile, 0.2, 0.15, 0.65);
		}

		if (objs[i].type == 'branch') {
			let inner = drawBranch2([x, y], objs[i].body);
			curveBetween(inner[0], inner[1], x, y, 0.2, -0.15, 0.55);
		}
	}

	fill(255);

	return end;
}

function draw() {}

// height of branch or while
const HEIGHT = 160;
const HEIGHT_WHILE_BASE = 70;
const HEIGHT_WHILE_INCREMENT = 40;
const WIDTH_BRANCH = 160;
const LEN_BOX = 20;
const CIRCLE_RAD = 5;
const WHILE_HORIZONTAL_LINE = 100;

function drawWhile(start, objs, inNestedLoop) {
	let x = start[0];
	let y = start[1];

	// base box height
	let boxHeight = HEIGHT_WHILE_BASE + HEIGHT_WHILE_INCREMENT * objs.length;

	stroke(181, 87, 221);
	fill(255);
	rect(x + 5, y + 20, 70, boxHeight, 10);
	stroke(0, 0, 0);

	fill(0);
	triangle(x + 50, y + 20, x + 33, y + 13, x + 33, y + 27);
	triangle(x + 33, y + 20 + boxHeight, x + 50, y + 13 + boxHeight, x + 50, y + 27 + boxHeight);

	fill(255);
	let xWhile, yWhile;
	for (let i = objs.length - 1; i >= 0; i--) {
		xWhile = x + 75;
		yWhile = HEIGHT_WHILE_BASE + y + i * HEIGHT_WHILE_INCREMENT;

		if (objs[i].type == 'print') {
			drawPrint([xWhile, yWhile]);
		} else {
			line(xWhile, yWhile, xWhile + WHILE_HORIZONTAL_LINE * (objs.length - i), yWhile);
			fill(0);
			triangle(x + 133, y + 70.5, x + 116, y + 63.5, x + 116, y + 77.5);
			circle(xWhile, yWhile, CIRCLE_RAD);
		}

		if (objs[i].type == 'loop') {
			let inner = drawWhile([xWhile + WHILE_HORIZONTAL_LINE * (objs.length - i), yWhile], objs[i].body, true);
			// curveBetween(inner.end[0], inner.end[1], xWhile, yWhile, 0.2, 0.15, 0.65);
		}

		if (objs[i].type == 'branch') {
			fill(255);
			let inner = drawBranch2([xWhile + WHILE_HORIZONTAL_LINE * (objs.length - i), yWhile], objs[i].body);
			fill(255);
			curveBetween(inner[0], inner[1], xWhile, yWhile, 0.2, -0.15, 0.55);
		}
	}

	fill(0);

	if (inNestedLoop) {
		line(x, y, x, y + boxHeight / 2 + HEIGHT_WHILE_INCREMENT);
	} else {
		line(x, y, x, y + 1.25 * boxHeight + HEIGHT_WHILE_INCREMENT);
	}

	stroke(181, 87, 221);
	fill(255);
	rect(x - 10, y + 60, LEN_BOX, LEN_BOX);
	stroke(0, 0, 0);

	return {
		end: [x, y + 1.25 * boxHeight + HEIGHT_WHILE_INCREMENT],
		body: []
	};
}

function drawPrint(p) {
	let x = p[0];
	let y = p[1];

	fill(255);
	stroke(33, 145, 236);
	quad(x, y - LEN_BOX / 2, x + LEN_BOX / 2, y, x, y + LEN_BOX / 2, x - LEN_BOX / 2, y);
	stroke(0, 0, 0);

	return [x, y];
}

// for start, end circles
function drawOpen(point) {
	fill(255);
	circle(point[0], point[1], CIRCLE_RAD);
}

// connect two coordinates
function connect(p1, p2) {
	fill(0);
	line(p1[0], p1[1], p1[0], p1[1]);
	line(p2[0], p2[1], p1[0], p1[1]);

	return [p1[0], p1[1] + HEIGHT / 2];
}

// merge two coordinates at a lower coord
function converge(p1, p2) {
	fill(0);
	line(p1[0], p1[1], p1[0], p1[1] + HEIGHT / 2);
	line(p2[0], p2[1], p1[0], p1[1] + HEIGHT / 2);

	return [p1[0], p1[1] + HEIGHT / 2];
}

// Only supporting if else right now
function drawBranch(start) {
	let x = start[0];
	let y = start[1];
	let end1 = [x, y + HEIGHT];
	let end2 = [x + WIDTH_BRANCH / 2, y + HEIGHT];

	fill(0);

	line(x, y, x, y + HEIGHT);
	line(x + WIDTH_BRANCH / 2, y + WIDTH_BRANCH / 2, x + WIDTH_BRANCH / 2, y + HEIGHT);
	line(x, y + HEIGHT / 2, x + WIDTH_BRANCH / 2, y + HEIGHT / 2);

	fill(255);
	stroke('#EE609C');
	rect(x - LEN_BOX / 2, y + WIDTH_BRANCH / 2 - LEN_BOX / 2, LEN_BOX, LEN_BOX);
	stroke(0, 0, 0);

	return [end1, end2];
}


function curveBetween(x1, y1, x2, y2, d, h, flip) {
	//find two control points off this line
	var original = p5.Vector.sub(createVector(x2, y2), createVector(x1, y1));
	var inline = original.copy().normalize().mult(original.mag() * d);
	var rotated = inline.copy().rotate(radians(90) + flip * radians(180)).normalize().mult(original.mag() * h);
	var p1 = p5.Vector.add(p5.Vector.add(inline, rotated), createVector(x1, y1));
	//line(x1, y1, p1.x, p1.y); //show control line
	rotated.mult(-1);
	var p2 = p5.Vector.add(p5.Vector.add(inline, rotated).mult(-1), createVector(x2, y2));
	//line(x2, y2, p2.x, p2.y); //show control line
	bezier(x1, y1, p1.x, p1.y, p2.x, p2.y, x2, y2)
}