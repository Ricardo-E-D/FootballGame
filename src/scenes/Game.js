import Phaser from 'phaser'
import {CST} from '../CST.js'
import ButtonManager from "../Objects/ButtonManager.js"
import LevelManager from "../level/LevelsManager.js";

var windowWidth = window.innerWidth
var windowHeight = window.innerHeight

//TODO create field to input time length

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        });
        this.levelManager = new LevelManager(this);
        this.buttonManager = new ButtonManager(this)
    }

    create() {
        this.createBackgroundImage();
        this.buttonManager.create();
        this.levelManager.create()
    }


    update() {
        this.levelManager.update()
    }

    createBackgroundImage() {
        let image = this.add.image(windowWidth / 2, windowHeight / 2, 'gameBG');
        let scaleX = windowWidth / image.width;
        let scaleY = windowHeight / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);
    }

    slowDownButtonPressed() {
        this.levelManager.slowDownButtonPressed();
    }
}
