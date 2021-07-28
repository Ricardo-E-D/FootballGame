import {CONFIG} from "../../config/config.js";

var optionButtons;

var spaceButton;

var slowDownButton;

export default class ButtonManager {
    constructor(scene) {
        this.scene = scene;
        optionButtons = [];
    }

    create() {
        // this.createBackButton();
        // this.createRestartButton();
        // this.createSlowDownButton();
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
        slowDownButton = this.scene.add.rectangle(this.scene.game.canvas.width * 0.90, 100, this.scene.game.canvas.width * 0.1, 30, 0xff0000)
        slowDownButton.setInteractive()
        slowDownButton.on("pointerdown", () => {
            this.scene.slowDownButtonPressed();
        });
    }

    displayOptionButtons(options, callback) {
        let buttonsY = this.scene.game.canvas.height * CONFIG.optionButtonsPosition.buttonsY
        let gap = ((1 - (2 * CONFIG.optionButtonsPosition.firstButtonX)) / 3) * this.scene.game.canvas.width

        let style = {font: "35px Arial", fill: "#fff", align: "center"};


        for (let i = 0; i < 4; i++) {
            optionButtons[i] = this.scene.add.text(this.scene.game.canvas.width * CONFIG.optionButtonsPosition.firstButtonX + (gap * i), buttonsY, options[i].replaceAll(',',''), style)
            optionButtons[i].setInteractive()
            optionButtons[i].on("pointerdown", () => callback(i))
        }
    }

    destroyOptionButtons()
    {
        for (let i = 0; i < optionButtons.length; i++) {
            optionButtons[i].destroy();
        }
    }

    createSpaceButton(callBackWhenPressed)
    {
        let windowWidth = this.scene.game.canvas.width;
        let windowHeight = this.scene.game.canvas.height;
        let buttonWidth = windowWidth * CONFIG.space.spaceWidthRatio;
        let buttonHeight = windowHeight * CONFIG.space.spaceHeightRatio;
        let buttonX = windowWidth / 2;

        spaceButton = this.scene.add.rectangle(buttonX, windowHeight * CONFIG.space.spaceHeightMarginRatio, buttonWidth, buttonHeight, 0xff0000);
        spaceButton.setInteractive();
        spaceButton.on("pointerdown", () => {
            callBackWhenPressed();
        });
    }

    removeSpaceButtonListener()
    {
        spaceButton.off('pointerdown');
    }

    disableSlowDownButton()
    {
     slowDownButton.off("pointerdown");
    }

    enableSlowDownButton()
    {
        slowDownButton.on("pointerdown", () => {
            this.scene.slowDownButtonPressed();
        });
    }
}