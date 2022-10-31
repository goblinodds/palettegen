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
function interpolate(num) {
    while (swatches.length < num){
        console.log(`${swatches.length} / ${swatchNum}`);
        swatches.splice(1, 0, {
            mode: 'rgb',
            r: .5,
            g: .5,
            b: .5,
            alpha: 1
        });
    };
};


export default function Palette(){
    interpolate(swatchNum);
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