import {CONFIG} from "../../config/config.js";

var optionButtons;

export default class ButtonManager {
    constructor(scene) {
        this.scene = scene;
        optionButtons = [];
    }

    create() {
    }

    displayOptionButtons(options, callback) {
        let buttonsY = this.scene.game.canvas.height * CONFIG.optionButtonsPosition.buttonsY
        let gap = ((1 - (2 * CONFIG.optionButtonsPosition.firstButtonX)) / 3) * this.scene.game.canvas.width

        let style = {font: "35px Arial", fill: "#fff", align: "center"};


        for (let i = 0; i < 4; i++) {
            optionButtons[i] = this.scene.add.text(this.scene.game.canvas.width * CONFIG.optionButtonsPosition.firstButtonX + (gap * i), buttonsY, options[i].replaceAll(',',''), style)
            optionButtons[i].setInteractive();
            optionButtons[i].on("pointerdown", () => callback(i));
        }
    }

    destroyOptionButtons()
    {
        for (let i = 0; i < optionButtons.length; i++) {
            optionButtons[i].destroy();
        }
    }
}