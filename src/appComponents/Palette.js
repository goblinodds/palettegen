import './Palette.css';
// import ReactSlider from 'react-slider';
// import { useState } from 'react';

// https://culorijs.org/api/

// TODO
// make a version that's a random palette generator that you can put on your site?
// then work on a version that lets users input options??

// NOTE
// CURRENT APPLICATION applies the temperature shift ON TOP OF the hue changes for the final palette
// when you make it interactive probably change this so it locks to the "main" color

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

// function that randomizes

// LATER VERSIONS
//// increase/decrease # of swatches: https://twitter.com/goblincodes/status/1586880288495263744?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

// mandatory seven swatches, but i'd like to be able to let users change this
let swatchNum = 7;
let lockedSwatchIndex = 3;
let currentScheme = 'modified monochrome';

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

    //random swatch selector
    // didn't bother to make sure it doesn't repeat
    // because we'll be replacing this
    let randomSwatchA = Math.floor(Math.random()*swatchNum);
    let randomSwatchB = Math.floor(Math.random()*swatchNum);
    let randomSwatchC = Math.floor(Math.random()*swatchNum);
    // // COMPLEMENTARY PALETTE
    // complementary(randomSwatchA);
    // // ANALOGOUS PALETTE
    // analogous(randomSwatchA, randomSwatchB);
    // // SPLIT COMPLEMENTARY PALETTE
    // split(randomSwatchA, randomSwatchB);
    // // TRIADIC
    // triadic(randomSwatchA, randomSwatchB);
    //TETRADIC
    tetradic(randomSwatchA, randomSwatchB, randomSwatchC);

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
        hueCleanup(currentSwatch);
    }

}

// STEP 5: OTHER PALETTE TYPES
// lock all values
// lock all swatches
// pick a swatch to unlock everything but VALUE
// change its hue only (possibly do this for multiple swatches)
// probably some way to REFACTOR these so you dont have to keep redefining selectedSwatch

// COMPLEMENTARY
function complementary(swatch){
    let selectedSwatch = swatches[swatch];
    // changes swatch hue to one directly across the color wheel
    selectedSwatch.hue += 180;
    hueCleanup(selectedSwatch);
    currentScheme = 'complementary';
}

//ANALOGOUS
// two swatches that are 60 or fewer degrees out from the standard hue)
function analogous(swatchA, swatchB){
    let selectedSwatchA = swatches[swatchA];
    let selectedSwatchB = swatches[swatchB];

    // random number that's 60 or less
    // but possibly you want it to be at least 10 or you won't notice?
    selectedSwatchA.hue += (Math.floor(Math.random()*60));
    selectedSwatchB.hue -= (Math.floor(Math.random()*60));
    hueCleanup(selectedSwatchA);
    hueCleanup(selectedSwatchB);
    currentScheme = 'analogous';
}

// SPLIT COMPLEMENTARY
function split(swatchA, swatchB){
    let selectedSwatchA = swatches[swatchA];
    let selectedSwatchB = swatches[swatchB];
    // changes swatches' hues to two hues 150 degrees away from main color on the color wheel
    selectedSwatchA.hue += 150;
    selectedSwatchB.hue -= 150;
    hueCleanup(selectedSwatchA);
    hueCleanup(selectedSwatchB);
    currentScheme = 'split complementary';
}

// TRIADIC
function triadic(swatchA, swatchB){
    let selectedSwatchA = swatches[swatchA];
    let selectedSwatchB = swatches[swatchB];
    // changes swatches' hues to two hues 120 degrees away from main color on the color wheel - equidistant
    selectedSwatchA.hue += 120;
    selectedSwatchB.hue -= 120;
    hueCleanup(selectedSwatchA);
    hueCleanup(selectedSwatchB);
    currentScheme = 'triadic';
}

// TETRADIC
function tetradic(swatchA, swatchB, swatchC){
    let selectedSwatchA = swatches[swatchA];
    let selectedSwatchB = swatches[swatchB];
    let selectedSwatchC = swatches[swatchC];
    // changes THREE swatches' hues
    // each 90 degrees from the next
    selectedSwatchA.hue += 90;
    selectedSwatchB.hue += 180;
    selectedSwatchC.hue -= 90;
    hueCleanup(selectedSwatchA);
    hueCleanup(selectedSwatchB);
    currentScheme = 'tetradic';
}

// cleans up #s so they stay within the 0 to 359 inclusive range
function hueCleanup (swatch) {
    if (swatch.hue >= 360) {
        swatch.hue = swatch.hue-360
    } else if (swatch.hue < 0) {
        swatch.hue = swatch.hue+360
    }
}