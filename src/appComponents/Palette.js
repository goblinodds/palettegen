import './Palette.css';
import ReactSlider from 'react-slider';
import { useState } from 'react';
import { formatHex8 } from 'culori';

// https://twitter.com/goblincodes/status/1586878836553453571?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

// https://culorijs.org/api/

// 7 swatches to start with

// LATER VERSIONS
//// increase/decrease # of swatches: https://twitter.com/goblincodes/status/1586880288495263744?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

// mandatory seven swatches, but i'd like to be able to let users change this
let swatchNum = 7;

const swatches = [
    {
        mode: 'rgb',
        r: 0,
        g: 0,
        b: 0,
        alpha: 1
    },
    {
        mode: 'rgb',
        r: 1,
        g: 1,
        b: 1,
        alpha: 1
    }                        
]

let neededSwatches = swatchNum - swatches.length;

// add swatches until you reach the max (swatchNum)
function interpolateValue(num) {
    // black value
    const minValue = swatches[0].r;
    // white value
    const maxValue = swatches[swatches.length-1].r;
    const totalValue = maxValue - minValue;
    // how much to subtract from the value of the next swatch
    const increment = totalValue/num;

    let currentValue = totalValue;

    while (swatches.length < num){

        currentValue = currentValue - increment;

        swatches.splice(1, 0, {
            mode: 'rgb',
            r: currentValue,
            g: currentValue,
            b: currentValue,
            alpha: 1
        });

        console.log(`current value 3: ${currentValue}`);
    };
};

export default function Palette(){
    interpolateValue(swatchNum);
    return (
        <div id='Swatches'>
            {swatches.map((swatch, index) => {
                let color = formatHex8(swatch);
                return (
                    <div className='Swatch' key={index} style={{background: color}}></div>
                )
            })}
        </div>
    )
}