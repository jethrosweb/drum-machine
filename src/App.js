import React from "react"
import "./App.scss"
import image from "./boombox.png"

const drumBank = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];

export default function App() {

    const [volume, setVolume] = React.useState(1)

    const changeVolume = (event) => {
        setVolume(event.target.value)
    }

    const sounds = drumBank.map((sound) => {
        return "<div>" + sound.keyTrigger + "</div>"
    })

    console.log(sounds)

    return (
        <div className="container">
            <div id="drum-machine">
                <div className="drum-pads">
                    {drumBank.map((clip) => (
                        <Pad key={clip.id} clip={clip} volume={volume} />
                    ))}
                </div>
                <div className="drum-screen">
                    <img src={image} className="image" />    
                    <p id="display">Make music!</p>
                    <div>
                        <h4 className="volume-title">Volume</h4>
                        <input className="volume-scroll" type="range" step="0.01" value={volume} max="1" min="0" onChange={changeVolume} />
                    </div>
                </div>
            </div>
        </div>

    )
}

function Pad({ clip, volume }){

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    const handleKeyPress = (event) => {
        if (event.keyCode === clip.keyCode) {
            playSound();
        }
    }

    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger)
        const display = document.getElementById("display")
        const output = clip.id.replace(/-/g, ' ')
        audioTag.volume = volume
        audioTag.currentTime = 0  
        audioTag.play()  
        display.innerText = output
    }

    return (
        <div className="drum-pad" onClick={playSound} id={clip.id}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </div>
    )
}