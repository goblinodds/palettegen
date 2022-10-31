import './Palette.css';
import ReactSlider from 'react-slider';
import { useState } from 'react';

// TODO
// set darkest value
// set lightest value

// AFTER figuring out the max and min then you add new swatches that interpolate??

// filterBrightness for value scale (filters in general)

// https://retool.com/blog/building-a-react-slider/

// interpolate: https://culorijs.org/api/
// final: button for (CVD) simulations


// have to make separate sliders
// lift state up to the main thing and have 2 different states?? OR maybe there's another way
// but you cant move props from a child to a parent, so you can't get "currentValue" out the way you want to

// single swatch component
    // if it's index 0 then it doesn't interpolate
    // if it's index array.length - 1 then it doesn't interpolate
    // otherwise it does interpolate by default but can be overridden

const Slider = ({ swatchValue }) => {

    console.log(`rendered swatch value is ${swatchValue}`);

    const [currentValue, setCurrentValue] = useState(swatchValue);

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
            <div className='value-display'>
                {currentValue}
            </div>
        </div>
    )
}

const Swatch = () => {
    return (
        <div>
            <Slider />
            <div className='Swatch'>
            </div>
        </div>
    )
}

export default function Palette() {

    let swatches = [
        {
            value: 100
        },
        {
            value: 0
        }
    ]

    return (
        <div id='Main'>

            <div id='Swatches'>
                {swatches.map((swatch, index) => {
                    console.log(`swatch value is: ${swatch.value}`);
                    return (
                        <Swatch className='Swatch' key={index} swatchValue={swatch.value} />
                    )
                }
                )}
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