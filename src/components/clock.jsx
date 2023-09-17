import { useEffect, useState, useRef } from 'react'
import './css/clock.css'

const Clock = ({ className, operatingHours }) => {
    //hooks
    const [date, setDate] = useState(new Date());
    const [height, setHeight] = useState()
    const [width, setWidth] = useState()
    const ref = useRef()

    const hourFloat = date.getHours() + date.getMinutes() / 60
    const fontSize = Math.min(height * 0.5, width * 0.2)
    //get the closing time today and opening time tomorrow
    let closeTime = ""
    let openTimeTomorrow = ""
    try {
        closeTime = parseInt(operatingHours[date.getDay()].close)
        openTimeTomorrow = parseInt(operatingHours[(date.getDay() + 1) % 7].open)
    }
    catch (e) {  }

    //setup
    useEffect(() => {
        //get height of reference
        const handleResize = () => {
            setHeight(ref.current.clientHeight)
            setWidth(ref.current.clientWidth)
        }
        handleResize()
        window.addEventListener("resize", handleResize);

        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    }, []);

    //render
    return (
        <div className={className} id="clock-main" ref={ref}>
            <label style={{
                fontSize: `${fontSize}px`,
                textShadow: "1px 1px 5px black",
            }}>
                {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </label>
            <div className="seperator" />
            <label id="clock-closing" style={{
                fontSize: `${fontSize / 2}px`,
            }}>
                {
                    hourFloat < closeTime && hourFloat > openTimeTomorrow ?
                        `Closing at ${formatTime(closeTime)}` :
                        `Opening at ${formatTime(0)}`
                }
            </label>
        </div >
    )
};

//convert 24 hour integer to HH:MM 12 hour format
const formatTime = (value) => {
    const ampm = value - 12 >= 0 ? "PM" : "AM"
    let hours = `${Math.floor(value % 12)}`
    if (hours === '0') hours = '12'
    let minutes = `${Math.floor((value * 60) % 60)}`

    if (minutes.length < 2)
        minutes = `0${minutes}`

    return `${hours}:${minutes} ${ampm}`
}

export default Clock;