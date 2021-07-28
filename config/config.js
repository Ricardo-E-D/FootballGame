
let config = this;
export const CONFIG = {
    "application":
        {
            "timeLength": 10
        },

    "space": {
        "spaceWidthRatio": 0.6,
        "spaceHeightRatio": 0.08,
        "spaceHeightMarginRatio": 0.90,
        "playerResponseTime": 1000
    },

    "ball":
        {
            "ballSize": 100,
            "defaultSpeed": 60000 / 80,
            "speedIncreaseInMilliseconds": 50,
            "speedDecreaseInMilliseconds": 50
        },
    "score": {
        "increase": 10,
        "decrease": 5
    },
    "slowDownButton": {
        "slowDownBy": 100
    },
    "optionButtonsPosition": {
        "buttonsY": 0.85,
        "firstButtonX": 0.3
    },
    "difficulty": {
        //A
        "0": {
            "topSpanY": 0.5,
            "bottomSpanY": 0.51,

            "leftSpanXMin": 0.24,
            "leftSpanXMax": 0.25,

            "rightSpanXMin": 0.74,
            "rightSpanXMax": 0.75,

            "dotSize": 10,

            "lowerIntervalLimit": 599,
            "upperIntervalLimit": 1200,

            "numberOfSymbols": 1
        },

        //B
        "1": {
            "topSpanY": 0.45,
            "bottomSpanY": 0.55,

            "leftSpanXMin": 0.24,
            "leftSpanXMax": 0.25,

            "rightSpanXMin": 0.74,
            "rightSpanXMax": 0.75,

            "dotSize": 9,
            "lowerIntervalLimit": 501,
            "upperIntervalLimit": 600,

            "numberOfSymbols": 1
        },

        //C
        "2": {
            "topSpanY": 0.45,
            "bottomSpanY": 0.55,

            "leftSpanXMin": 0.20,
            "leftSpanXMax": 0.30,

            "rightSpanXMin": 0.70,
            "rightSpanXMax": 0.80,

            "dotSize": 8,
            "lowerIntervalLimit": 429,
            "upperIntervalLimit": 500,

            "numberOfSymbols": 2
        },

        //D
        "3": {
            "topSpanY": 0.40,
            "bottomSpanY": 0.60,

            "leftSpanXMin": 0.20,
            "leftSpanXMax": 0.30,

            "rightSpanXMin": 0.70,
            "rightSpanXMax": 0.80,

            "dotSize": 7,
            "lowerIntervalLimit": 376,
            "upperIntervalLimit": 428,

            "numberOfSymbols": 2
        },

        //E
        "4": {
            "topSpanY": 0.40,
            "bottomSpanY": 0.60,

            "leftSpanXMin": 0.15,
            "leftSpanXMax": 0.35,

            "rightSpanXMin": 0.65,
            "rightSpanXMax": 0.85,

            "dotSize": 6,
            "lowerIntervalLimit": 334,
            "upperIntervalLimit": 375,

            "numberOfSymbols": 3
        },

        //F
        "5": {
            "topSpanY": 0.35,
            "bottomSpanY": 0.65,

            "leftSpanXMin": 0.15,
            "leftSpanXMax": 0.35,

            "rightSpanXMin": 0.65,
            "rightSpanXMax": 0.85,

            "dotSize": 5,
            "lowerIntervalLimit": 301,
            "upperIntervalLimit": 333,

            "numberOfSymbols": 3
        },

        //G
        "6": {
            "topSpanY": 0.35,
            "bottomSpanY": 0.65,

            "leftSpanXMin": 0.10,
            "leftSpanXMax": 0.40,

            "rightSpanXMin": 0.60,
            "rightSpanXMax": 0.90,

            "dotSize": 5,
            "lowerIntervalLimit": 273,
            "upperIntervalLimit": 300,

            "numberOfSymbols": 4
        },

        //H
        "7": {
            "topSpanY": 0.30,
            "bottomSpanY": 0.70,

            "leftSpanXMin": 0.10,
            "leftSpanXMax": 0.40,

            "rightSpanXMin": 0.60,
            "rightSpanXMax": 0.90,

            "dotSize": 5,
            "lowerIntervalLimit": 0,
            "upperIntervalLimit": 372,

            "numberOfSymbols": 4
        }
    }
}