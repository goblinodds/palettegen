import './Palette.css';
// import ReactSlider from 'react-slider';
import { useState } from 'react';

// TODO
// increase/decrease # of swatches: https://twitter.com/goblincodes/status/1586880288495263744?s=20&t=vhQoNDyIRnvPif-CzAXPgQ
//// minimum 3, max 10?
// select which swatch is the main color (locked)
// manually change color of main swatch
// manually select which swatches are highlight swatches for alternate palettes
// change saturation spread
// change temperature spread
// something that changes value gaps between each!
////// like a checkbox for "consistent value gaps"
////// and if you uncheck it you can change each

// ODDITIES
// make analogous less goofy (often doesn't change by much)
// CURRENT APPLICATION applies the temperature shift ON TOP OF the hue changes for the final palette
////// when you make it interactive try changing this so it locks to the "main" color?

let swatchNum = 7;
let swatchMaximum = 10;
let lockedSwatchIndex = 3;
let currentScheme = 'modified monochrome';

// value must be 0-100 inclusive
// TODO let user input values
let swatches = []

let baseHue = 50;

export default function Palette() {
    //random swatch selector
    // TRY SETTING THE PALETTETYPE USESTATE TO *THE ACTUAL NEW PALETTE*, swatches ???!
    // https://twitter.com/dan_abramov/status/1591254726330359808?s=20&t=m2j8-x-5hOr0Ki79FNk1Hg
    // https://twitter.com/dan_abramov/status/1591255524674502656?s=20&t=m2j8-x-5hOr0Ki79FNk1Hg
    const [palette, setPalette] = useState(swatches);

    // TO GET IT TO RERENDER YOU NEED TO CHANGE THE USESTATE
    // BUT IF IT'S THE SAME STATE HOW DO YOU CHANGE IT??

    paletteReset(baseHue);
    // TODO
    // refactor onClick events
    return (
        <div>
            <div id='Swatches'>
                <div id='Increment'>   
                    <button
                        onClick={function () {
                            addSwatch();
                            setPalette(swatches);
                        }}
                        disabled = {swatches[swatchMaximum-1] ? true : false}
                    >add swatch</button>
                    <button
                        onClick={function () {
                            removeSwatch();
                            setPalette(swatches);
                        }}
                        disabled = {swatches[lockedSwatchIndex+1] ? false : true}
                    >remove swatch</button>
                </div>
                {palette.map((swatch, index) => {
                    let color = `hsl(${swatch.hue}deg ${swatch.saturation}% ${swatch.value}%)`;
                    return (
                        <div key={index}>
                            <div className='Swatch' style={{ background: color }}></div>
                            <div>h: {swatch.hue}</div>
                            <div>s: {swatch.saturation}</div>
                            <div>l: {swatch.value}</div>
                        </div>
                    )
                })}
            </div>
            <div id='Label'>{currentScheme} palette</div>
            <div className='Buttons'>
                <button onClick={function(){
                    baseHue = Math.floor(Math.random()*255);
                    paletteReset(baseHue);
                    setPalette(swatches);
                }}>new monochrome palette</button>
            </div>
            <div className='Buttons'>
                <button onClick={function(){
                    paletteReset(baseHue);
                    setPalette(swatches);
                }}>reset</button>
                <button onClick={function(){
                    analogous();
                    setPalette(swatches);
                }}>analogous</button>
                <button onClick={function(){
                    complementary();
                    setPalette(swatches);
                }}>complementary</button>
                <button onClick={function(){
                    split();
                    setPalette(swatches);
                }}>split complementary</button>
                <button onClick={function(){
                    triadic();
                    setPalette(swatches);
                }}>triadic</button>
                <button onClick={function(){
                    tetradic();
                    setPalette(swatches);
                }}>tetradic</button>
            </div>
        </div>
    )
}

// HELPER FUNCTIONS

// PALETTE RESET
function paletteReset(baseHue) {
    swatches = [
        {
            value: 25
        },
        {
            value: 90
        }
    ]
    
    // step 1: interpolate between 'black' and 'white'
    interpolateValue(swatchNum);
    // step 2: pick a hue out of 359
    newHues(baseHue);
    decreaseSaturation(20);
    temperature(-6);
    currentScheme = 'monochrome (with temperature range)';
}

