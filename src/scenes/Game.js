import Phaser from 'phaser'
import {CST} from '../CST'
import {CONFIG} from '../../config/config.js'

var timer;
var time = CONFIG.application.timeLength;
var timerText;

var ballInterval;
var ball = null;
var ballIntervalTime = 60000 / 80;
var isBallLeft = false;

var redDot;
var generateRedDot = false;
var redDotInterval;
var redDotGeneratedTime;
var waitingForSpaceAfterRedDotGenerated = false;

var playerResponseInterval;

var scoreBoard;
var score = 0;

var levels = [];
//A
levels[0] = {
    "topSpanY": CONFIG.application.height * 0.5,
    "bottomSpanY": CONFIG.application.height * 0.51,

    "leftSpanXMin": CONFIG.application.width * 0.24,
    "leftSpanXMax":  CONFIG.application.width * 0.25,

    "rightSpanXMin": CONFIG.application.width * 0.74,
    "rightSpanXMax": CONFIG.application.width * 0.75,

    "dotSize" : CONFIG.dot.initialSize,

    "lowerIntervalLimit" : 599,
    "upperIntervalLimit" : 1200
};

//B
levels[1] = {
    "topSpanY": CONFIG.application.height * 0.45,
    "bottomSpanY": CONFIG.application.height * 0.55,

    "leftSpanXMin": CONFIG.application.width * 0.24,
    "leftSpanXMax":  CONFIG.application.width * 0.25,

    "rightSpanXMin": CONFIG.application.width * 0.74,
    "rightSpanXMax": CONFIG.application.width * 0.75,

    "dotSize" : CONFIG.dot.initialSize - CONFIG.dot.lowerSizeEachLevelBy,
    "lowerIntervalLimit": 501,
    "upperIntervalLimit" : 600
}

//C
levels[2] = {
    "topSpanY": CONFIG.application.height * 0.45,
    "bottomSpanY": CONFIG.application.height * 0.55,

    "leftSpanXMin": CONFIG.application.width * 0.20,
    "leftSpanXMax":  CONFIG.application.width * 0.30,

    "rightSpanXMin": CONFIG.application.width * 0.70,
    "rightSpanXMax": CONFIG.application.width * 0.80,

    "dotSize" : CONFIG.dot.initialSize - (CONFIG.dot.lowerSizeEachLevelBy * 2),
    "lowerIntervalLimit": 429,
    "upperIntervalLimit" : 500
}

//D
levels[3] = {
    "topSpanY": CONFIG.application.height * 0.40,
    "bottomSpanY": CONFIG.application.height * 0.60,

    "leftSpanXMin": CONFIG.application.width * 0.20,
    "leftSpanXMax":  CONFIG.application.width * 0.30,

    "rightSpanXMin": CONFIG.application.width * 0.70,
    "rightSpanXMax": CONFIG.application.width * 0.80,

    "dotSize" : CONFIG.dot.initialSize - (CONFIG.dot.lowerSizeEachLevelBy * 3),
    "lowerIntervalLimit": 376,
    "upperIntervalLimit" : 428
}

//E
levels[4] = {
    "topSpanY": CONFIG.application.height * 0.40,
    "bottomSpanY": CONFIG.application.height * 0.60,

    "leftSpanXMin": CONFIG.application.width * 0.15,
    "leftSpanXMax":  CONFIG.application.width * 0.35,

    "rightSpanXMin": CONFIG.application.width * 0.65,
    "rightSpanXMax": CONFIG.application.width * 0.85,

    "dotSize" : CONFIG.dot.initialSize - (CONFIG.dot.lowerSizeEachLevelBy * 4),
    "lowerIntervalLimit": 334,
    "upperIntervalLimit" : 375
}

//F
levels[5] = {
    "topSpanY": CONFIG.application.height * 0.35,
    "bottomSpanY": CONFIG.application.height * 0.65,

    "leftSpanXMin": CONFIG.application.width * 0.15,
    "leftSpanXMax":  CONFIG.application.width * 0.35,

    "rightSpanXMin": CONFIG.application.width * 0.65,
    "rightSpanXMax": CONFIG.application.width * 0.85,

    "dotSize" : CONFIG.dot.initialSize - (CONFIG.dot.lowerSizeEachLevelBy * 5),
    "lowerIntervalLimit": 301,
    "upperIntervalLimit" : 333
}

//G
levels[6] = {
    "topSpanY": CONFIG.application.height * 0.35,
    "bottomSpanY": CONFIG.application.height * 0.65,

    "leftSpanXMin": CONFIG.application.width * 0.10,
    "leftSpanXMax": CONFIG.application.width * 0.40,

    "rightSpanXMin": CONFIG.application.width * 0.60,
    "rightSpanXMax": CONFIG.application.width * 0.90,

    "dotSize": CONFIG.dot.initialSize - (CONFIG.dot.lowerSizeEachLevelBy * 5),
    "lowerIntervalLimit": 273,
    "upperIntervalLimit": 300
}

//H
levels[7] = {
    "topSpanY": CONFIG.application.height * 0.30,
    "bottomSpanY": CONFIG.application.height * 0.70,

    "leftSpanXMin": CONFIG.application.width * 0.10,
    "leftSpanXMax": CONFIG.application.width * 0.40,

    "rightSpanXMin": CONFIG.application.width * 0.60,
    "rightSpanXMax": CONFIG.application.width * 0.90,

    "dotSize": CONFIG.dot.initialSize - (CONFIG.dot.lowerSizeEachLevelBy * 5),
    "lowerIntervalLimit": 0,
    "upperIntervalLimit": 372
}




