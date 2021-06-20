import Phaser from 'phaser'
import {CST} from '../CST'
import {CONFIG} from '../../config/config.js'

var timer;
var time = 10;
var timerText;
var timerTextStyle = {font: "35px Arial", fill: "#fff", align: "center"}

var ballSpeed = 750;
var ballInterval;
var ball = null;

var redDot;
var generateRedDot = true;
var redDotInterval;
var redDotGeneratedTime;
var waitingForSpaceAfterRedDotGenerated = false;


export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        });
    }

    create() {
        this.createBackgroundImage()
        this.createSpaceButton()
        this.createSpaceOnKeyboardListener()
        this.createBackButton();
        this.createTimer();
        this.createBallInterval(ballSpeed);
        this.createRedDotInterval();
    }


    update() {
        timerText.setText("Time: " + time)
    }

    createBackgroundImage() {
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'gameBG')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
    }

    createSpaceButton() {
        let buttonWidth = CONFIG.application.width * CONFIG.space.spaceWidthRatio
        let buttonHeight = CONFIG.application.height * CONFIG.space.spaceHeightRatio;
        let buttonX = CONFIG.application.width / 2;

        let rectangle = this.add.rectangle(buttonX, CONFIG.application.height * CONFIG.space.spaceHeightMarginRatio, buttonWidth, buttonHeight, 0xff0000);
        rectangle.setInteractive();
        rectangle.on("pointerdown", () => {
            this.spacePressed()
        });
    }

    spacePressed() {
        //Valid entry of space pressed
        if (waitingForSpaceAfterRedDotGenerated) {
            console.log(this.time.now - redDotGeneratedTime)
            waitingForSpaceAfterRedDotGenerated = false;
        }
        //Space pressed without dot generated
        else
        {
            console.log("Game over")
        }
    }

    createSpaceOnKeyboardListener() {
        this.input.keyboard.on('keydown-SPACE', () => {
            this.spacePressed()
        })
    }

    sec() {
        time--;
        if (time === 0) {
            clearInterval(timer)
            console.log("Game over")
        }
        console.log(time)
    }

    createTimer() {
        timerText = this.add.text(CONFIG.application.width / 2, 0, "");
        timerText.setStyle(timerTextStyle);
        timer = setInterval(this.sec, 1000)
    }

    createBackButton() {
        let image = this.add.image(0, CONFIG.application.height, "backButton");
        image.setOrigin(0)
        image.setInteractive();
        image.on("pointerdown", () => {
            this.time.removeEvent(timer)
            clearInterval(1);
        })
    }


    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    createBallInterval(ballSpeed) {
        ballInterval = setInterval(() => {
            this.deleteRedDotIfExists()
            if (ball != null) {
                ball.destroy()
            }
            ball = this.add.image(
                this.randomNumber(0, this.game.canvas.width - CONFIG.ball.ballSize),
                this.randomNumber(0, this.game.canvas.height - CONFIG.ball.ballSize),
                "ball")
            ball.setOrigin(0)
            ball.setScale(CONFIG.ball.ballSize / ball.height)
            if (generateRedDot)
            {
                this.generateRedDot()
                generateRedDot = false;
            }
        }, ballSpeed);
    }

    generateRedDot()
    {
        let dotX = ball.x + (CONFIG.ball.ballSize / 2)
        let dotY = ball.y + (CONFIG.ball.ballSize / 2)
        redDot = this.add.circle(dotX, dotY, 10, 0xff0000)
        redDotGeneratedTime = this.time.now
        waitingForSpaceAfterRedDotGenerated = true;
    }

    deleteRedDotIfExists()
    {
        if (redDot != null)
        {
            redDot.destroy();
            redDot = null;
        }
    }

    createRedDotInterval() {
        let timeToGenerate = this.randomNumber(3000,6000)
        redDotInterval = setInterval(()=>{
            generateRedDot = true;
        }, timeToGenerate)
    }
}
