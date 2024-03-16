import { setupGround, updateGround } from "./ground.js"
import { updateObstacles, setupObstacles, getObstacleRects } from "./obstacles.js"
import { updateMis, setupMis, getMisRect, setMisLose } from "./player.js"

const WORLD_WIDTH = 120
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElement = document.querySelector('[data-world]')
const scoreElement = document.querySelector('[data-score]')
const startScreenElement = document.querySelector('[data-start-screen]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("mousedown", handleStart, {once: true})
document.addEventListener("touchstart", handleStart, {once: true})

let lastTime
let speedScale
let score
let highScore

function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, speedScale)
    updateMis(delta, speedScale)
    updateObstacles(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    if (checkLose()) return handleLose()

    lastTime = time;
    window.requestAnimationFrame(update)
}

function isCollision(rect1, rect2) {
    return  (rect1.left < rect2.right && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.bottom > rect2.top)
}

function checkLose() {
    const misRect = getMisRect()
    return getObstacleRects().some(rect => isCollision(rect, misRect))
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
    score += delta * 0.01
    scoreElement.textContent = Math.floor(score)
}

function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    setupGround()
    setupMis()
    setupObstacles()
    startScreenElement.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose() {
    setMisLose()
    highScore = Math.floor(score)

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "index.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error('Error:', xhr.status);
            }
        }
    };
    xhr.send("highScore=" + highScore);

    setTimeout(() => {
        document.addEventListener("mousedown", handleStart, { once: true })
        document.addEventListener("touchstart", handleStart, { once: true })
        startScreenElement.classList.remove("hide")
    }, 100)
}

function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) 
    {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
