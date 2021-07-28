import {CONFIG} from "../../config/config";

var ballInterval;
var ballIntervalTime;
var ballCB;

var symbolInterval;
var symbolCB;

var playerResponseTimeout;
var playerResponseCB;
var playerResponseTime;
export default class IntervalManager {
    constructor() {
        ballIntervalTime = CONFIG.ball.defaultSpeed;
        playerResponseTime = CONFIG.space.playerResponseTime;
    }

    createBallInterval() {
        clearInterval(ballInterval);
        ballInterval = setInterval(() => ballCB(), ballIntervalTime);
    }

    createSymbolInterval() {
        let time = this.randomNumber(3000, 6000)
        clearInterval(symbolInterval);
        symbolInterval = setInterval(() => symbolCB(), time)
    }

    createPlayerResponseTimeout()
    {
        playerResponseTimeout = setTimeout(() => playerResponseCB(), playerResponseTime)
    }

    reset() {
        clearInterval(ballInterval);
        clearInterval(symbolInterval);
        clearTimeout(playerResponseTimeout);
        ballIntervalTime = CONFIG.ball.defaultSpeed;
        playerResponseTime = CONFIG.space.playerResponseTime;
    }

    clearPlayerResponseTimeout()
    {
        clearTimeout(playerResponseTimeout);
    }

    slowDownButtonPressed() {
        ballIntervalTime += CONFIG.slowDownButton.slowDownBy
        this.createBallInterval()
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    setBallIntervalTime(time) {
        ballIntervalTime = time;
    }

    setBallCallback(callback) {
        ballCB = callback;
    }

    setPlayerResponseCallback(callback)
    {
        playerResponseCB = callback;
    }

    setSymbolCallback(callback) {
        symbolCB = callback;
    }

    getBallIntervalTime() {
        return ballIntervalTime;
    }

    resetBallIntervalSpeed() {
        ballIntervalTime = CONFIG.ball.defaultSpeed;
    }

    increaseBallIntervalSpeed() {
        if (ballIntervalTime > 250)
            ballIntervalTime -= CONFIG.ball.speedDecreaseInMilliseconds;
    }

    decreaseBallIntervalSpeed() {
        if (ballIntervalTime < 1250)
            ballIntervalTime += CONFIG.ball.speedIncreaseInMilliseconds
    }
}