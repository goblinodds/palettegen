import './Palette.css';
import ReactSlider from 'react-slider';
import { useState } from 'react';
import { formatHex8 } from 'culori';

// https://twitter.com/goblincodes/status/1586878836553453571?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

// https://culorijs.org/api/

// 7 swatches to start with

// LATER VERSIONS
//// increase/decrease # of swatches: https://twitter.com/goblincodes/status/1586880288495263744?s=20&t=vhQoNDyIRnvPif-CzAXPgQ

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

export default function Palette(){
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