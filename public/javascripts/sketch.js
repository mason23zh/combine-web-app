function setup() {
    var myCanvas = createCanvas(190, 200);
    angleMode(DEGREES);
    myCanvas.parent("displayClock");
}

function draw() {
    background('#eee');
    translate(200, 200);
    rotate(-90);

    let hr = hour();
    let mn = minute();
    let sc = second();

    strokeWeight(3);
    stroke(255, 100, 150);
    noFill();
    let secondAngle = map(sc, 0, 60, 0, 360);
    arc(100, -100, 100, 100, 0, secondAngle); //0, 0, 300, 300, 0

    stroke(150, 100, 255);
    let minuteAngle = map(mn, 0, 60, 0, 360);
    arc(100, -100, 90, 90, 0, minuteAngle); //0,0,280,280,0



    stroke('#F17B0B');
    let hourAngle = map(hr % 12, 0, 12, 0, 360);
    arc(100, -100, 80, 80, 0, hourAngle); //0, 0, 260, 260, 0
    strokeWeight(1)
    //point(100,-100)
    push()
    translate(0, -200)
    //textAlign(CENTER,CENTER)
    rotate(90)
    textAlign(CENTER, CENTER)
    text(hr + ':' + mn + ':' + sc, 100, -100);
    pop()




    //push();
    //rotate(secondAngle);
    //stroke(255, 5, 5);
    //line(0, 0, 33, 0); // 0,0,33,0
    //pop();

    //push();
    //rotate(minuteAngle);
    //stroke(150, 100, 255);
    //line(0, 0, 25, 0);
    //pop();

    //push();
    //rotate(hourAngle);
    //stroke(150, 255, 100);
    //line(0, 0, 17, 0);
    //pop();

    //stroke(255);
    //point(100,-100 );


    //fill(255);
    //noStroke();
    //  text(hr + ':' + mn + ':' + sc, 10, 200);


}