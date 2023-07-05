let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

let box = 32;
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

function createBackground() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

function createSnake() {
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function updateSnake() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    snakeX += box;
    
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    
    snake.unshift(newHead);
    snake.pop();
}

function drawGame() {
    createBackground();
    createSnake();
    updateSnake();
}

let game = setInterval(drawGame, 100);
