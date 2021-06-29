import Timer from "../Objects/Timer";
import ScoreBoard from "../Objects/ScoreBoard";
import SymbolManager from "../Objects/SymbolManager";
import DifficultyManager from "../Objects/DifficulityManager";
import {CONFIG} from "../../config/config";
import Ball from "../Objects/Ball";
import ButtonManager from "../Objects/ButtonManager";

var ballInterval;
var ballIntervalTime;

var menuTimeout;


var symbolInterval;

export default class Level2 {
    constructor(scene, levelManager) {
        this.scene = scene;
        this.levelManager = levelManager;

        this.timer = new Timer(scene, this);
        this.scoreBoard = new ScoreBoard(scene);
        this.difficultyManager = new DifficultyManager(scene)
        this.symbolManager = new SymbolManager(scene);
        this.ball = new Ball(scene);
        this.buttonManager = new ButtonManager(scene)

        ballIntervalTime = CONFIG.ball.defaultSpeed;

    }

    create() {
        this.timer.create();
        this.scoreBoard.create()
        this.symbolManager.generateSymbols(this.difficultyManager.getCurrentDifficulty())
        this.createBallInterval();
        this.createSymbolInterval();
    }

    update() {

    }

    createBallInterval() {
        clearInterval(ballInterval);
        ballInterval = setInterval(() => this.createBall(), ballIntervalTime);
    }

    slowDownPressed() {
        ballIntervalTime += CONFIG.slowDownButton.slowDownBy
        this.createBallInterval();
    }

    timeOver() {

    }

    createBall() {
        this.ball.createBall(this.difficultyManager.getCurrentDifficulty())
        if (this.symbolManager.isToGenerateSymbol()) {
            this.symbolManager.createSymbol(this.ball.getX(), this.ball.getY())

            if (this.symbolManager.noMoreSymbolsLeft()) {
                menuTimeout = setTimeout(() => this.displaySymbolOptions(),2500)
            }
        } else {
            this.symbolManager.removeSymbol()
        }
    }

    createSymbolInterval() {
        let timeToGenerate = this.randomNumber(3000, 6000)
        symbolInterval = setInterval(() => this.symbolManager.setToGenerateSymbol(true), timeToGenerate)
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    displaySymbolOptions() {
        let options =  this.symbolManager.getOptions(this.difficultyManager.getCurrentDifficulty())

        this.buttonManager.displayOptionButtons(options, (selectedIndex)=> this.checkForValidAnswer(selectedIndex));
        this.resetIntervals()
    }

    resetIntervals() {
        clearInterval(ballInterval);
        clearInterval(symbolInterval);
    }

    checkForValidAnswer(selectedIndex) {
        let correctAnswer = this.symbolManager.getIndexOfCorrectAnswer()
        if (selectedIndex === correctAnswer)
        {
            this.scoreBoard.increaseScore();
        }
        else
        {
            this.scoreBoard.decreaseScore();
        }
        this.buttonManager.destroyOptionButtons();
        this.difficultyManager.increaseDifficulty();

        this.continueGame();
    }

    continueGame() {
        this.symbolManager.generateSymbols(this.difficultyManager.getCurrentDifficulty());
        this.createBallInterval();
        this.createSymbolInterval();
    }
}