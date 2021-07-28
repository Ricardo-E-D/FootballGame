import {CONFIG} from "../../config/config.js";

export default class Timer
{
    constructor(scene) {
        this.scene = scene
        this.timerText = null;
        this.time = CONFIG.application.timeLength
        this.interval = null;
    }


    create(callback)
    {
        this.timeOverCB = callback;
        this.reset();
        this.timerText = this.scene.add.text(this.scene.game.canvas.width * 0.1, 5, "");
        let timerTextStyle = {font: "35px Arial", fill: "#fff", align: "center"};
        this.timerText.setStyle(timerTextStyle);

        this.interval = setInterval(() => this.sec(), 1000);
    }

    update()
    {
        this.timerText.setText("Time: " + this.time)
    }

    reset()
    {
        this.time = CONFIG.application.timeLength;
        clearInterval(this.interval);
    }

    sec() {
        this.time -= 1;

        if (this.time === 0) {
            clearInterval(this.interval);
            this.timeOverCB();
        }
    }

}