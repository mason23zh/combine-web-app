var s = function (p) {
    p.setup = function () {
        var myCanvas = p.createCanvas(190, 200);
        p.angleMode(p.DEGREES);
        myCanvas.parent("displayClock");
    }

    p.draw = function () {
        p.background('#eee');
        p.translate(200, 200);
        p.rotate(-90);

        let hr = p.hour();
        let mn = p.minute();
        let sc = p.second();

        p.strokeWeight(3);
        p.stroke(255, 100, 150);
        p.noFill();
        let secondAngle = p.map(sc, 0, 60, 0, 360);
        p.arc(100, -100, 100, 100, 0, secondAngle); //0, 0, 300, 300, 0

        p.stroke(150, 100, 255);
        let minuteAngle = p.map(mn, 0, 60, 0, 360);
        p.arc(100, -100, 90, 90, 0, minuteAngle); //0,0,280,280,0



        p.stroke('#F17B0B');
        let hourAngle = p.map(hr % 12, 0, 12, 0, 360);
        p.arc(100, -100, 80, 80, 0, hourAngle); //0, 0, 260, 260, 0
        p.strokeWeight(1)
        //point(100,-100)
        p.push()
        p.translate(0, -200)
        //textAlign(CENTER,CENTER)
        p.rotate(90)
        p.textAlign(p.CENTER, p.CENTER)
        p.text(hr + ':' + mn + ':' + sc, 100, -100);
        p.pop()
    }
};
var myp5 = new p5(s, 'displayClock');











//!tictactoe
var m = function (p) {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let w; // = width / 3;
    let h; // = height / 3;

    let ai = 'X';
    let human = 'O';
    let currentPlayer = human;

    p.setup = function () {
        var mc = p.createCanvas(400, 400);
        w = p.width / 3;
        h = p.height / 3;
        bestMove();
        mc.parent('tictactoe');
    }

    function equals3(a, b, c) {
        return a == b && b == c && a != '';
    }

    p.checkWinner = function () {
        let winner = null;

        // horizontal
        for (let i = 0; i < 3; i++) {
            if (equals3(board[i][0], board[i][1], board[i][2])) {
                winner = board[i][0];
            }
        }

        // Vertical
        for (let i = 0; i < 3; i++) {
            if (equals3(board[0][i], board[1][i], board[2][i])) {
                winner = board[0][i];
            }
        }

        // Diagonal
        if (equals3(board[0][0], board[1][1], board[2][2])) {
            winner = board[0][0];
        }
        if (equals3(board[2][0], board[1][1], board[0][2])) {
            winner = board[2][0];
        }

        let openSpots = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    openSpots++;
                }
            }
        }

        if (winner == null && openSpots == 0) {
            return 'tie';
        } else {
            return winner;
        }
    }

    p.mousePressed = function () {
        if (currentPlayer == human) {
            // Human make turn
            let i = p.floor(p.mouseX / w);
            let j = p.floor(p.mouseY / h);
            // If valid turn
            if (board[i][j] == '') {
                board[i][j] = human;
                currentPlayer = ai;
                bestMove();
            }
        }
    }

    p.draw = function () {
        p.background(255);
        p.strokeWeight(4);

        p.line(w, 0, w, p.height);
        p.line(w * 2, 0, w * 2, p.height);
        p.line(0, h, p.width, h);
        p.line(0, h * 2, p.width, h * 2);

        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                let x = w * i + w / 2;
                let y = h * j + h / 2;
                let spot = board[i][j];
                p.textSize(32);
                let r = w / 4;
                if (spot == human) {
                    p.noFill();
                    p.ellipse(x, y, r * 2);
                } else if (spot == ai) {
                    p.line(x - r, y - r, x + r, y + r);
                    p.line(x + r, y - r, x - r, y + r);
                }
            }
        }

        let result = p.checkWinner();
        if (result != null) {
            p.noLoop();
            let resultP = p.createP('');
            resultP.style('font-size', '32pt');
            if (result == 'tie') {
                resultP.html('Tie!');
            } else {
                resultP.html(`${result} wins!`);
            }
        }
    }


    function bestMove() {
        // AI to make its turn
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let score = minimax(board, 0, false);
                    board[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = {
                            i,
                            j
                        };
                    }
                }
            }
        }
        board[move.i][move.j] = ai;
        currentPlayer = human;
    }

    let scores = {
        X: 10,
        O: -10,
        tie: 0
    };

    function minimax(board, depth, isMaximizing) {
        let result = p.checkWinner();
        if (result !== null) {
            return scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // Is the spot available?
                    if (board[i][j] == '') {
                        board[i][j] = ai;
                        let score = minimax(board, depth + 1, false);
                        board[i][j] = '';
                        bestScore = p.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // Is the spot available?
                    if (board[i][j] == '') {
                        board[i][j] = human;
                        let score = minimax(board, depth + 1, true);
                        board[i][j] = '';
                        bestScore = p.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
};
var mp5 = new p5(m, 'tictactoe');