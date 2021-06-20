import {CST} from "../CST"

export class LoadScreen extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        });
    }

    init() {

    }

    preload()
    {
        this.load.image("menuBG", "./assets/MainMenuBackground.jpg");
        this.load.image("gameBG", "./assets/GameBackground.jpg");
        this.load.image("playButton", "./assets/play_button.png");
        this.load.image("backButton", "./assets/BackButton.png");
        this.load.image("ball", "./assets/ball.jpg")

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.on("progress", (percent) =>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        })
    }

    create()
    {
        this.scene.start(CST.SCENES.MAIN)
    }
}