import './Palette.css';
import ReactSlider from 'react-slider';
import { useState } from 'react';

// TODO
// set darkest value
// set lightest value
// filterBrightness for value scale (filters in general)

// https://retool.com/blog/building-a-react-slider/

// interpolate: https://culorijs.org/api/
// final: button for (CVD) simulations


// have to make separate sliders
// lift state up to the main thing and have 2 different states?? OR maybe there's another way
// but you cant move props from a child to a parent, so you can't get "currentValue" out the way you want to

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

export default function Palette() {

    const [swatchNum, setSwatchNum] = useState([
    ]);

    const swatchAdd = () => {
        if (swatchNum.length < 10) {
            setSwatchNum([...swatchNum, { color: '#000000'}])
        }
    }

    const swatchRemove = () => {
        if (swatchNum.length > 0) {
            const list = [...swatchNum];
            list.splice(swatchNum.length - 1, 1);
            setSwatchNum(list);
        }
    }

    return (
        <div id='Main'>
            <div className='Options'>

                {/* ADD/SUBTRACT SWATCHES */}
                <button onClick={swatchRemove} style={{opacity: swatchNum.length > 0 ? 100 : 0}}>-</button>
                
                set number of swatches

                <button onClick={swatchAdd} style={{opacity: swatchNum.length < 10 ? 100 : 0}}>+</button>

            </div>

            <div className='Options Values'>
                <div className='slider-control'>
                    <Slider />
                    <button className='value-set'>set maximum value</button>   
                </div>
                <div className='slider-control'>
                    <Slider />
                    <button className='value-set'>set minimum value</button>                
                </div>
            </div>

            <div id='Swatches'>
                {swatchNum.map((swatch, index) => (
                    <div className='Swatch' key={index} style={{ background: swatch.color }}></div>
                ))}
            </div>
        </div>
    )
};


// REFERENCE
/*
const Gig = (props) => {
    return (
        <div className='GigWrapper'>
            <div className='VideoImg'>
                <a href={props.video} target='_blank' rel='noopener noreferrer'>
                    <img src={props.videoImg} alt={props.videoAlt}/> 
                </a>
            </div>
            <div className='TextBox'>
                <h1>ROLE</h1>
                <p>{props.contribution}</p>
                <h1>CLIENT</h1>
                <p><a href={props.clientSite} target='_blank' rel='noopener noreferrer'>{props.client}</a></p>
            </div>
        </div>
    )
}

function Video() {
    return (

        <div className='AllVideos'>
                <iframe src='https://www.youtube.com/embed/savAbVtgtT0' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>
                    Sorry, your browser doesn't support embedded videos.
                </iframe>
            <div className='VideoList'>
                <Gig video={'https://youtu.be/r8IfKcmJR88'}
                videoImg={portfolio_CSOSummer2022}
                videoAlt={'anime-style drawing of Cal State student at home, seated in front of laptop, taking notes at their desk'}
                contribution={'animation / concept'}
                clientSite={'https://www.dentagency.com/'}
                client={'DENT Agency'}/>
            
                <Gig video={'https://youtu.be/VjsvBFznJfo'}
                videoImg={portfolio_BusyBee}
                videoAlt={'cartoon bee wearing glasses checking off boxes on a clipboard as he oversees construction of a beehive; soldier bees lounge on the scaffolding, smoking cigarettes, while childlike drones vandalize the hive with a game of tic-tac-toe'}
                contribution={'animation'}
                clientSite={'https://pacificlegal.org/'}
                client={'Pacific Legal Foundation'}/>

                <Gig video={'https://youtu.be/VUErkf3XEEs'}
                videoImg={portfolio_CalStateActiveShooter}
                videoAlt={'drawing of four students looking at the viewer with determined expressions'}
                contribution={'animation / voiceover'}
                clientSite={'https://www.dentagency.com/'}
                client={'DENT Agency'}/>

                <Gig video={'https://youtube.com/playlist?list=PLNfeyqXaRNagTTdNn-3V2CA1IXGp3dHsj'}
                videoImg={portfolio_LegallySpeaking}
                videoAlt={'drawing of the show host, Lou Perez, dressed as Lady Justice, hairy chest exposed, speaking into a microphone labeled "WTI"'}
                contribution={'illustration'}
                clientSite={'https://www.youtube.com/c/WeTheInternetTV'}
                client={'We The Internet TV'}/>
            </div>
        </div>
    );
}
*/

/*

const images = [visa, petrin, fractal, simler, rowan, meron, tinna, lolly, luta, koylee, mermay, chalion, frippery, ripper]

function Illustration () {

    const [imageToShow, setImageToShow] = useState('');
    const [lightboxDisplay, setLightboxDisplay] = useState(false);

    // CREATE IMAGE CARDS

    const imageCards = images.map((image) => (
        <img className='image-card' alt='thumbnail'
        onClick={() => showImage(image)}
        src={image} /> )
    )

    return (
        <div id='Gallery'>
            {imageCards}
        </div>

    );
}
*/