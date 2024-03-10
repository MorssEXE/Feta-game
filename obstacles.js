import { setCustomProperty, getCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const SKULL_INTERVAL_MIN = 700
const SKULL_INTERVAL_MAX = 2500
const worldElement = document.querySelector("[data-world]")

let nextSkullTime

export function setupSkull() {
    nextSkullTime = SKULL_INTERVAL_MIN
    document.querySelectorAll("[data-skull]").forEach(skull => {
        skull.remove()
    })
}

export function updateSkull(delta, speedScale) {
     document.querySelectorAll("[data-skull]").forEach(skull => {
        incrementCustomProperty(skull, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(skull, "--left") <= -100) {
            skull.remove()
        }
    })
    
    if (nextSkullTime <= 0) {
        createSkull()
        nextSkullTime = randomNumberBetween(SKULL_INTERVAL_MIN, SKULL_INTERVAL_MAX) / speedScale - SPEED
    }
    nextSkullTime -= delta
}

export function getSkullRects() {
    return [...document.querySelectorAll("[data-skull]")].map(skull => {
        return skull.getBoundingClientRect()
    })
}

function createSkull() {
    const skull = document.createElement("img")
    skull.dataset.skull = true
    skull.src = "src/obstacle.png"
    skull.classList.add("skull")
    setCustomProperty(skull, "--left", 100)
    worldElement.append(skull)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}