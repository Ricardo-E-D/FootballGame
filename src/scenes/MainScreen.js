import Phaser from 'phaser';
import {CST} from '../CST'

export default class MainScreen extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MAIN
        });
    }

    preload() {

    }

    create() {
        this.createBackgroundImage();
        this.createPlayButton();
    }


    createBackgroundImage() {
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBG')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
    }

    createPlayButton() {
        var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, "playButton");
        playButton.setInteractive();
        playButton.on("pointerover", () => {
            playButton.setTint(0xff0000)
        });
        playButton.on("pointerout", () => {
            playButton.setTint(0xffffff)
        });
        playButton.on("pointerdown", () => {
            this.scene.start(CST.SCENES.GAME)
        })
    }
}
