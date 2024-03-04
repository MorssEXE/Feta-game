import { setupGround, updateGround } from "./ground.js"
import { updatePlatform, setupPlatform } from "./platform.js"
import { updateMis, setupMis } from "./player.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElement = document.querySelector('[data-world]')
const scoreElement = document.querySelector('[data-score]')
const startScreenElement = document.querySelector('[data-start-screen]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once: true})

let lastTime
let speedScale
let score

function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, speedScale)
    updateMis(delta, speedScale)
    updatePlatform(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)

    lastTime = time;
    window.requestAnimationFrame(update)
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
    setupPlatform()
    startScreenElement.classList.add("hide")
    window.requestAnimationFrame(update)
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