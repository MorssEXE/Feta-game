import { setCustomProperty, getCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js"

const OBSTACLES = {
    skull: {
        speed: 0.05,
        intervalMin: 800,
        intervalMax: 2000,
        image: "src/obstacle.png",
        cssClass: "skull"
    },
    bat: {
        speed: 0.07,
        intervalMin: 2500,
        intervalMax: 5000,
        image: "src/bat-fly-3.png",
        cssClass: "bat"
    },
    spider: {
        speed: 0.045,
        intervalMin: 2500,
        intervalMax: 5000,
        image: "src/obstacle.png",
        cssClass: "spider"
    }
}
const worldElement = document.querySelector("[data-world]")

let nextObstacleTimeSkull
let nextObstacleTimeBat
let nextObstacleTimeSpider

let batFrame = 0
let batFrameTime = 0
const BAT_FRAME_COUNT = 3
const BAT_FRAME_TIME = 130

export function setupObstacles() {
    nextObstacleTimeSkull = OBSTACLES.skull.intervalMin
    nextObstacleTimeBat = OBSTACLES.bat.intervalMin
    nextObstacleTimeSpider = OBSTACLES.spider.intervalMin
    document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
        obstacle.remove()
    })
}

export function updateObstacles(delta, speedScale) {
    document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
        const obstacleType = obstacle.dataset.obstacleType;
        incrementCustomProperty(obstacle, "--left", delta * speedScale * OBSTACLES[obstacleType].speed * -1);
        if (getCustomProperty(obstacle, "--left") <= -100) {
            obstacle.remove();
        }
    });

    // Update bat's frame
    batFrameTime += delta * speedScale;
    if (batFrameTime >= BAT_FRAME_TIME) {
        batFrame = (batFrame % BAT_FRAME_COUNT) + 1; // Cycle through bat frames
        batFrameTime -= BAT_FRAME_TIME;
        const batElement = document.querySelector(".bat"); // Assuming there's only one bat element in the DOM
        if (batElement) {
            batElement.src = `src/bat-fly-${batFrame}.png`;
        }
    }

    if (nextObstacleTimeSkull <= 0 || nextObstacleTimeBat <= 0) {
        createRandomObstacle();
        // Your logic for updating obstacle creation time here...
    }
    nextObstacleTimeSkull -= delta;
    nextObstacleTimeBat -= delta;
    nextObstacleTimeSpider -= delta;
}

export function getObstacleRects() {
    return [...document.querySelectorAll("[data-obstacle]")].map(obstacle => {
        return obstacle.getBoundingClientRect()
    })
}

function createRandomObstacle() {
    const obstacleTypes = Object.keys(OBSTACLES)
    const randomIndex = Math.floor(Math.random() * obstacleTypes.length)
    const randomObstacleType = obstacleTypes[randomIndex]

    const obstacle = document.createElement("img")
    obstacle.dataset.obstacle = true
    obstacle.dataset.obstacleType = randomObstacleType
    obstacle.src = OBSTACLES[randomObstacleType].image
    obstacle.classList.add(OBSTACLES[randomObstacleType].cssClass)
    setCustomProperty(obstacle, "--left", 100)
    worldElement.append(obstacle)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
