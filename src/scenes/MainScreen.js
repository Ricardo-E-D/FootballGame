import Phaser from 'phaser';
import {CST} from '../CST.js'

export default class MainScreen extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MAIN
        });
    }

    preload() {
        this.load.image("menuBG", "./assets/MainMenuBackground.jpg");
        this.load.image("playButton", "./assets/play_button.png");

        this.load.image("gameBG", "./assets/TrainYourEyesAssets/Just goal.png");
        this.load.image("backButton", "./assets/TrainYourEyesAssets/Exit.png");
        this.load.image("ball", "./assets/TrainYourEyesAssets/BallAktiv 3.png");
        this.load.image("restartButton", "./assets/TrainYourEyesAssets/Restart.png");
        this.load.image("thumbUp", "./assets/TrainYourEyesAssets/ThumbUp.png");

    }

    create() {
        window.localStorage.setItem(CST.EYE.RIGHT.toString(), 10);
        window.localStorage.setItem(CST.EYE.LEFT.toString(), 10);
        this.createBackgroundImage();
        this.createPlayButton();
    }


    createBackgroundImage() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBG')
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
            let lastPlayedLevel = window.localStorage.getItem("SavedLevel");
            let sceneToOpen;
            switch (lastPlayedLevel) {
                case null:
                    sceneToOpen = CST.SCENES.LEVEL_ONE;
                    break;
                case "2":
                    sceneToOpen = CST.SCENES.LEVEL_TWO;
                    break;
                case "3":
                    sceneToOpen = CST.SCENES.LEVEL_THREE;
                    break;
                case "4":
                    sceneToOpen = CST.SCENES.LEVEL_FOUR;
                    break;
                case "5":
                    sceneToOpen = CST.SCENES.LEVEL_FIVE;
                    break;
            }
            this.scene.start(sceneToOpen);
        });
    }
}
