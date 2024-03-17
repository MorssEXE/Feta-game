import { setupGround, updateGround } from "./ground.js";
import { updateObstacles, setupObstacles, getObstacleRects } from "./obstacles.js";
import { updateMis, setupMis, getMisRect, setMisLose } from "./player.js";

const WORLD_WIDTH = 120;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElement = document.querySelector('[data-world]');
const scoreElement = document.querySelector('[data-score]');
const startScreenElement = document.querySelector('[data-start-screen]');

let lastTime;
let speedScale;
let score;
let highScore = 0;
let paused = false;

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("mousedown", handleStart, { once: true });
document.addEventListener("touchstart", handleStart, { once: true });
document.addEventListener("visibilitychange", handleVisibilityChange);
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        window.location.href = "index.php";
    }
});

function handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
        pauseGame();
    } else {
        resumeGame();
    }
}

function pauseGame() {
    paused = true;
}

function resumeGame() {
    paused = false;
    lastTime = null;
    window.requestAnimationFrame(update);
}

function update(time) {
    if (paused) return;

    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;

    updateGround(delta, speedScale);
    updateMis(delta, speedScale);
    updateObstacles(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    if (checkLose()) return handleLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    );
}

function checkLose() {
    const misRect = getMisRect();
    return getObstacleRects().some((rect) => isCollision(rect, misRect));
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
    score += delta * 0.01;
    highScore = Math.max(highScore, Math.floor(score));
    scoreElement.textContent = Math.floor(score);
}

function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;

    setupGround();
    setupMis();
    setupObstacles();
    startScreenElement.classList.add("hide");
    window.requestAnimationFrame(update);
}

function handleLose() {
    setMisLose();

    const nickname = document.querySelector('[data-name]').textContent;
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('highScore', highScore);
    fetch('game.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Data sent to server successfully');
        })
        .catch(error => {
            console.error('Error sending data to server:', error);
        });

    setTimeout(() => {
        document.addEventListener("mousedown", handleStart, { once: true });
        document.addEventListener("touchstart", handleStart, { once: true });
        startScreenElement.classList.remove("hide");
    }, 100)
}

function setPixelToWorldScale() {
    let worldToPixelScale;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
