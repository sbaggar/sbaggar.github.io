let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let box = 32;
let score = 0;
let snake = [];
snake[0] = {x: 9 * box, y: 10 * box};

let d;
let game;

let apple = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

document.addEventListener('keydown', direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if(event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if(event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if(event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    {
    //...

    // Draw game area border
    context.strokeStyle = 'white';
    context.lineWidth = box;
    context.strokeRect(0, 0, 16 * box, 16 * box);

    //...
}
    
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? 'green' : 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = 'red';
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, box, box);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == apple.x && snakeY == apple.y) {
        score++;
        apple = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        };
    } else {
        snake.pop();
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if(snakeX < 0 || snakeX > 15 * box || snakeY < 0 || snakeY > 15 * box || collision(newHead, snake)) {
        clearInterval(game);
    }
    
    snake.unshift(newHead);

    context.fillStyle = 'white';
    context.font = '45px Changa one';
    context.fillText(score, 2*box, 1.6*box);
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

game = setInterval(draw, 100);
