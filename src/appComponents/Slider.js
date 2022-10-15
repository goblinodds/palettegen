import './Slider.css';
import ReactSlider from 'react-slider';
import { useState } from 'react';

const Slider = () => {

    const [currentValue, setCurrentValue] = useState(0)

    return (

        <div>
            {/* values: 1 to 100 */}
            
            <ReactSlider 
                className='slider'
                trackClassName='slider-track'
                thumbClassName='slider-thumb'
                value={currentValue}
                onChange={(value) => setCurrentValue(value)}
            />
        </div>
    )
}

export default Slider;