var dotSize = 20;
var gameBoardSize = 400;
var direction = 'right';
var snake = [{ top: 0, left: 0 }];
var apple = null;

function updateGameBoard() {
    var gameBoard = document.getElementById('game-board');

    // clear previous state
    while (gameBoard.firstChild) {
        gameBoard.firstChild.remove();
    }

    // draw snake
    snake.forEach(function(dot) {
        var dotElement = document.createElement('div');
        dotElement.classList.add('dot');
        dotElement.style.top = `${dot.top}px`;
        dotElement.style.left = `${dot.left}px`;
        gameBoard.appendChild(dotElement);
    });

    // draw apple
    if (apple == null) {
        apple = {
            top: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize,
            left: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize,
        };
    }
    var appleElement = document.createElement('div');
    appleElement.classList.add('apple');
    appleElement.style.top = `${apple.top}px`;
    appleElement.style.left = `${apple.left}px`;
    gameBoard.appendChild(appleElement);

    // move snake
    var head = Object.assign({}, snake[0]); // copy head
    switch (direction) {
        case 'up':
            head.top -= dotSize;
            break;
        case 'down':
            head.top += dotSize;
            break;
        case 'left':
            head.left -= dotSize;
            break;
        case 'right':
            head.left += dotSize;
            break;
    }
    snake.unshift(head);

    // check game over
    if (head.top < 0 || head.left < 0 || head.top === gameBoardSize || head.left === gameBoardSize || snake.find((dot, index) => index !== 0 && dot.top === head.top && dot.left === head.left)) {
        return alert('Game over!');
    }

    // check apple collision
    if (head.top === apple.top && head.left === apple.left) {
        apple = null; // eat apple
    } else {
        snake.pop(); // remove tail
    }

    setTimeout(updateGameBoard, 200);
}

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

updateGameBoard();
