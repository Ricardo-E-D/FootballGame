import Phaser from 'phaser'
import {CST} from '../CST.js'
import {CONFIG} from '../../config/config.js'
import Ball from '../Objects/Ball.js'
import Dot from '../Objects/Dot.js'
import ScoreBoard from '../Objects/ScoreBoard.js'
import ButtonManager from "../Objects/ButtonManager.js";
import DifficultyManager from "../Objects/DifficulityManager.js";
import Timer from "../Objects/Timer.js";

var windowWidth = window.innerWidth
var windowHeight = window.innerHeight

var timerInterval;

var ballInterval;
var ballIntervalTime = CONFIG.ball.defaultSpeed;

var redDotInterval;
var playerResponseInterval;

//TODO create field to input time length

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        });
        this.dot = new Dot(this)
        this.ball = new Ball(this)
        this.scoreBoard = new ScoreBoard(this)
        this.buttonManager = new ButtonManager(this);
        this.difficultyManager = new DifficultyManager(this)
        this.timer = new Timer(this)
    }

    create() {
        this.createBackgroundImage()
        this.createSpaceButton()
        this.createSpaceOnKeyboardListener()
        this.createTimer();
        this.createBallInterval(ballIntervalTime);
        this.createRedDotInterval();
        this.scoreBoard.create()
        this.buttonManager.create()
    }


    update() {
        this.timer.update()
        this.scoreBoard.update()
    }

    createBackgroundImage() {
        let image = this.add.image(windowWidth / 2, windowHeight / 2, 'gameBG')
        let scaleX = windowWidth / image.width
        let scaleY = windowHeight / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
    }

    createSpaceButton() {
        let buttonWidth = windowWidth * CONFIG.space.spaceWidthRatio
        let buttonHeight = windowHeight * CONFIG.space.spaceHeightRatio;
        let buttonX = windowWidth / 2;

        let rectangle = this.add.rectangle(buttonX, windowHeight * CONFIG.space.spaceHeightMarginRatio, buttonWidth, buttonHeight, 0xff0000);
        rectangle.setInteractive();
        rectangle.on("pointerdown", () => {
            this.spacePressed()
        });
    }

    spacePressed() {

        //Valid entry of space pressed
        if (this.dot.waitingForSpaceAfterRedDotGenerated) {
            console.log(this.time.now - this.dot.lastGeneratedTime)
            this.dot.waitingForSpaceAfterRedDotGenerated = false;

            this.increaseBallIntervalSpeed()
        }
        //Space pressed without dot generated
        else {
            this.decreaseBallIntervalSpeed()
        }
    }

    createSpaceOnKeyboardListener() {
        this.input.keyboard.on('keydown-SPACE', () => {
            this.spacePressed()
        })
    }

    sec() {
        this.timer.tic()
        if (this.timer.time === 0) {
            let endMessageStyle = {font: "35px Arial", fill: "#fff", align: "center"};
            this.add.text(windowWidth / 2 - 100, windowHeight / 2, "Great job \nYour score is " + this.scoreBoard.score, endMessageStyle)
            let image = this.add.image(windowWidth * 0.47, windowHeight * 0.6, "thumbUp");
            image.setOrigin(0)
            image.setScale(0.1)
            this.resetValues()
            this.resetIntervals()
        }
    }

    createTimer() {
        this.timer.create()
        timerInterval = setInterval(this.sec.bind(this), 1000)
    }

    resetValues() {
        this.scoreBoard.reset()
        this.timer.reset();
        ballIntervalTime = CONFIG.ball.defaultSpeed
        this.difficultyManager.reset();
    }

    resetIntervals() {
        clearInterval(ballInterval)
        clearInterval(playerResponseInterval)
        clearInterval(redDotInterval)
        clearInterval(timerInterval)
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }


    createBallInterval() {
        clearInterval(ballInterval);
        ballInterval = setInterval(() => this.createBall(), ballIntervalTime);
    }


    createRedDotInterval() {
        let timeToGenerate = this.randomNumber(3000, 6000)
        redDotInterval = setInterval(() => {
            this.dot.generateRedDot = true;
        }, timeToGenerate)
    }

    increaseBallIntervalSpeed() {
        this.scoreBoard.increaseScore();
        if (ballIntervalTime < 250) {
            ballIntervalTime = 250;
        }

        this.difficultyManager.checkForDifficulty(ballIntervalTime)
        clearInterval(playerResponseInterval);

        ballIntervalTime -= CONFIG.ball.speedDecreaseInMilliseconds;
        this.createBallInterval()
    }

    decreaseBallIntervalSpeed() {
        this.scoreBoard.decreaseScore()
        this.difficultyManager.checkForDifficulty(ballIntervalTime)
        clearInterval(playerResponseInterval)

        if (ballIntervalTime < 1250)
            ballIntervalTime += CONFIG.ball.speedIncreaseInMilliseconds
        this.createBallInterval()
    }


    createBall() {
        {
            this.ball.createBall(this.difficultyManager.getCurrentDifficulty())
            if (this.dot.generateRedDot) {
                this.dot.createRedDot(this.ball.getX(), this.ball.getY(), this.difficultyManager.getCurrentDifficulty())
                playerResponseInterval = setInterval(() => this.decreaseBallIntervalSpeed(), 1000)
            }
            else
            {
                this.dot.deleteRedDotIfExists()
            }
            console.log("Ball speed: + " + ballIntervalTime)
        }
    }
}
