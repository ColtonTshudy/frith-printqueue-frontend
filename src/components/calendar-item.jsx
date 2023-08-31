import { useEffect, useState, useRef } from 'react'
import './css/calendar-item.css'



const PrintItem = ({ className, openTime, closeTime, duration, startTime, startHour, title, hour }) => {
    // ONLY FOR TEST SERVER
    const arr = ['solder', 'cnc', 'laser', 'wood', title]
    const testTitle = arr[Math.floor(Math.random()*arr.length)]
    // ONLY FOR TESR SERVER
    
    const hoursInDay = closeTime - openTime

    const ref = useRef()
    const [height, setHeight] = useState(0)

    //update the current epoch every second
    useEffect(() => {
        //get height of reference
        const handleResize = () => {
            setHeight(ref.current.clientHeight)
        }
        handleResize()
        window.addEventListener("resize", handleResize);
    }, [duration]);

    //return a div with 1 or 2 labels; printID and time remaining
    return (
        <div
            ref={ref}
            className="calendar-item-main"
            style={{
                height: `${duration / hoursInDay * 100}%`,
                top: `${(startHour - openTime) / hoursInDay * 100}%`,
                backgroundColor: (hour - startHour) >= 0 && (hour - startHour) < duration ? 'lime' : getColor(testTitle),
                fontSize: `${height * 0.7}px`
            }}>
            <label className="calendar-item-title">
                {getTitle(testTitle)}
            </label>
            <label>{new Date(startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</label>
        </div>
    )
}

//change the div color based on the task's status and remaining time
const getColor = (title) => {
    let str = title.toLowerCase()

    let str = title.toLowerCase()

    if (str.includes("solder"))
        return 'beige'
    if (str.includes("cnc"))
        return 'khaki'
    if (str.includes("laser"))
        return 'lightsalmon'
    if (str.includes("wood"))
        return 'tan'
    return 'white'
}

//change the div color based on the task's status and remaining time
const getTitle = (title) => {
    const str = title.toLowerCase()

    if (str.includes("solder"))
        return 'Solder Training'
    if (str.includes("cnc"))
        return 'CNC Training'
    if (str.includes("laser"))
        return 'Laser Cutter Training'
    if (str.includes("wood"))
        return 'Woodshop Training'
    return title
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