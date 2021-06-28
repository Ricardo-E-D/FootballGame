import Phaser from 'phaser';

import MainScreen from './scenes/MainScreen.js'
import Game from './scenes/Game.js'

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: [MainScreen, Game],
    scale: {mode: Phaser.Scale.FIT}
}

const game = new Phaser.Game(config);


