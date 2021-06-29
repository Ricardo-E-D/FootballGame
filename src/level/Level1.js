import Dot from "../Objects/Dot";
import {CONFIG} from "../../config/config";
import ScoreBoard from "../Objects/ScoreBoard";
import DifficultyManager from "../Objects/DifficulityManager";
import Ball from "../Objects/Ball";
import Timer from "../Objects/Timer";
import ButtonManager from "../Objects/ButtonManager";

var redDotInterval;

var timerInterval;

var ballInterval;
var ballIntervalTime = CONFIG.ball.defaultSpeed;
var playerResponseInterval;

export default class Level1 {
    constructor(scene, levelManager) {
        this.levelManager = levelManager;
        this.scene = scene;
        this.dot = new Dot(scene);
        this.scoreBoard = new ScoreBoard(scene);
        this.difficultyManager = new DifficultyManager(scene);
        this.ball = new Ball(scene);
        this.timer = new Timer(scene, this);
    }

    create() {
        this.createSpaceOnKeyboardListener();
        this.createBallInterval();
        this.createRedDotInterval();
        this.timer.create();
        this.scoreBoard.create()
        this.createSpaceButton()
    }

    update() {
        this.timer.update();
        this.scoreBoard.update()
    }

    createSpaceOnKeyboardListener() {
        this.scene.input.keyboard.on('keydown-SPACE', () => {
            this.spacePressed();
        })
    }

    spacePressed() {
        //Valid entry of space pressed
        if (this.dot.waitingForSpaceAfterRedDotGenerated) {
            console.log(this.scene.time.now - this.dot.lastGeneratedTime);
            this.dot.waitingForSpaceAfterRedDotGenerated = false;

            this.increaseBallIntervalSpeed();
        }
        //Space pressed without dot generated
        else {
            this.decreaseBallIntervalSpeed();
        }
    }

    increaseBallIntervalSpeed() {
        this.scoreBoard.increaseScore();
        if (ballIntervalTime < 250) {
            ballIntervalTime = 250;
        }

        this.difficultyManager.checkForDifficulty(ballIntervalTime);
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

    createBallInterval() {
        clearInterval(ballInterval);
        ballInterval = setInterval(() => this.createBall(), ballIntervalTime);
    }

    createBall() {

        this.ball.createBall(this.difficultyManager.getCurrentDifficulty())
        if (this.dot.toGenerateRedDot) {
            this.dot.createRedDot(this.ball.getX(), this.ball.getY(), this.difficultyManager.getCurrentDifficulty())
            playerResponseInterval = setInterval(() => this.decreaseBallIntervalSpeed(), 1000)
        } else {
            this.dot.deleteRedDotIfExists()
        }
        console.log("Ball speed: + " + ballIntervalTime)
    }

    createRedDotInterval() {
        let timeToGenerate = this.randomNumber(3000, 6000);
        redDotInterval = setInterval(() => {
            this.dot.toGenerateRedDot = true;
        }, timeToGenerate);
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    //Message at the end of the level
    timeOver() {
        let windowWidth = this.scene.game.width;
        let windowHeight = this.scene.game.height;


        let endMessageStyle = {font: "35px Arial", fill: "#fff", align: "center"};
        this.scene.add.text(windowWidth / 2 - 100, windowHeight / 2, "Great job \nYour score is " + this.scoreBoard.score, endMessageStyle)
        let image = this.scene.add.image(windowWidth * 0.47, windowHeight * 0.6, "thumbUp");
        image.setOrigin(0)
        image.setScale(0.1)

        this.resetValues()
        this.resetIntervals()
    }

    resetValues() {
        this.scoreBoard.reset();
        this.timer.reset();
        ballIntervalTime = CONFIG.ball.defaultSpeed;
        this.difficultyManager.reset();
    }

    resetIntervals() {
        clearInterval(ballInterval);
        clearInterval(playerResponseInterval);
        clearInterval(redDotInterval);
        clearInterval(timerInterval);
    }

    slowDownButtonPressed() {
        ballIntervalTime += CONFIG.slowDownButton.slowDownBy
        this.createBallInterval();
    }

    createSpaceButton() {
        let windowWidth = this.scene.game.canvas.width;
        let windowHeight = this.scene.game.canvas.height;
        let buttonWidth = windowWidth * CONFIG.space.spaceWidthRatio;
        let buttonHeight = windowHeight * CONFIG.space.spaceHeightRatio;
        let buttonX = windowWidth / 2;

        let rectangle = this.scene.add.rectangle(buttonX, windowHeight * CONFIG.space.spaceHeightMarginRatio, buttonWidth, buttonHeight, 0xff0000);
        rectangle.setInteractive();
        rectangle.on("pointerdown", () => {
            this.spacePressed();
        });
    }
}