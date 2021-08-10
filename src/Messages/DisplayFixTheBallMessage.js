export default function DisplayFixTheBallMessage(scene, callback) {
    let windowMidX = scene.game.canvas.width / 2;
    let windowMidY = scene.game.canvas.height / 2;

    let messageStyle = {font: "35px Arial", fill: "#fff", align: "center"};
    let messageText = scene.add.text(windowMidX, windowMidY, "Remember to fixate the ball!", messageStyle)
    messageText.setOrigin(0.5,);
    let time = 3;
    let text = null;
    let interval;

    let textFunction = function () {
        if (time === 0) {
            messageText.destroy();
            text.destroy();
            clearInterval(interval);
            callback();
            return;
        }
        if (text !== null)
            text.destroy();
        text = scene.add.text(windowMidX, windowMidY + 30, "Continuing in " + time + " seconds", messageStyle);
        text.setOrigin(0.5);
        time--;
    }
    textFunction();
    interval = setInterval(() => textFunction(), 1000);
}