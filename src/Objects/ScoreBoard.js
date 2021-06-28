import {CONFIG} from "../../config/config.js";

class ScoreBoard
{
    constructor(scene) {
    this.scene = scene;
    this.scoreBoard = null;
    this.score = 0;
    }

    create()
    {
        this.scoreBoard = this.scene.add.text(this.scene.game.canvas.width * 0.5, 5, "");
        let scoreBoardStyle = {font: "35px Arial", fill: "#fff", align: "center"};
        this.scoreBoard.setStyle(scoreBoardStyle);
    }

    increaseScore()
    {
        this.score += CONFIG.score.increase
    }

    decreaseScore()
    {
        this.score -= CONFIG.score.decrease
    }

    getScore()
    {
        return this.score
    }

    update() {
        this.scoreBoard.setText("Score: " + this.score)
    }

    reset()
    {
        this.score = 0;
    }
}

export default ScoreBoard