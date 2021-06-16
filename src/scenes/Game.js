import Phaser from 'phaser'
import {CST} from '../CST'
import {CONFIG} from '../../config/config.js'

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        });
    }

    init(data) {

    }

    preload() {

    }

    create() {
        this.createBackgroundImage()
        this.createSpaceButton()
        this.createSpaceOnKeyboardListener()
    }

    createBackgroundImage() {
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'gameBG')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
    }

    createSpaceButton() {
        let buttonWidth = CONFIG.application.width * CONFIG.game.spaceWidthRatio
        let buttonHeight = CONFIG.application.height * CONFIG.game.spaceHeightRatio;
        let buttonX = CONFIG.application.width / 2 ;

        let rectangle = this.add.rectangle(buttonX, CONFIG.application.height * CONFIG.game.spaceHeightMarginRatio, buttonWidth, buttonHeight, 0xff0000);
        rectangle.setInteractive();
        rectangle.on("pointerdown", ()=> {this.spacePressed()});
    }

    spacePressed() {
        console.log("Pressed")
    }

    createSpaceOnKeyboardListener() {
      this.input.keyboard.on('keydown-SPACE', ()=> {this.spacePressed()})
    }
}