import React from "react"

export default function Pad({ clip, volume }){

    const [active, setActive] = React.useState(false)

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
        setActive(true)
        setTimeout(() => setActive(false), 200)
        audioTag.volume = volume
        audioTag.currentTime = 0  
        audioTag.play()  
        display.innerText = clip.id
    }

    return (
        <div className="pad-container">
            <div className={`button drum-pad ${active && "active"}`} onClick={playSound} id={clip.id}>
                <audio className="clip" id={clip.keyTrigger} src={clip.url} />
                {clip.keyTrigger}
            </div>
            <div>
                <p id="display"></p>
            </div>
        </div>
    )
} 