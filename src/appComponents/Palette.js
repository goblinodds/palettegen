import './Palette.css';
// import ReactSlider from 'react-slider';
// import { useState } from 'react';
import { formatHex8 } from 'culori';

// https://culorijs.org/api/

// BUILD STATIC VERSION
// set up functions that do the other steps from this:
// https://twitter.com/goblincodes/status/1586878836553453571?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

// LATER VERSIONS
//// increase/decrease # of swatches: https://twitter.com/goblincodes/status/1586880288495263744?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

// mandatory seven swatches, but i'd like to be able to let users change this
let swatchNum = 7;

const swatches = [
    {
        value: .3
    },
    {
        value: 1
    }
]

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

function culorifyValues(arr) {
    // iterate over array
    for (let i = 0; i < arr.length; i++) {
        // TODO think i can make this generalize by
        // if r, g, and b are in the object already, then multiply r, g, and b by value
        // if not, do the rest of this
        arr[i].r = arr[i].value;
        arr[i].g = arr[i].value;
        arr[i].b = arr[i].value;
    }
};

export default function Palette() {
    interpolateValue(swatchNum);
    culorifyValues(swatches);
    return (
        <div id='Swatches'>
            {swatches.map((swatch, index) => {
                let color = formatHex8(swatch);
                return (
                    <div>
                        <div className='Swatch' key={index} style={{ background: color }}></div>
                    </div>
                )
            })}
        </div>
    )
}