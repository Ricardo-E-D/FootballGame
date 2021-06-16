import Phaser from 'phaser'
import { CST } from '../CST'
import {CONFIG} from '../../config/config.js'

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key : CST.SCENES.GAME
        });
    }

    init(data){

    }

    preload() {
    }

    create() {
        this.createBackgroundImage()
        this.createSpaceButton()
    }

    createBackgroundImage() {
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'gameBG')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
    }

    createSpaceButton() {
        let buttonWidth = CONFIG.application.width * CONFIG.game.spaceHeightRatio
        let buttonHeight = CONFIG.application.height * CONFIG.game.spaceHeightRatio;
        let button = this.add.rectangle(100,100,buttonWidth, buttonHeight, 0xffffff)
    }
}