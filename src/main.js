import Phaser from 'phaser';

import MainScreen from './scenes/MainScreen'
import Game from './scenes/Game'
import { CST } from './CST'
import {LoadScene} from "./scenes/LoadScene";
import {CONFIG} from "../config/config";

const config = {
    width: CONFIG.application.width,
    height: CONFIG.application.height,
    type: Phaser.AUTO,
    scene: [LoadScene, MainScreen, Game]
}

const game = new Phaser.Game(config);
