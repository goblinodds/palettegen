import './Palette.css';
// import ReactSlider from 'react-slider';
// import { useState } from 'react';

// https://culorijs.org/api/

// BUILD STATIC VERSION
// monochrome is default
// analogous - pick a swatch to change the color of
// complimentary - pick a swatch to change the color of
// split complimentary - pick 2?? swatches
// triadic - pick 2?3?? swatches
// tetradic - pick 3?4 swatches??
// thinking these last ones should maybe be random
// https://twitter.com/goblincodes/status/1586878853158342656?s=20&t=CSyVnXYNbcP5RAQEA4i-8A

// something that changes value gaps between each!
// like a checkbox for "consitent value gaps"
// and if you uncheck it you can change each

// tells you what the current type is-- monochrome, etc.

// LATER VERSIONS
//// increase/decrease # of swatches: https://twitter.com/goblincodes/status/1586880288495263744?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

// mandatory seven swatches, but i'd like to be able to let users change this
let swatchNum = 7;
let lockedSwatchIndex = 3;
let currentScheme = 'monochrome';

// must be 0-100 inclusive
// TODO let user input values
const swatches = [
    {
        value: 30
    },
    {
        value: 90
    }
]

export default function Palette() {
    // step 1: interpolate between 'black' and 'white'
    interpolateValue(swatchNum);
    // step 2: pick a hue out of 359
    //TODO let user input hue
    newHue(50);
    decreaseSaturation(28);
    temperature(-12);

    return (
        <div>
            <div id='Swatches'>
                {swatches.map((swatch, index) => {
                    let color = `hsl(${swatch.hue}deg ${swatch.saturation}% ${swatch.value}%)`;
                    return (
                        <div key={index}>
                            <div className='Swatch' style={{ background: color }}></div>
                        </div>
                    )
                })}
            </div>
            <div id='Label'>{currentScheme} palette</div>
        </div>
    )
}

// HELPER FUNCTIONS

// STEP 1: VALUES
// add swatches until you reach the max (swatchNum)
function interpolateValue(num) {
    // 'black' value = value of first object in swatches array
    const minValue = swatches[0].value;
    // 'white' value = value of last object in swatches array
    const maxValue = swatches[swatches.length - 1].value;
    // difference between 'black' and 'white'
    const totalValue = maxValue - minValue;
    // how much to subtract from the value of the next swatch
    const increment = totalValue / num;

    let currentValue = maxValue;

    while (swatches.length < num) {

        currentValue = currentValue - increment;

        swatches.splice(1, 0, {
            value: currentValue
        });

    };
};

// STEP 2: HUES
// apply the same hue to all swatches
function newHue(selectedHue) {
    // iterate over all swatches
    for (let i = 0; i < swatches.length; i++) {
        // add the same hue to each one
        swatches[i].hue = selectedHue;
        swatches[i].saturation = 100;
    }
}

// STEP 3: SATURATION
// TODO let user choose a swatch to lock
// TODO limit range of #s accepted (positive only)
// everything moving outward from it gets less saturated
function decreaseSaturation(increment) {
    for (let i = 0; i < swatches.length; i++) {
        let currentSwatch = swatches[i];
        // number of swatches from current to locked
        let swatchesToIncrement;
        if (i <= lockedSwatchIndex) {
            swatchesToIncrement = lockedSwatchIndex - i;
        } else if (i > lockedSwatchIndex) {
            swatchesToIncrement = i - lockedSwatchIndex;
        }
        // SUBTRACT the increment times however many swatches away from locked the current swatch is
        currentSwatch.saturation = currentSwatch.saturation - (increment*swatchesToIncrement);
    }
}

// STEP 4: TEMPERATURE RANGE
// pick a swatch to lock
// increment accepts negative numbers
// TODO limit the range of #s accepted
function temperature(increment) {
    // iterate over all swatches
    for (let i = 0; i < swatches.length; i++) {
        let currentSwatch = swatches[i];
        // number of swatches from current to locked
        let swatchesToIncrement;
        if (i <= lockedSwatchIndex) {
            swatchesToIncrement = lockedSwatchIndex - i;
            // SUBTRACT the increment times however many swatches away from locked the current swatch is
            currentSwatch.hue = currentSwatch.hue - (increment*swatchesToIncrement);
        } else if (i > lockedSwatchIndex) {
            swatchesToIncrement = i - lockedSwatchIndex;
            // SUBTRACT the increment times however many swatches away from locked the current swatch is
            currentSwatch.hue = currentSwatch.hue + (increment*swatchesToIncrement);
        }

        // cleans up #s so they stay within the 0 to 359 inclusive range
        if (currentSwatch.hue >= 360) {
            currentSwatch.hue = currentSwatch.hue-360
        } else if (currentSwatch.hue < 0) {
            currentSwatch.hue = currentSwatch.hue+360
        }
    }

}