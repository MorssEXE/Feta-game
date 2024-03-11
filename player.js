import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const misElement = document.querySelector('[data-mis]')
const JUMP_SPEED = .43
const GRAVITY = .0013
const MIS_FRAME_COUNT = 2 // pozdeji zmenit podle poctu frame pro mis
const FRAME_TIME = 100

let isJumping
let misFrame = 1
let currentFrameTime
let yVelocity

export function setupMis() {
    isJumping = false
    misFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(misElement, "--bottom", 0)
    document.removeEventListener("mousedown", onJump)
    document.addEventListener("mousedown", onJump)
    document.removeEventListener("touchstart", onJump)
    document.addEventListener("touchstart", onJump)
}

export function updateMis(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getMisRect() {
    return misElement.getBoundingClientRect()
}

export function setMisLose() {
    misElement.src = "src/mis-death.png"
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        misElement.src = `src/mis-idle.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        misFrame = (misFrame + 1) % MIS_FRAME_COUNT
        misElement.src = `src/mis-run-${misFrame}.png` // pozdeji zmenit na src/miiis-run-${misFrame}
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(misElement, "--bottom", yVelocity * delta)
    misElement.src = `src/mis-jump.png`
    if (getCustomProperty(misElement, "--bottom") <= 0) {
        setCustomProperty(misElement, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump() {
    if (isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}