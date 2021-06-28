import {CONFIG} from "../../config/config.js";

class Timer
{
    constructor(scene) {
        this.scene = scene
        this.timerText = null;
        this.time = CONFIG.application.timeLength
    }

    create()
    {
        this.timerText = this.scene.add.text(this.scene.game.canvas.width * 0.1, 5, "");
        let timerTextStyle = {font: "35px Arial", fill: "#fff", align: "center"};
        this.timerText.setStyle(timerTextStyle);
    }

    update()
    {
        this.timerText.setText("Time: " + this.time)
    }

    tic()
    {
        this.time -= 1;
    }

    reset()
    {
        this.time = CONFIG.application.timeLength;
    }
}

export default Timer