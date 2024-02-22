import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const misElement = document.querySelector('[data-mis]')
const JUMP_SPEED = .45
const GRAVITY = .0015
const MIS_FRAME_COUNT = 1 // pozdeji zmenit podle poctu frame pro mis
const FRAME_TIME = 100

let isJumping
let misFrame
let currentFrameTime
let yVelocity

export function setupMis() {
    isJumping = false
    misFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(misElement, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateMis(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        misElement.src = `src/miiis.webp`
        return
    }

    if (currentFrameTime > FRAME_TIME) {
        misFrame = (misElement + 1) % MIS_FRAME_COUNT
        misElement.src = `src/miiis.webp` // pozdeji zmenit na src/miiis-run-${misFrame}
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(misElement, "--bottom", yVelocity * delta)
    
    if (getCustomProperty(misElement, "--bottom") <= 0) {
        setCustomProperty(misElement, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}