// ADD/REMOVE SWATCHES

function addSwatch(){
    if (swatches.length < swatchMaximum) {
        swatchNum++;
    }
    paletteReset(baseHue);
}

function removeSwatch(){
    if (swatches.length - 1 > lockedSwatchIndex) {
        swatchNum--;
    }
    paletteReset(baseHue);
}

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
    const increment = Math.round(totalValue / num);

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
function newHues(selectedHue) {
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
function decreaseSaturation(minimum) {

    let first = swatches[0];
    let lastIndex = swatches.length-1
    let last = swatches[lastIndex];
    first.saturation = minimum;
    last.saturation = minimum;

    let firstSet = Math.abs(lockedSwatchIndex);
    let lastSet = Math.abs(lastIndex - lockedSwatchIndex);

    for (let i = 1; i < swatches.length - 1; i++) {
        let current = swatches[i];
        if (i < lockedSwatchIndex) {
            let increment = Math.floor((100 - minimum)/firstSet)
            // evenly spaces saturation between swatches from first to locked
            current.saturation = swatches[i-1].saturation + increment;
        } else if (i > lockedSwatchIndex) {
            let increment = Math.floor((100 - minimum)/lastSet)
            // evenly spaces saturation between swatches from first to locked
            current.saturation = swatches[i-1].saturation - increment;
        }
    }

    // maintains locked swatch at 100 saturation
    swatches[lockedSwatchIndex].saturation = 100;
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
function complementary(){
    let selectedSwatch = swatches[Math.floor(Math.random()*swatchNum)];
    // changes swatch hue to one directly across the color wheel
    selectedSwatch.hue += 180;
    hueCleanup(selectedSwatch);
    currentScheme = 'complementary';
}

//ANALOGOUS
// two swatches that are 60 or fewer degrees out from the standard hue)
function analogous(){
    let selectedSwatchA = swatches[Math.floor(Math.random()*swatchNum)];
    let selectedSwatchB = swatches[Math.floor(Math.random()*swatchNum)];

    // random number that's between 10 to 60-- 10 so you notice, 50 so it's not extreme
    // ideally if swatch is before the locked swatch, add or subtract
    // if swatch is after, do the opposite
    // but this didnt work when i tried it before
    selectedSwatchA.hue += 10 + (Math.floor(Math.random()*50));
    selectedSwatchB.hue -= 10 + (Math.floor(Math.random()*50));
    hueCleanup(selectedSwatchA);
    hueCleanup(selectedSwatchB);
    currentScheme = 'analogous';
}

// SPLIT COMPLEMENTARY
function split(){
    let selectedSwatchA = swatches[Math.floor(Math.random()*swatchNum)];
    let selectedSwatchB = swatches[Math.floor(Math.random()*swatchNum)];
    // changes swatches' hues to two hues 150 degrees away from main color on the color wheel
    selectedSwatchA.hue += 150;
    selectedSwatchB.hue -= 150;
    hueCleanup(selectedSwatchA);
    hueCleanup(selectedSwatchB);
    currentScheme = 'split complementary';
}

// TRIADIC
function triadic(){
    let selectedSwatchA = swatches[Math.floor(Math.random()*swatchNum)];
    let selectedSwatchB = swatches[Math.floor(Math.random()*swatchNum)];
    // changes swatches' hues to two hues 120 degrees away from main color on the color wheel - equidistant
    selectedSwatchA.hue += 120;
    selectedSwatchB.hue -= 120;
    hueCleanup(selectedSwatchA);
    hueCleanup(selectedSwatchB);
    currentScheme = 'triadic';
}

// TETRADIC
function tetradic(){
    let selectedSwatchA = swatches[Math.floor(Math.random()*swatchNum)];
    let selectedSwatchB = swatches[Math.floor(Math.random()*swatchNum)];
    let selectedSwatchC = swatches[Math.floor(Math.random()*swatchNum)];
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