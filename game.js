const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height


const gameSpeed = 100

const score = 0
const rectSize = 32
const rectCount = 21

const gameId = setInterval(startGame, gameSpeed)

const snake = [{
    x: 10 * rectSize,
    y: 10 * rectSize
}];

const food = {
    x: getRandomFieldPosition(),
    y: getRandomFieldPosition()
}


const DIRECTIONS_MAP = {
    RIGHT: 'right',
    BOTTOM :'bottom',
    LEFT: 'left',
    TOP: 'top'
}

let direction = 'bottom'

window.addEventListener('keydown', handleKeyDown)

function handleKeyDown(event) {
    if (event.keyCode === 37 && direction !== DIRECTIONS_MAP.RIGHT) {
        direction = DIRECTIONS_MAP.LEFT
    }

    if (event.keyCode === 38 && direction !== DIRECTIONS_MAP.BOTTOM) {
        direction = DIRECTIONS_MAP.TOP
    }

    if (event.keyCode === 39 && direction !== 'left') {
        direction = DIRECTIONS_MAP.RIGHT
    }

    if (event.keyCode === 40 && direction !== 'top') {
        direction = DIRECTIONS_MAP.BOTTOM
    }
}

function startGame() {
    drawField()
    drawFood()
    drawSnake(snake)
}

function endGameById(gameId) {
    alert('Конец игры!')
    clearInterval(gameId)
}

function drawField() {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, width, height)
}

function drawSnake() {
    let snakeHeadXPosition = snake[0].x
    let snakeHeadYPosition = snake[0].y

    for(let i = 0; i < snake.length; i ++ ) {
        ctx.fillStyle = 'yellow'
        ctx.fillRect(snake[i].x, snake[i].y, rectSize, rectSize)
    }

    const outOfX = snakeHeadXPosition < 0 || snakeHeadXPosition >= rectSize * rectCount
    const outOfY = snakeHeadYPosition < 0 || snakeHeadYPosition >= rectSize * rectCount

    if (outOfX || outOfY) {
        endGameById(gameId)
    }

    if (snakeHeadXPosition === food.x && snakeHeadYPosition === food.y) {
        food.x = getRandomFieldPosition()
        food.y = getRandomFieldPosition()
    } else {
        snake.pop()
    }


    if (direction === DIRECTIONS_MAP.RIGHT) {
        snakeHeadXPosition += rectSize
    }

    if (direction === DIRECTIONS_MAP.LEFT) {
        snakeHeadXPosition -= rectSize
    }

    if (direction === DIRECTIONS_MAP.BOTTOM) {
        snakeHeadYPosition += rectSize
    }

    if (direction === DIRECTIONS_MAP.TOP) {
        snakeHeadYPosition -= rectSize
    }


    for(let i = 0; i < snake.length; i ++ ) {
        if (snakeHeadXPosition === snake[i].x && snakeHeadYPosition === snake[i].y) {
            endGameById(gameId)
        }
    }

    snake.unshift({
        x: snakeHeadXPosition,
        y: snakeHeadYPosition
    })
}

function drawFood() {
    ctx.fillStyle = 'blue'
    ctx.fillRect(food.x, food.y, rectSize, rectSize)
}

function getRandomFieldPosition() {
    return Math.floor(Math.random() * rectCount) * rectSize
}
