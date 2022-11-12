import './Palette.css';
// import ReactSlider from 'react-slider';
import { useState } from 'react';

// TODO
// make it so when you can click the same palette type button twice
    // try to change paletteType useState to a number?? or something that will actually update the state??
// make analogous less goofy (often doesn't change by much)
// CURRENT APPLICATION applies the temperature shift ON TOP OF the hue changes for the final palette
////// when you make it interactive probably change this so it locks to the "main" color
// something that changes value gaps between each!
////// like a checkbox for "consistent value gaps"
////// and if you uncheck it you can change each
// increase/decrease # of swatches: https://twitter.com/goblincodes/status/1586880288495263744?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

let swatchNum = 7;
let lockedSwatchIndex = 3;
let currentScheme = 'modified monochrome';

// value must be 0-100 inclusive
// TODO let user input values
let swatches = [
    {
        value: 30
    },
    {
        value: 90
    }
]

export default function Palette() {
    //random swatch selector
    // TRY SETTING THE PALETTETYPE USESTATE TO *THE ACTUAL NEW PALETTE*, swatches ???!
    // https://twitter.com/dan_abramov/status/1591254726330359808?s=20&t=m2j8-x-5hOr0Ki79FNk1Hg
    // https://twitter.com/dan_abramov/status/1591255524674502656?s=20&t=m2j8-x-5hOr0Ki79FNk1Hg
    const [paletteType, setPaletteType] = useState('monochrome');
    const [baseHue, setBaseHue] = useState(50);

    // TO GET IT TO RERENDER YOU NEED TO CHANGE THE USESTATE
    // BUT IF IT'S THE SAME STATE HOW DO YOU CHANGE IT??

    paletteReset(baseHue);

    if (paletteType === 'analogous') {
        analogous();
    } else if (paletteType === 'complementary') {
        complementary();
    } else if (paletteType === 'split') {
        split();
    } else if (paletteType === 'triadic') {
        triadic();
    } else if (paletteType === 'tetradic') {
        tetradic();
    } else if (paletteType === 'monochrome') {
        paletteReset(baseHue);
        currentScheme = 'monochrome (with temperature range)'
    }

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
            <div className='Buttons'>
                <button onClick={()=>setBaseHue(Math.random()*255)}>new random palette</button>
            </div>
            <div className='Buttons'>
                <button onClick={()=> setPaletteType('monochrome')}>monochrome</button>
                <button onClick={()=> setPaletteType('analogous')}>analogous</button>
                <button onClick={()=> setPaletteType('complementary')}>complementary</button>
                <button onClick={()=> setPaletteType('split')}>split complementary</button>
                <button onClick={()=> setPaletteType('triadic')}>triadic</button>
                <button onClick={()=> setPaletteType('tetradic')}>tetradic</button>
            </div>
        </div>
    )
}

// HELPER FUNCTIONS

// PALETTE RESET
function paletteReset(baseHue) {
    swatches = [
        {
            value: 30
        },
        {
            value: 90
        }
    ]
    
    // step 1: interpolate between 'black' and 'white'
    interpolateValue(swatchNum);
    // step 2: pick a hue out of 359
    newHues(baseHue);
    decreaseSaturation(28);
    temperature(-12);
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