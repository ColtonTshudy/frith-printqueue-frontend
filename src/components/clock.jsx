import { useEffect, useState, useRef } from 'react'
import './css/clock.css'

const Clock = ({ className, data }) => {
    //hooks
    const [date, setDate] = useState(new Date());
    const [height, setHeight] = useState()
    const ref = useRef()

    //constants
    const closeTime = data[date.getDay()] ? data[date.getDay()].close : ''

    //setup
    useEffect(() => {
        setHeight(ref.current.clientHeight)

        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    }, []);

    //render
    return (
        <div className={className} id="clock-main" ref={ref}>
            <label style={{
                fontSize: `${height * 0.5}px`,
            }}>
                {date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </label>
            <label style={{
                fontSize: `${height * .2}px`,
                fontStyle: 'italic'
            }}>
                Closing at {formatTime(closeTime)}
            </label>
        </div >
    )
};

//convert 24 hour integer to HH:MM 12 hour format
const formatTime = (value) => {
    const ampm = value - 12 > 0 ? "PM" : "AM"
    const hours = `${value % 12}`
    let minutes = `${(value * 60) % 60}`

    if (minutes.length < 2)
        minutes = `0${minutes}`

    return `${hours}:${minutes} ${ampm}`
}

export default Clock;