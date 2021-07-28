import SymbolLevel from "./SymbolLevel";
import {CST} from "../CST";

export default class Level5 extends SymbolLevel
{
    constructor() {
        super(CST.SCENES.LEVEL_FIVE)
    }

    init()
    {
        this.createObjects();
        super.setSymbolType(5);
        this.create();
    }

    levelUp()
    {
        this.reset();
    }

}