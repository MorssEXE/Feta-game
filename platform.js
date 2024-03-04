import { setCustomProperty, getCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const PLATFORM_INTERVAL_MIN = 500
const PLATFORM_INTERVAL_MAX = 2000
const worldElement = document.querySelector("[data-world]")

let nextPlatformTime

export function setupPlatform() {
    nextPlatformTime = PLATFORM_INTERVAL_MIN
    document.querySelectorAll("[data-platform]").forEach(platform => {
        platform.remove()
    })
}

export function updatePlatform(delta, speedScale) {
    document.querySelectorAll("[data-platform]").forEach(platform => {
        incrementCustomProperty(platform, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(platform, "--left") <= -100) {
            platform.remove()
        }
    })
    
    if (nextPlatformTime <= 0) {
        createPlatform()
        nextPlatformTime = randomNumberBetween(PLATFORM_INTERVAL_MIN, PLATFORM_INTERVAL_MAX) / speedScale
    }
    nextPlatformTime -= delta
}

export function getPlatformRects() {
    return [...document.querySelectorAll("[data-platform]")].map(platform => {
        return platform.getBoundingClientRect()
    })
}

function createPlatform() {
    const platform = document.createElement("img")
    platform.dataset.platform = true
    platform.src = "src/mis-idle.png"
    platform.classList.add("platform")
    setCustomProperty(platform, "--left", 100)
    worldElement.append(platform)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}