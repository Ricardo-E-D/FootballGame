import Dot from "../Objects/Dot";
import ScoreBoard from "../Objects/ScoreBoard";
import DifficultyManager from "../Objects/DifficulityManager";
import Ball from "../Objects/Ball";
import Timer from "../Objects/Timer";
import IntervalManager from "../Objects/IntervalManager";
import {CST} from "../CST";
import EndLevelMessage from "../Messages/EndLevelMessage";
import BackgroundImage from "../Objects/BackgroundImage";
import ChangeEyeMessage from "../Messages/ChangeEyeMessage";
import LevelPassedManager from "../Objects/LevelPassedManager";
import LevelNotPassedMessage from "../Messages/LevelNotPassedMessage";
import DisplayFixTheBallMessage from "../Messages/DisplayFixTheBallMessage";

var eye;
var startOfTheRound;
var keyboardListener;

export default class Level1 extends Phaser.Scene {
    constructor() {
        super(CST.SCENES.LEVEL_ONE);
        this.createObjects();
        eye = CST.EYE.RIGHT
    }

    createObjects() {
        this.dot = new Dot(this);
        this.scoreBoard = new ScoreBoard(this);
        this.difficultyManager = new DifficultyManager(this);
        this.ball = new Ball(this);
        this.timer = new Timer(this, eye);
        this.intervalManager = new IntervalManager(() => this.createBall(), () => this.dot.toGenerateRedDot(true), () => this.incorrectSpacePressed());
        this.levelPassedManager = new LevelPassedManager();
    }


    create() {
        BackgroundImage(this);
        this.intervalManager.createBallInterval();
        this.intervalManager.createSymbolInterval();
        this.createSpaceOnKeyboardListener();
        this.scoreBoard.create()
        this.timer.create(() => this.timeOver(), eye);
        this.levelPassedManager.create();
        startOfTheRound = true;

        let spaceButton = document.getElementById("spaceButton");
        spaceButton.removeEventListener("click", keyboardListener);
        spaceButton.style.visibility = "visible";
        this.addKeyboardButtonListener();
        document.getElementById("slowDownButton").onclick = this.slowDownButtonPressed.bind(this);
    }

    addKeyboardButtonListener() {
        keyboardListener = this.spacePressed.bind(this);
        document.getElementById("spaceButton").addEventListener("click", keyboardListener);
    }

    update() {
        this.scoreBoard.update()
    }

    createSpaceOnKeyboardListener() {
        this.input.keyboard.on('keydown-SPACE', () => {
            this.spacePressed();
        })
    }

    spacePressed() {
        console.log("spacePressed")
        //Valid entry of space pressed
        if (this.dot.isWaitingForSpaceAfterRedDotGenerated()) {
            let reactionTime = this.time.now - this.dot.getLastGeneratedTime();
            if (reactionTime < 1000) {
                console.log(reactionTime);
            }
            this.dot.setWaitingForSpaceAfterRedDotGenerated(false);
            this.correctSpacePressed();
        }
        //Space pressed without dot generated
        else {
            this.incorrectSpacePressed();
        }
        this.difficultyManager.checkForDifficulty(this.intervalManager.getBallIntervalTime());
        this.intervalManager.clearPlayerResponseTimeout();
    }

    correctSpacePressed() {
        startOfTheRound = false;
        this.levelPassedManager.addEntry(true)
        this.scoreBoard.increaseScore();
        this.intervalManager.increaseBallIntervalSpeed();
    }

    incorrectSpacePressed() {
        this.intervalManager.decreaseBallIntervalSpeed();
        if (startOfTheRound) {
            this.pauseGame();
            DisplayFixTheBallMessage(this, () => this.continueGame())
            return;
        }
        this.levelPassedManager.addEntry(false);
        this.intervalManager.decreaseBallIntervalSpeed();
        this.scoreBoard.decreaseScore();
    }

    pauseGame() {
        document.getElementById("spaceButton").removeEventListener("click", keyboardListener);
        this.input.keyboard.off('keydown-SPACE');
        this.timer.pause();
        this.intervalManager.pauseIntervals();
    }

    continueGame() {
        this.addKeyboardButtonListener();
        this.createSpaceOnKeyboardListener();
        this.timer.continue();
        this.intervalManager.continueIntervals();
    }

    createBall() {
        this.ball.createBall(this.difficultyManager.getCurrentDifficulty())

        if (this.dot.isToGenerateRedDot()) {
            this.dot.createRedDot(this.ball.getX(), this.ball.getY(), this.difficultyManager.getCurrentDifficulty())
            this.intervalManager.createPlayerResponseTimeout();
        } else {
            this.dot.deleteRedDotIfExists();
        }
        console.log("Ball speed: + " + this.intervalManager.getBallIntervalTime())
    }


    timeOver() {
        if (eye === CST.EYE.LEFT) {
            if (this.levelPassedManager.isLevelPassed()) {
                this.pauseGame();
                EndLevelMessage(this, 1, () => this.levelUp());
                eye = CST.EYE.RIGHT;
            } else {
                eye = CST.EYE.RIGHT;
                this.pauseGame();
                LevelNotPassedMessage(this, () => this.restartLevel())
            }
        } else {
            eye = CST.EYE.LEFT;
            ChangeEyeMessage(this, () => this.restartLevel())
        }
        this.reset();
    }

    reset() {
        this.intervalManager.reset();
        this.registry.destroy();
        this.events.off();
        this.input.keyboard.off('keydown-SPACE');
        this.scoreBoard.reset();
        this.timer.reset();
        this.intervalManager.resetBallIntervalSpeed();
        this.difficultyManager.reset();
    }

    slowDownButtonPressed() {
        this.intervalManager.slowDownButtonPressed();
    }

    levelUp() {
        document.getElementById("spaceButton").style.visibility = "hidden";
        this.reset();
        this.scene.start(CST.SCENES.LEVEL_TWO)
    }

    restartLevel() {
        this.reset();
        this.create();
    }
}