var currentLevel = 0;


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
        this.createExitAndRestartButtons();
        this.createScoreBoard();

        this.createTimer();
        this.createBallInterval(ballIntervalTime);
        this.createRedDotInterval();
    }


    update() {
        timerText.setText("Time: " + time)
        scoreBoard.setText("Score: " + score)
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

            this.increaseBallIntervalSpeed()
        }
        //Space pressed without dot generated
        else
        {
          this.decreaseBallIntervalSpeed()
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
            let endMessageStyle = {font: "35px Arial", fill: "#fff", align: "center"};
            this.add.text(CONFIG.application.width * 0.45, CONFIG.application.height * 0.45, "Great job \nYour score is " + score, endMessageStyle)
            let image = this.add.image(CONFIG.application.width * 0.45, CONFIG.application.height * 0.6, "thumbUp");
            image.setOrigin(0)
            image.setScale(0.1)
            this.resetValues()
            this.resetIntervals()
        }
        console.log(time)
    }

    createTimer() {
        timerText = this.add.text(CONFIG.application.width * 0.1, 5, "");
        let timerTextStyle = {font: "35px Arial", fill: "#fff", align: "center"};
        timerText.setStyle(timerTextStyle);
        timer = setInterval(this.sec.bind(this), 1000)
    }

    //TODO make responsive
    createExitAndRestartButtons() {
        let backButton = this.add.image(CONFIG.application.width * 0.90, 5, "backButton");
        backButton.setOrigin(0)
        backButton.setInteractive();
        backButton.setScale(0.5)
        backButton.on("pointerdown", () => {
            this.scene.start(CST.SCENES.GAME)
            this.resetIntervals();
            this.resetValues();
        })

        let restartButton = this.add.image(CONFIG.application.width * 0.80, 5, "restartButton");
        restartButton.setOrigin(0);
        restartButton.setScale(0.5);
        restartButton.setInteractive();
        restartButton.on("pointerdown", () => {
            this.scene.start(CST.SCENES.MAIN);
            this.resetIntervals()
            this.resetValues()
        })
    }

    resetValues() {
        score = 0;
        time = CONFIG.application.timeLength;
    }
    //TODO reset time count to default value


    resetIntervals()
    {
        clearInterval(ballInterval)
        clearInterval(playerResponseInterval)
        clearInterval(redDotInterval)
        clearInterval(timer)
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }


    createBallInterval( ) {
        ballInterval = setInterval(() => this.createBall(), ballIntervalTime);
    }

    createRedDot()
    {
        let dotX = ball.x + (CONFIG.ball.ballSize / 2)
        let dotY = ball.y + (CONFIG.ball.ballSize / 2)
        redDot = this.add.circle(dotX, dotY, levels[currentLevel].dotSize, 0xff0000)
        redDotGeneratedTime = this.time.now
        waitingForSpaceAfterRedDotGenerated = true;
        playerResponseInterval = setInterval(() => this.decreaseBallIntervalSpeed(), 1000)
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
    //TODO set increase interval

    increaseBallIntervalSpeed() {
        score += 10;
        if (ballIntervalTime < 250)
        {
            ballIntervalTime = 250;
        }
        else if (ballIntervalTime === 250) return;

        this.checkForLevel();
        clearInterval(playerResponseInterval);

        clearInterval(ballInterval);
        ballIntervalTime -= 50;
        this.createBallInterval()
    }
    //TODO set decrease interval

    decreaseBallIntervalSpeed() {
        score -= 5;
        if (ballIntervalTime > 1200) return;
        this.checkForLevel()
        clearInterval(playerResponseInterval)

        clearInterval(ballInterval);
        if (ballIntervalTime < 1250)
            ballIntervalTime += 50
        this.createBallInterval()
    }

    checkForLevel()
    {
        let level = levels[currentLevel]

        if (level.lowerIntervalLimit <= ballIntervalTime && level.upperIntervalLimit >= ballIntervalTime)
        {
            return;
        }

        console.log(levels.length);
        //True when the ball interval time is smaller then the current level boundary. Used fo checking levels
        if(level.upperIntervalLimit < ballIntervalTime && currentLevel !== 0)
        {
            currentLevel--;
        }

        else if (level.lowerIntervalLimit > ballIntervalTime && currentLevel < levels.length - 1 )
        {
            currentLevel++;
        }
    }

    createBall() {
        {
            this.deleteRedDotIfExists()
            if (ball != null) {
                ball.destroy()
            }

            let ballX
            let level = levels[currentLevel];

            let  ballY = this.randomNumber(level.bottomSpanY, level.topSpanY);

            if(isBallLeft)
            {
                ballX = this.randomNumber(level.rightSpanXMin, level.rightSpanXMax);
                isBallLeft = false;
            }
            else
            {
                 ballX = this.randomNumber(level.leftSpanXMin, level.leftSpanXMax);
                 isBallLeft = true;
            }

            ball = this.add.image(ballX, ballY, "ball")
            ball.setOrigin(0)
            ball.setScale(CONFIG.ball.ballSize / ball.height)

            if (generateRedDot)
            {
                this.createRedDot()
                generateRedDot = false;
            }
            console.log("Ball speed: + " + ballIntervalTime)
        }
    }

    createScoreBoard() {
        scoreBoard = this.add.text(CONFIG.application.width * 0.5, 5, "");
        let scoreBoardStyle = {font: "35px Arial", fill: "#fff", align: "center"};
        scoreBoard.setStyle(scoreBoardStyle);
    }
}
