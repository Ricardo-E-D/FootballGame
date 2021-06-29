import {CONFIG} from "../../config/config.js";

class Dot
{
    constructor(scene) {
        this.scene = scene;
        this.toGenerateRedDot = false;
        this.dot = null
        this.lastGeneratedTime = null;
        this.waitingForSpaceAfterRedDotGenerated = false;
    }

    createRedDot(ballX, ballY, currentLevel) {
            this.deleteRedDotIfExists()

            let dotX = ballX + (CONFIG.ball.ballSize / 2)
            let dotY = ballY + (CONFIG.ball.ballSize / 2)
            this.dot = this.scene.add.circle(dotX, dotY, currentLevel.dotSize, 0xff0000)
            this.lastGeneratedTime = this.scene.time.now
            this.waitingForSpaceAfterRedDotGenerated = true;
            this.toGenerateRedDot = false;
    }

    deleteRedDotIfExists()
    {
        if (this.dot != null) {
            this.dot.destroy();
            this.dot = null;
        }
    }

}

export default Dot