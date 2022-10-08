import './Palette.css';
import { useState } from 'react';

// probably create an array of objects...
// map makes them appear... uhhh
// https://www.freecodecamp.org/news/how-to-build-a-shopping-list-using-react-hooks-w-starter-code-and-video-walkthrough/

function Swatch() {
    return (
        <div className='Swatch'></div>
    );
}

export default function Palette() {

    const [swatchNum, setSwatchNum] = useState(0);

    function addSwatch() {
        if (swatchNum < 10) {
            setSwatchNum(swatchNum + 1);
        }
    }

    function subSwatch() {
        if (swatchNum > 0) {
            setSwatchNum(swatchNum - 1);
        }
    }

    return (
        <div id='Main'>
            <button onClick={subSwatch}>-</button>
            number of swatches {swatchNum}
            <Swatch />
            <button onClick={addSwatch}>+</button>
        </div>
    )
};