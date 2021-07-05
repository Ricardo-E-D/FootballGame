import {CONFIG} from "../../config/config.js";

var scene;
var scoreBoardText;
var score;

export default class ScoreBoard
{
    constructor(gameScene) {
        scene = gameScene;
        scoreBoardText = null;
        score = 0;
    }

    create()
    {
        scoreBoardText = scene.add.text(scene.game.canvas.width * 0.5, 5, "");
        let scoreBoardStyle = {font: "35px Arial", fill: "#fff", align: "center"};
        scoreBoardText.setStyle(scoreBoardStyle);
        this.update();
    }

    increaseScore()
    {
        score += CONFIG.score.increase
        this.update();
    }

    decreaseScore()
    {
        score -= CONFIG.score.decrease
        this.update();
    }

    getScore()
    {
        return score
    }

    update() {
        scoreBoardText.setText("Score: " + score)
    }

    reset()
    {
        score = 0;
    }
}