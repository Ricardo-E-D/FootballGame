import Timer from "../Objects/Timer";
import ScoreBoard from "../Objects/ScoreBoard";
import SymbolManager from "../Objects/SymbolManager";
import DifficultyManager from "../Objects/DifficulityManager";
import {CONFIG} from "../../config/config";
import Ball from "../Objects/Ball";
import ButtonManager from "../Objects/ButtonManager";
import IntervalManager from "../Objects/IntervalManager";

export default class Level2 {
    constructor(scene, levelManager) {
        this.scene = scene;
        this.levelManager = levelManager;

        this.timer = new Timer(scene, this);
        this.scoreBoard = new ScoreBoard(scene);
        this.difficultyManager = new DifficultyManager(scene)
        this.symbolManager = new SymbolManager(scene);
        this.ball = new Ball(scene);
        this.buttonManager = new ButtonManager(scene);
        this.intervalManager = new IntervalManager();
    }

    create() {
        this.intervalManager.setBallCallback(() => this.createBall());
        this.intervalManager.setSymbolCallback(()=>this.symbolManager.setToGenerateSymbol(true));

        this.timer.create();
        this.scoreBoard.create()
        this.symbolManager.generateSymbols(this.difficultyManager.getCurrentDifficulty())
        this.intervalManager.createBallInterval();
        this.intervalManager.createSymbolInterval();
    }

    update() {

    }

    timeOver() {

    }

    createBall() {
        this.ball.createBall(this.difficultyManager.getCurrentDifficulty())
        if (this.symbolManager.isToGenerateSymbol()) {
            this.symbolManager.createSymbol(this.ball.getX(), this.ball.getY())

            //Sets up timer after last symbol in the sequence that is displayed. After this timeout, the options are displayed
            if (this.symbolManager.noMoreSymbolsLeft()) {
                setTimeout(() => this.displaySymbolOptions(),2500)
            }
        } else {
            this.symbolManager.removeSymbol()
        }
    }


    displaySymbolOptions() {
        let options =  this.symbolManager.getOptions(this.difficultyManager.getCurrentDifficulty())

        this.buttonManager.displayOptionButtons(options, (selectedIndex) => this.checkForValidAnswer(selectedIndex));
        this.resetIntervals()
    }

    resetIntervals() {
        this.intervalManager.reset();
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
        this.intervalManager.setBallIntervalTime(this.difficultyManager.getCurrentDifficulty().lowerIntervalLimit);
        this.buttonManager.destroyOptionButtons();
        this.difficultyManager.increaseDifficulty();

        this.continueGame();
    }

    continueGame() {
        this.symbolManager.generateSymbols(this.difficultyManager.getCurrentDifficulty());
        this.intervalManager.createBallInterval();
        this.intervalManager.createSymbolInterval();
    }
    slowDownButtonPressed()
    {
        this.intervalManager.slowDownButtonPressed();
    }
}