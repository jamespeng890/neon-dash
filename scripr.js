// script.js - 稳定版
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 界面元素
const startScreen = document.getElementById('start-screen');
const overScreen = document.getElementById('game-over-screen');
const hud = document.getElementById('game-hud');
const touchLayer = document.getElementById('touch-layer');
const scoreEl = document.getElementById('score');

// 游戏核心数据
let gameRunning = false;
let score = 0;
let animationId;
let frameCount = 0;
let settings = {};
let lastLevel = 'normal';
let width, height;

// 玩家与障碍
const player = { x: 0, y: 0, width: 0, height: 0, color: '#fff' };
let obstacles = [];
const input = { left: false, right: false };

// 难度配置
const LEVELS = {
    easy:   { speedBase: 0.008, spawn: 90, color: '#00ff9d' },
    normal: { speedBase: 0.012, spawn: 60, color: '#00f3ff' },
    hard:   { speedBase: 0.018, spawn: 35, color: '#ff0055' }
};

// 窗口大小适配
function resize() {
    const container = document.querySelector('.game-container');
    const dpr = window.devicePixelRatio || 1;
    
    width = container.clientWidth;
    height = container.clientHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    player.width = width * 0.12; // 稍微调大一点玩家，更好看
    player.height = player.width;
    
    if (gameRunning) player.y = height - player.height - 50;
}
window.addEventListener('resize', resize);

// --- 全局函数 (HTML onclick 直接调用) ---

window.startGame = function(level) {
    lastLevel = level;
    settings = LEVELS[level];
    
    // 切换UI
    startScreen.classList.add('hidden');
    overScreen.classList.add('hidden');
    hud.classList.remove('hidden');
    touchLayer.classList.remove('hidden');
    
    // 重置
    gameRunning = true;
    score = 0;
    frameCount = 0;
    obstacles = [];
    scoreEl.innerText = '0';
    input.left = false;
    input.right = false;
    
    resize();
    player.x = width / 2 - player.width / 2;
    player.y = height - player.height - 50;
    player.color = settings.color;
    
    if (animationId) cancelAnimationFrame(animationId);
    gameLoop();
}

window.restartGame = function() {
    startGame(lastLevel);
}

window.goHome = function() {
    overScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    hud.classList.add('hidden');
    touchLayer.classList.add('hidden');
    gameRunning = false;
}

// 处理触摸输入 (HTML ontouchstart 调用)
window.handleInput = function(dir, isPressed) {
    if (!gameRunning) return;
    input[dir] = isPressed;
}

// --- 游戏循环 ---

function update() {
    const moveSpeed = height * settings.speedBase;

    if (input.left && player.x > 0) player.x -= moveSpeed;
    if (input.right && player.x + player.width < width) player.x += moveSpeed;

    // 难度曲线
    let currentRate = settings.spawn - Math.floor(score / 8);
    if (currentRate < 20) currentRate = 20;

    if (frameCount % currentRate === 0) {
        const obsW = Math.random() * (width * 0.5) + (width * 0.15);
        const obsX = Math.random() * (width - obsW);
        const obsSpeed = moveSpeed * 0.8 + (score * (height * 0.0003));
        obstacles.push({ x: obsX, y: -100, width: obsW, height: 25, speed: obsSpeed });
    }

    // 更新障碍
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.y += obs.speed;

        // 碰撞
        const pad = 6;
        if (player.x + pad < obs.x + obs.width &&
            player.x + player.width - pad > obs.x &&
            player.y + pad < obs.y + obs.height &&
            player.y + player.height - pad > obs.y) {
            
            gameOver();
            return;
        }

        if (obs.y > height) {
            obstacles.splice(i, 1);
            score++;
            scoreEl.innerText = score;
            i--;
        }
    }
    frameCount++;
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    touchLayer.classList.add('hidden'); // 关掉触摸层防止误触
    overScreen.classList.remove('hidden');
    document.getElementById('final-score-val').innerText = score;
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // 玩家
    ctx.shadowBlur = 15;
    ctx.shadowColor = player.color;
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 障碍
    ctx.shadowColor = '#ff0055';
    ctx.fillStyle = '#ff0055';
    obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, obs.width, obs.height));
    
    ctx.shadowBlur = 0;
}

function gameLoop() {
    if (!gameRunning) return;
    update();
    draw();
    animationId = requestAnimationFrame(gameLoop);
}

// 键盘支持
window.addEventListener('keydown', e => {
    if(e.code === 'ArrowLeft') input.left = true;
    if(e.code === 'ArrowRight') input.right = true;
});
window.addEventListener('keyup', e => {
    if(e.code === 'ArrowLeft') input.left = false;
    if(e.code === 'ArrowRight') input.right = false;
});

resize();
