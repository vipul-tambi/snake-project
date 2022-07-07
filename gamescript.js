var lastPaintTime = 0;
let SNAKE_SPEED = 2.5;

var inputDirection = { x: -1, y: 0 };
let lastInputDirection = inputDirection;
const EXPENSION_AMOUNT = 1;
var score = 0;
const snakeBody = [
    {
        x: 8,
        y: 8
    },
    /*{
        x: 9,
        y: 8
    },
    {
        x: 10,
        y: 8
    },
    {
        x: 11,
        y: 8
    },
    {
        x: 12,
        y: 8
    }*/
]

function paint(currentTime) {
    var TimeSeconds = (currentTime - lastPaintTime) / 1000;
    requestAnimationFrame(paint);
    if (TimeSeconds < 1 / SNAKE_SPEED)
        return;
    lastPaintTime = currentTime;
    update();
    draw();
}

window.requestAnimationFrame(paint);


let food = getFoodrandomPosition()
const gameBoard = document.querySelector(".game-board");
const scoreBox = document.querySelector("#score");
function draw() {
    drawSnake();
    drawFood();
}



function update() {
    gameBoard.innerHTML = "";
    snakeMove();
    snakeEatFood();
}

function drawSnake() {
    snakeBody.forEach((segment, index) => {
        var snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        //snakeElement.innerHTML = index;
        snakeElement.style.transform = "rotate(0deg)";
        if (index == 0) {
            snakeElement.classList.add('head');
            if (inputDirection.x == 1) {
                snakeElement.style.transform = "rotate(-90deg)";
            }
            else if (inputDirection.x == -1) {
                snakeElement.style.transform = "rotate(90deg)";
            }
            else if (inputDirection.y == 1) {
                snakeElement.style.transform = "rotate(0deg)";
            }
            else if (inputDirection.y == -1) {
                snakeElement.style.transform = "rotate(180deg)";
            }
        }
        else {
            snakeElement.classList.add('snake');
        }
        gameBoard.appendChild(snakeElement);
    })
}

function drawFood() {
    var foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function snakeMove() {
    inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    checkGameOver();
}


function getInputDirection() {
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (lastInputDirection.y == 1)
                    break;
                inputDirection = { x: 0, y: -1 }
                break;
            case 'ArrowDown':
                if (lastInputDirection.y == -1)
                    break;
                inputDirection = { x: 0, y: 1 }
                break;
            case 'ArrowLeft':
                if (lastInputDirection.x == 1)
                    break;
                inputDirection = { x: -1, y: 0 }
                break;
            case 'ArrowRight':
                if (lastInputDirection.x == -1)
                    break;
                inputDirection = { x: 1, y: 0 }
                break;
            default: inputDirection = { x: 0, y: 0 }
        }

    })
    lastInputDirection = inputDirection;
    return inputDirection;
}

function snakeEatFood() {
    if (iseat()) {
        score += 10;
        scoreBox.innerHTML = score;
        console.log("eated");
        food = getFoodrandomPosition();
        SNAKE_SPEED += 0.2;
        expandsnake();

    }
}

function iseat() {
    return snakeBody[0].x === food.x && snakeBody[0].y === food.y;
}

function getFoodrandomPosition() {
    let a, b, myCondition = true;
    while (myCondition) {
        a = Math.floor(Math.random() * 16) + 1;
        b = Math.floor(Math.random() * 16) + 1;
        myCondition = snakeBody.some(segment => {
            return a === segment.x && b === segment.y;
        })
    }
    return { x: a, y: b };
}


function expandsnake() {
    for (let i = 0; i < EXPENSION_AMOUNT; i++) {
        snakeBody.push(snakeBody[snakeBody.length - 1]);
    }
}

function checkGameOver() {
    if (snakeOutOfGrid() || snakeIntersection()) {
        location.reload();
        alert("Game Over");
    }
}

function snakeOutOfGrid() {
    return snakeBody[0].x < 0 || snakeBody[0].x > 16 || snakeBody[0].y < 0 || snakeBody[0].y > 16;
}

function snakeIntersection() {
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
            return true;
        }
    }
}