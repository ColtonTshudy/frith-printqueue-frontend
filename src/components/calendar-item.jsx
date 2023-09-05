import { useEffect, useState, useRef } from 'react'
import './css/calendar-item.css'

const PrintItem = ({ className, openTime, closeTime, duration, startTime, startHour, title, hour, isToday = true, openSlots, totalSlots }) => {
    //hooks
    const ref = useRef()
    const textRef = useRef()
    const [height, setHeight] = useState(0)
    const [textBoxWidth, setTextBoxWidth] = useState(0)
    const [textWidth, setTextWidth] = useState(0)

    //variables
    const hoursInDay = closeTime - openTime
    const isSelected = (hour - startHour) >= 0 && (hour - startHour) < duration && isToday
    const isOver = hour > (startHour + duration)
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

        //supid fix for forcing program to re-measure box widths *after* mounting
        setTimeout(() => handleResize(), 1000)

    }, [duration, title, openTime]);

    //return a div with 1 or 2 labels; printID and time remaining
    return (
        <div
            ref={ref}
            className={`${className} calendar-item-main`}
            style={{
                height: `${duration / hoursInDay * 100}%`,
                top: `${(startHour - openTime) / hoursInDay * 100}%`,
                backgroundColor: getColor(title, startHour, hour, isSelected, isToday),
                fontSize: `${height * 0.7}px`,
                color: getTextColor(isOver, isToday)
            }}>
            <label className={"calendar-item-capacity"}>
                {totalSlots - openSlots}/{totalSlots}
            </label>

            <div className="calendar-item-title2" ref={textRef}>

                <div className={doMarquee ? "marquee2" : ""}>
                    &nbsp;{getTitle(title)}
                </div>
                {doMarquee ?
                    <div className={doMarquee ? "marquee3" : "invis"}>
                        &nbsp;{getTitle(title)}
                    </div>
                    :
                    <></>}
            </div>
            {/* {
                isSelected ?
                    <label className="calendar-item-circle" />
                    :
                    <></>
            } */}
            <label className="calendar-item-time">
                {isToday ?
                    new Date(startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                    : ""}
            </label>
        </div>
    )
}

const getColor = (title, startHour, hour, isSelected, isToday) => {
    if (!isToday)
        return "rgb(92, 27, 33, 0.8)"
    if (isSelected)
        return "rgb(200, 100, 43)"
    if (hour > startHour)
        return "rgb(0,0,0,0.6)"
    return "rgb(92, 27, 33, 0.8)"
}

const getTextColor = (isOver, isToday) => {
    if (isOver && isToday)
        return "rgb(150,150,150)"
    return "white"
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