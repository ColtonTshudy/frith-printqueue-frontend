import { useEffect, useState, useRef } from 'react'
import './css/calendar-item.css'

const PrintItem = ({ className, openTime, closeTime, duration, startTime, startHour, title, hour }) => {
    const hoursInDay = closeTime - openTime

    const ref = useRef()
    const [height, setHeight] = useState(0)

    //update the current epoch every second
    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, [duration]);

    //return a div with 1 or 2 labels; printID and time remaining
    return (
        <div
            ref={ref}
            className="calendar-item"
            style={{
                height: `${duration / hoursInDay * 100}%`,
                top: `${(startHour - openTime) / hoursInDay * 100}%`,
                backgroundColor: (hour - startHour) >= 0 && (hour - startHour) < duration ? 'lime' : getColor(title),
                // fontSize: `${height * 0.7}px`
            }}>
            <label>{title}</label>
            <label>{new Date(startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</label>
        </div>
    )
}

//change the div color based on the task's status and remaining time
const getColor = (title) => {
    const str = title.toLowerCase()
    if (str.includes("solder"))
        return 'beige'
    if (str.includes("cnc"))
        return 'pink'
    if (str.includes("laser"))
        return 'paleturquoise'
    if (str.includes("wood"))
        return 'tan'
    return 'white'
}

//convert seconds to HH:MM:SS
const formatSeconds = (totalSeconds) => {
    let minutes = `${Math.floor(totalSeconds / 60 % 60)}`
    let seconds = `${Math.floor(totalSeconds % 60)}`

    if (minutes.length < 2)
        minutes = `0${minutes}`
    if (seconds.length < 2)
        seconds = `0${seconds}`

    return `${Math.floor(totalSeconds / 60 / 60)}:${minutes}:${seconds}`
}

export default PrintItem