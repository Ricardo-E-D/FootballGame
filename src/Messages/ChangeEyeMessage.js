export default function (scene, callBack) {
    let windowWidth = scene.game.canvas.width;
    let windowHeight = scene.game.canvas.height;

    let endMessageStyle = {font: "35px Arial", fill: "#fff", align: "center"};
    let message = scene.add.text(windowWidth * 0.5, windowHeight * 0.5, "Change eye", endMessageStyle);
    let button = scene.add.text(windowWidth * 0.5, windowHeight * 0.55, "Confirm", endMessageStyle);
    message.setOrigin(0.5);
    button.setOrigin(0.5);
    button.setInteractive();
    button.on("pointerdown", () => callBack());
    button.on("pointerover", () => {
        button.setTint(0xff0000)
    });
    button.on("pointerout", () => {
        button.setTint(0xffffff)
    });
}