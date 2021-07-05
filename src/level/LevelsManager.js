import Level1 from "./Level1";
import Level2 from "./Level2";


export default class LevelManager
{
    constructor(scene) {
        this.scene = scene;
        this.levels = [];
        this.levels[0] = new Level1(this.scene, this);
        this.levels[1] = new Level2(this.scene, this);

        this.currentLevel = 0;
    }

    create()
    {
        this.levels[this.currentLevel].create()
    }

    update()
    {
        this.levels[this.currentLevel].update()
    }

    levelUp()
    {
        if (this.currentLevel < this.levels.length - 1)
           this.currentLevel++;

        this.create()
    }

    slowDownButtonPressed() {
        this.levels[this.currentLevel].slowDownButtonPressed()
    }
}