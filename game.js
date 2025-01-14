// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    color: 'pink', // Kirby-like color
    gravity: 0.5,
    jumpPower: 10,
    velocityY: 0,
    isJumping: false
};

let map = {
    x: 0,
    speed: 2,
    width: 2000, // Width of the map
    height: canvas.height,
};

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawMap();
    drawPlayer();
    updatePlayer();
    requestAnimationFrame(gameLoop); // Call gameLoop again
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw the map
function drawMap() {
    ctx.fillStyle = 'green'; // Ground color
    ctx.fillRect(map.x, canvas.height - 50, map.width, 50); // Ground
    ctx.fillStyle = 'lightblue'; // Sky color
    ctx.fillRect(map.x, 0, map.width, canvas.height - 50); // Sky
}

// Update player position
function updatePlayer() {
    player.y += player.velocityY; // Apply gravity
    player.velocityY += player.gravity; // Increase downward velocity

    // Prevent player from falling through the ground
    if (player.y + player.height >= canvas.height - 50) {
        player.y = canvas.height - 100; // Reset player position
        player.velocityY = 0; // Reset velocity
        player.isJumping = false; // Reset jump state
    }
}

// Handle keyboard input
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            player.x += player.speed; // Move right
            break;
        case 'ArrowLeft':
            player.x -= player.speed; // Move left
            break;
        case 'ArrowUp':
            if (!player.isJumping) {
                player.velocityY -= player.jumpPower; // Jump
                player.isJumping = true; // Set jump state
            }
            break;
    }
});

// Start the game loop
gameLoop();
