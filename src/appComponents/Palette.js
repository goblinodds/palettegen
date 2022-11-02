import './Palette.css';
// import ReactSlider from 'react-slider';
// import { useState } from 'react';
// import { formatHex8 } from 'culori';

// https://culorijs.org/api/

// BUILD STATIC VERSION

// to pick a color with that value you lock either red, green, or blue, and pick wahtever you want for the other values
// set up functions that do the other steps from this:
// https://twitter.com/goblincodes/status/1586878836553453571?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

// LATER VERSIONS
//// increase/decrease # of swatches: https://twitter.com/goblincodes/status/1586880288495263744?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

// mandatory seven swatches, but i'd like to be able to let users change this
let swatchNum = 7;

// must be 0-100 inclusive
const swatches = [
    {
        value: 20
    },
    {
        value: 100
    }
]

export default function Palette() {
    // step 1: interpolate between 'black' and 'white'
    interpolateValue(swatchNum);
    return (
        <div id='Swatches'>
            {swatches.map((swatch, index) => {
                let color = `hsl(0 0% ${swatch.value}%)`;
                return (
                    <div key={index}>
                        <div className='Swatch' style={{ background: color }}></div>
                    </div>
                )
            })}
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

        console.log(`value: ${currentValue}`);
    };
};

// STEP 2: HUES
// pick 1 swatch
// either R, G, or B must continue to be the same as VALUE
