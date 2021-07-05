import Dot from "../Objects/Dot";
import {CONFIG} from "../../config/config";
import ScoreBoard from "../Objects/ScoreBoard";
import DifficultyManager from "../Objects/DifficulityManager";
import Ball from "../Objects/Ball";
import Timer from "../Objects/Timer";
import ButtonManager from "../Objects/ButtonManager";
import IntervalManager from "../Objects/IntervalManager";


export default class Level1 {
    constructor(scene, levelManager) {
        this.levelManager = levelManager;
        this.scene = scene;
        this.dot = new Dot(scene);
        this.scoreBoard = new ScoreBoard(scene);
        this.difficultyManager = new DifficultyManager(scene);
        this.ball = new Ball(scene);
        this.timer = new Timer(scene, this);
        this.buttonManager = new ButtonManager(scene);
        this.intervalManager = new IntervalManager();
    }

    create() {
        this.intervalManager.setPlayerResponseCallback(() => this.incorrectSpacePressed());

        this.intervalManager.setBallCallback(() => this.createBall())
        this.intervalManager.createBallInterval();

        this.intervalManager.setSymbolCallback(() => this.dot.toGenerateRedDot(true))
        this.intervalManager.createSymbolInterval();

        this.createSpaceOnKeyboardListener();
        this.timer.create();
        this.scoreBoard.create()
        this.buttonManager.createSpaceButton(() => this.spacePressed())
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
        if (this.dot.isWaitingForSpaceAfterRedDotGenerated()) {
            console.log(this.scene.time.now - this.dot.getLastGeneratedTime());
            this.dot.setWaitingForSpaceAfterRedDotGenerated(false);

            this.correctSpacePressed();
        }
        //Space pressed without dot generated
        else {
            this.incorrectSpacePressed();
        }
        this.difficultyManager.checkForDifficulty(this.intervalManager.getBallIntervalTime());
        this.intervalManager.clearPlayerResponseTimeout();
        this.intervalManager.createBallInterval();
    }

    correctSpacePressed() {
        this.scoreBoard.increaseScore();
        this.intervalManager.increaseBallIntervalSpeed();
    }

    incorrectSpacePressed() {
        this.scoreBoard.decreaseScore();
        this.intervalManager.decreaseBallIntervalSpeed()
    }


    createBall() {
        this.ball.createBall(this.difficultyManager.getCurrentDifficulty())

        if (this.dot.isToGenerateRedDot()) {
            this.dot.createRedDot(this.ball.getX(), this.ball.getY(), this.difficultyManager.getCurrentDifficulty())
            this.intervalManager.createPlayerResponseTimeout()
        } else {
            this.dot.deleteRedDotIfExists()
        }
        console.log("Ball speed: + " + this.intervalManager.getBallIntervalTime())
    }

    //Message at the end of the level
    timeOver() {
        this.timer.displayLevelEndMessage(this.scoreBoard.getScore());
        this.resetValues();
        this.resetIntervals();
    }

    resetValues() {
        this.scoreBoard.reset();
        this.timer.reset();
        this.intervalManager.resetBallIntervalSpeed();
        this.difficultyManager.reset();
    }

    resetIntervals() {
        this.intervalManager.reset();
    }

    slowDownButtonPressed() {
        this.intervalManager.slowDownButtonPressed();
    }
}