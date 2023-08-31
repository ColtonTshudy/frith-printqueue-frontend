import { useEffect, useState, useRef } from 'react'
import './css/calendar-item.css'

const PrintItem = ({ className, openTime, closeTime, duration, startTime, startHour, title, hour, isToday = true, openSlots, totalSlots }) => {
    // ONLY FOR TEST SERVER
    const arr = ['solder', 'cnc', 'laser', 'wood', title]
    const testTitle = arr[Math.floor(Math.random() * arr.length)]
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
                backgroundColor: (hour - startHour) >= 0 && (hour - startHour) < duration && isToday ? 'lime' : getColor(testTitle),
                fontSize: `${height * 0.7}px`
            }}>
            <label className="calendar-item-capacity">
                {totalSlots - openSlots}/{totalSlots}
            </label>
            <label className="calendar-item-title">
                &nbsp;{getTitle(testTitle)}
            </label>
            <label className="calendar-item-time">
                {new Date(startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </label>
        </div>
    )
}

const getColor = (title) => {
    let str = title.toLowerCase()

    if (str.includes("solder"))
        return 'darkblue'
    if (str.includes("cnc"))
        return 'darkgreen'
    if (str.includes("laser"))
        return 'purple'
    if (str.includes("wood"))
        return 'brown'
    return 'violet'
}

const getTitle = (title) => {
    const str = title.toLowerCase()

    if (str.includes("solder"))
        return 'Solder'
    if (str.includes("cnc"))
        return 'CNC'
    if (str.includes("laser"))
        return 'Laser'
    if (str.includes("wood"))
        return 'Woodshop'
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