import { useEffect, useState, useRef } from 'react'
import './css/calendar-item.css'

const PrintItem = ({ className, openTime, closeTime, duration, startTime, startHour, title, hour, isToday = true, openSlots, totalSlots }) => {
    //hooks
    const ref = useRef()
    const textRef = useRef()
    const [height, setHeight] = useState(0)
    const [textBoxWidth, setTextBoxWidth] = useState(0)
    const [textWidth, setTextWidth] = useState(0)

    // ONLY FOR TEST SERVER
    // const arr = ['solder', 'cnc', 'laser', 'wood', title]
    // const testTitle = arr[Math.floor(Math.random() * arr.length)]
    // ONLY FOR TESR SERVER

    const hoursInDay = closeTime - openTime
    const isSelected = (hour - startHour) >= 0 && (hour - startHour) < duration && isToday
    const doMarquee = textWidth > textBoxWidth

    //update the current epoch every second
    useEffect(() => {
        //get height of reference
        const handleResize = () => {
            setHeight(ref.current.clientHeight)
            setTextBoxWidth(textRef.current.clientWidth)
            setTextWidth(textRef.current.scrollWidth)
        }
        handleResize()
        window.addEventListener("resize", handleResize);
    }, [duration]);

    //return a div with 1 or 2 labels; printID and time remaining
    return (
        <div
            ref={ref}
            className={`${className} calendar-item-main ${isSelected ? "calendar-item-selected" : ""}`}
            style={{
                height: `${duration / hoursInDay * 100}%`,
                top: `${(startHour - openTime) / hoursInDay * 100}%`,
                backgroundColor: getColor(title),
                fontSize: `${height * 0.7}px`
            }}>
            <label className="calendar-item-capacity">
                {totalSlots - openSlots}/{totalSlots}
            </label>

            <div className="calendar-item-title" ref={textRef}>
                <div style={{
                    opacity: 0,
                    position: "absolute"
                }}>
                    {textWidth} &nbsp;{getTitle(title)} very longs pijwejj
                </div>
                
                <div className={doMarquee ? "marquee" : ""} style={{
                    width: `${textWidth-textBoxWidth}px`
                }}>
                    {textWidth} &nbsp;{getTitle(title)} very longs pijwejj
                </div>
            </div>

            {
                isSelected ?
                    <label className="calendar-item-circle" />
                    :
                    <></>
            }
            <label className="calendar-item-time">
                {new Date(startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </label>
        </div>
    )
}

const getColor = (title) => {
    let str = title.toLowerCase()

    if (str.includes("solder"))
        return 'rgb(37, 74, 186)'
    if (str.includes("cnc"))
        return 'rgb(54, 128, 48)'
    if (str.includes("laser"))
        return 'rgb(207, 100, 43)'
    if (str.includes("wood"))
        return 'rgb(92, 27, 33)'
    return 'darkviolet'
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

export default PrintItem