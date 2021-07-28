export default function EndLevelMessage(scene, level, callback) {
    let windowWidth = scene.game.canvas.width;
    let windowHeight = scene.game.canvas.height;

    let endMessageStyle = {font: "35px Arial", fill: "#fff", align: "center"};
    let image = scene.add.image(windowWidth * 0.47, windowHeight * 0.6, "thumbUp");
    image.setInteractive();
    image.setOrigin(0);
    image.setScale(0.1);

    let time = 5;
    let text = null;

    let textFunction = function () {
        if (time === 0)
            callback();
        if (text !== null)
            text.destroy();
        text = scene.add.text(windowWidth / 2 - 300, windowHeight / 2, "Congratulation - you have passed level " + level + ",\n next level starts in " + time + " seconds", endMessageStyle);
        time--;
    }
    textFunction();
    setInterval(() => textFunction(), 1000);

}