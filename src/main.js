import Phaser from 'phaser';

import MainScreen from './scenes/MainScreen'
import Game from './scenes/Game'
import {LoadScreen} from "./scenes/LoadScreen";
import {CONFIG} from "../config/config";

const config = {
    width: CONFIG.application.width,
    height: CONFIG.application.height,
    type: Phaser.AUTO,
    scene: [LoadScreen, MainScreen, Game]
}

const game = new Phaser.Game(config);
