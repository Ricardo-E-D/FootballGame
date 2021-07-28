import ScoreBoard from "../Objects/ScoreBoard";
import SymbolManager from "../Objects/SymbolManager";
import DifficultyManager from "../Objects/DifficulityManager";
import Ball from "../Objects/Ball";
import ButtonManager from "../Objects/ButtonManager";
import IntervalManager from "../Objects/IntervalManager";
import EndLevelMessage from "../Objects/EndLevelMessage";
import BackgroundImage from "../Objects/BackgroundImage";

var levelNo;

export default class SymbolLevel extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.createObjects();
    }

    createObjects() {
        this.symbolManager = new SymbolManager(this);
        this.scoreBoard = new ScoreBoard(this);
        this.difficultyManager = new DifficultyManager(this)
        this.ball = new Ball(this);
        this.buttonManager = new ButtonManager(this);
        this.intervalManager = new IntervalManager();
        this.buttonManager = new ButtonManager(this);
    }

    create() {
        BackgroundImage(this);
        this.buttonManager.create();
        this.intervalManager.setBallCallback(() => this.createBall());
        this.intervalManager.setSymbolCallback(() => this.symbolManager.setToGenerateSymbol(true));

        this.scoreBoard.create()

        this.symbolManager.setLevelFinishedCallback(() => this.displayFinalMessage())
        this.symbolManager.generateSymbols(this.difficultyManager.getCurrentDifficulty())
        this.intervalManager.createBallInterval();
        this.intervalManager.createSymbolInterval();
        document.getElementById("slowDownButton").onclick = this.slowDownButtonPressed.bind(this);
    }

    update() {

    }

    createBall() {
        this.ball.createBall(this.difficultyManager.getCurrentDifficulty())
        if (this.symbolManager.isToGenerateSymbol()) {
            this.symbolManager.createSymbol(this.ball.getX(), this.ball.getY())

            //Sets up timer after last symbol in the sequence that is displayed. After this timeout, the options are displayed
            if (this.symbolManager.noMoreSymbolsLeft()) {
                setTimeout(() => this.displaySymbolOptions(), 2500)
            }
        } else {
            this.symbolManager.removeSymbol()
        }
    }


    displaySymbolOptions() {
        let options = this.symbolManager.getOptions(this.difficultyManager.getCurrentDifficulty())

        this.buttonManager.displayOptionButtons(options, (selectedIndex) => this.checkForValidAnswer(selectedIndex));
        this.intervalManager.reset();
    }

    checkForValidAnswer(selectedIndex) {
        let correctAnswer = this.symbolManager.getIndexOfCorrectAnswer()
        if (selectedIndex === correctAnswer) {
            this.scoreBoard.increaseScore();
        } else {
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

    reset() {
        this.intervalManager.reset();
        this.registry.destroy();
        this.events.off();
    }

    setSymbolType(level) {
        levelNo = level;
        this.symbolManager.setLevel(level);
    }

    displayFinalMessage() {
        EndLevelMessage(this, levelNo, () => this.levelUp());
        this.intervalManager.reset();
    }

    slowDownButtonPressed() {
        this.intervalManager.slowDownButtonPressed()
    }
}