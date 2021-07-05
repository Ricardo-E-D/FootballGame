import {CONFIG} from "../../config/config";

//Symbols that are generated for displaying on a ball
var generatedSymbols;

//Boolean that keeps track of whenever the symbols should be displayed on a ball or not.
var toGenerateSymbol;

//Symbol on a ball of type object
var symbol;

//Keep track of symbol that is being read;
var readSymbol;

var options;

const symbols = ['⏰', '☔', '☕', '✋', '♟', '✈', '⛅', '⛪', '🍦', '💧', '📅', '📏', '🔑', '🔥', '🕶', '😃'];

export default class SymbolManager {

    constructor(scene) {
        this.scene = scene;
        toGenerateSymbol = false;
        symbol = null;
        readSymbol = 0;
        options = [];
    }

    //Generates number of symbols. Number is given from CONFIG file.
    generateSymbols(currentLevel) {
        this.resetValues();
        generatedSymbols = [currentLevel.numberOfSymbols]
        for (let i = 0; i < currentLevel.numberOfSymbols; i++) {
            generatedSymbols[i] = this.getRandomSymbols(1);
        }
    }

    getRandomSymbols(noOfSymbols) {
        let answer = [];
        do {
            for (let i = 0; i < noOfSymbols; i++) {
                answer[i] = symbols[Math.floor(Math.random() * symbols.length)];
            }
        }
        while (new Set(answer).size !== answer.length)

        return answer.toString()
    }


    getGeneratedSymbols() {
        return generatedSymbols;
    }

    isToGenerateSymbol() {
        return toGenerateSymbol;
    }

    setToGenerateSymbol(boolean) {
        toGenerateSymbol = boolean;
    }

    //Creates symbol on a ball
    createSymbol(ballX, ballY) {
        let symbolX = ballX + (CONFIG.ball.ballSize / 2);
        let symbolY = ballY + (CONFIG.ball.ballSize / 2);

        console.log(generatedSymbols[readSymbol])

        let style = {font: "35px Arial", fill: "#fff", align: "center"}
        symbol = this.scene.add.text(symbolX, symbolY, generatedSymbols[readSymbol], style)
        symbol.setOrigin(0.5, 0.5);
        readSymbol++;
        toGenerateSymbol = false;
    }

    //Removes symbol from the ball if is on the ball
    removeSymbol() {
        if (symbol != null) {
            symbol.destroy();
            symbol = null;
        }
    }

    //Return boolean representing if there are no more symbols to show.
    noMoreSymbolsLeft() {
        return readSymbol >= generatedSymbols.length;
    }

    getOptions(currentDifficulty) {
        options = []
        do {
            for (let i = 0; i < 3; i++) {
                options[i] = this.getRandomSymbols(currentDifficulty.numberOfSymbols)
            }
            //Last symbols is the correct one.
            options[3] = generatedSymbols.toString();
        }
            //Check for redundant symbols in a set
        while (new Set(options).size !== options.length)

        //Shuffling the options so the order is not the same
        options = this.shuffle(options)
        return options;
    }

    getIndexOfCorrectAnswer() {
        return options.indexOf(generatedSymbols.toString())
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    resetValues() {
        generatedSymbols = [];
        toGenerateSymbol = false;
        symbol = null;
        readSymbol = 0;
        options = [];

    }
}




