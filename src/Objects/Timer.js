import {CONFIG} from "../../config/config.js";

class Timer
{
    constructor(scene, level) {
        this.level = level;
        this.scene = scene
        this.timerText = null;
        this.time = CONFIG.application.timeLength
        this.interval = null;
    }

    create()
    {
        this.timerText = this.scene.add.text(this.scene.game.canvas.width * 0.1, 5, "");
        let timerTextStyle = {font: "35px Arial", fill: "#fff", align: "center"};
        this.timerText.setStyle(timerTextStyle);

        this.interval = setInterval(this.sec.bind(this), 1000);

    }

    update()
    {
        this.timerText.setText("Time: " + this.time)
    }

    reset()
    {
        this.time = CONFIG.application.timeLength;
    }

    sec() {
        this.time -= 1;

        if (this.time === 0) {
            clearInterval(this.interval);

            this.level.timeOver();
        }
    }
}

export default Timer