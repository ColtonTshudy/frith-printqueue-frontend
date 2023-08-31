import { useEffect, useState, useRef } from 'react'
import './css/clock.css'

const Clock = ({ className, operatingHours }) => {
    //hooks
    const [date, setDate] = useState(new Date());
    const [height, setHeight] = useState()
    const ref = useRef()

    //get the closing time today and opening time tomorrow
    //for some reason, checking this boolean fixes errors. Comparing to undefined does not work
    const closeTime = operatingHours[date.getDay()] ? operatingHours[date.getDay()].close : ''
    const openTimeTomorrow = operatingHours[date.getDay()] ? operatingHours[(date.getDay()+1)%7].open : ''
    const hourFloat = date.getHours()+date.getMinutes()/60

    //setup
    useEffect(() => {
        //get height of reference
        const handleResize = () => {
            setHeight(ref.current.clientHeight)
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
                fontSize: `${height * 0.5}px`,
                textShadow: "1px 1px 5px black",
            }}>
                {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </label>
            <div className="seperator" />
            <label style={{
                fontSize: `${height * .2}px`,
                fontStyle: 'italic'
            }}>
                {
                    hourFloat < closeTime && hourFloat > openTimeTomorrow ?
                    `Closing at ${formatTime(closeTime)}` :
                    `Opening at ${formatTime(openTimeTomorrow)}`
                }
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