import {CONFIG} from "../../config/config.js";

export default class DifficultyManager {
    constructor(scene) {
        this.scene = scene;

        this.difficulties = [];
        this.difficulties[0] = CONFIG.difficulty["0"];
        this.difficulties[1] = CONFIG.difficulty["1"];
        this.difficulties[2] = CONFIG.difficulty["2"];
        this.difficulties[3] = CONFIG.difficulty["3"];
        this.difficulties[4] = CONFIG.difficulty["4"];
        this.difficulties[5] = CONFIG.difficulty["5"];
        this.difficulties[6] = CONFIG.difficulty["6"];
        this.difficulties[7] = CONFIG.difficulty["7"];

        this.currentDifficulty = 0;
    }

    checkForDifficulty(ballIntervalTime) {
        let difficulty = this.difficulties[this.currentDifficulty]

        if (difficulty.lowerIntervalLimit <= ballIntervalTime && difficulty.upperIntervalLimit >= ballIntervalTime) {
            return;
        }

        //True when the ball interval time is smaller then the current difficulty boundary. Used for checking difficulties
        if (difficulty.upperIntervalLimit < ballIntervalTime && this.currentDifficulty !== 0) {
            this.currentDifficulty--;
        } else if ((difficulty.lowerIntervalLimit > ballIntervalTime && this.currentDifficulty < this.difficulties.length - 1) && this.currentDifficulty !== 7) {
            this.currentDifficulty++;
        }
    }

    getCurrentDifficulty() {
        return this.difficulties[this.currentDifficulty]
    }

    reset()
    {
        this.currentDifficulty = 0
    }

    increaseDifficulty() {
        this.currentDifficulty += 1;
    }
}