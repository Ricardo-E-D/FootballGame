import SymbolLevel from "./SymbolLevel";
import {CST} from "../CST";

export default class Level5 extends SymbolLevel
{
    constructor() {
        super(CST.SCENES.LEVEL_FIVE);
    }

    init()
    {
        window.localStorage.setItem("SavedLevel", "5");
        this.createObjects();
        this.create();
        super.setSymbolType(5);
    }

    levelUp()
    {
        this.reset();
    }

}