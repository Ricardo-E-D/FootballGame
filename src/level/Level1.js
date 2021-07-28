import Dot from "../Objects/Dot";
import ScoreBoard from "../Objects/ScoreBoard";
import DifficultyManager from "../Objects/DifficulityManager";
import Ball from "../Objects/Ball";
import Timer from "../Objects/Timer";
import ButtonManager from "../Objects/ButtonManager";
import IntervalManager from "../Objects/IntervalManager";
import {CST} from "../CST";
import EndLevelMessage from "../Objects/EndLevelMessage";
import BackgroundImage from "../Objects/BackgroundImage";


export default class Level1 extends Phaser.Scene{
    constructor() {
        super(CST.SCENES.LEVEL_ONE);
        this.createObjects();
    }

    createObjects()
    {
        this.dot = new Dot(this);
        this.scoreBoard = new ScoreBoard(this);
        this.difficultyManager = new DifficultyManager(this);
        this.ball = new Ball(this);
        this.timer = new Timer(this);
        this.buttonManager = new ButtonManager(this);
        this.intervalManager = new IntervalManager();
    }


    create() {
        BackgroundImage(this);
        this.intervalManager.setPlayerResponseCallback(() => this.incorrectSpacePressed());
        this.intervalManager.setBallCallback(() => this.createBall())
        this.intervalManager.createBallInterval();
        this.intervalManager.setSymbolCallback(() => this.dot.toGenerateRedDot(true))
        this.intervalManager.createSymbolInterval();
        this.createSpaceOnKeyboardListener();
        this.scoreBoard.create()
        this.buttonManager.create()
        this.timer.create(()=>this.timeOver());
        document.getElementById("slowDownButton").onclick = this.slowDownButtonPressed.bind(this);
    }

    update() {
        this.timer.update();
        this.scoreBoard.update()
    }

    createSpaceOnKeyboardListener() {
        this.input.keyboard.on('keydown-SPACE', () => {
            this.spacePressed();
        })
    }

    spacePressed() {
        //Valid entry of space pressed
        if (this.dot.isWaitingForSpaceAfterRedDotGenerated()) {
            console.log(this.time.now - this.dot.getLastGeneratedTime());
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

    timeOver() {
        EndLevelMessage(this, 1, ()=>this.levelUp());
        this.intervalManager.reset();
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

    levelUp()
    {
        this.reset();
        this.scene.start(CST.SCENES.LEVEL_TWO)
    }
}