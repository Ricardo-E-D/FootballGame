import {CONFIG} from "../../config/config.js";

class ButtonManager {
    constructor(scene) {
        this.scene = scene;
    }

    create()
    {
        this.createBackButton()
        this.createRestartButton()
        this.createSlowDownButton()
    }

     createBackButton() {

        let backButton = this.scene.add.image(this.scene.game.canvas.width * 0.90, 5, "backButton");
        backButton.setOrigin(0)
        backButton.setInteractive();
        let scale = (this.scene.game.canvas.width * 0.09) / backButton.width
        backButton.setScale(scale)
        backButton.on("pointerdown", () => {
            window.open('', '_self').close()

        })
    }


     createRestartButton() {
        let restartButton = this.scene.add.image(this.scene.game.canvas.width * 0.82, 5, "restartButton");
        restartButton.setOrigin(0);
        let scale = (this.scene.game.canvas.width * 0.078) / restartButton.width
        restartButton.setScale(scale);
        restartButton.setInteractive();
        restartButton.on("pointerdown", () => {
            window.location.reload();
        })
    }

     createSlowDownButton() {
        let slowDownButton = this.scene.add.rectangle(this.scene.game.canvas.width * 0.90, 100, this.scene.game.canvas.width * 0.1, 30, 0xff0000)
        slowDownButton.setInteractive()
        slowDownButton.on("pointerdown", () => {
            this.scene.ballIntervalTime += CONFIG.slowDownButton.slowDownBy
            this.scene.createBallInterval();
        });
    }
}

export default ButtonManager