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
    const arr = ['solder', 'cnc', 'laser', 'wood', title]
    const [testTitle, setTestTitle] = useState("")
    // ONLY FOR TESR SERVER

    const hoursInDay = closeTime - openTime
    const isSelected = (hour - startHour) >= 0 && (hour - startHour) < duration && isToday
    const doMarquee = textWidth > textBoxWidth

    //update the current epoch every second
    useEffect(() => {
        //generate random title
        setTestTitle(arr[Math.floor(Math.random() * arr.length)])

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
                backgroundColor: getColor(testTitle, startHour, hour, isSelected),
                fontSize: `${height * 0.7}px`,
                color: getTextColor(startHour, hour)
            }}>
            <label className={"calendar-item-capacity"}>
                {totalSlots - openSlots}/{totalSlots}
            </label>

            <div className="calendar-item-title2" ref={textRef}>

                <div className={doMarquee ? "marquee2" : ""}>
                    &nbsp;{getTitle(testTitle)}
                </div>
                {doMarquee ?
                    <div className={doMarquee ? "marquee3" : "invis"}>
                        &nbsp;{getTitle(testTitle)}
                    </div>
                    :
                    <></>}


                {/* <div style={{
                    position: "absolute",
                    opacity: 0
                }}>
                    &nbsp;{getTitle(testTitle)}
                </div>
                {
                    doMarquee ?
                        <marquee behavior="alternate" scrolldelay={300}>
                            &nbsp;{getTitle(testTitle)}
                        </marquee>
                        :
                        <div>
                            &nbsp;{getTitle(testTitle)}
                        </div>
                } */}

                {/* <div className={doMarquee ? "marquee" : ""} style={{
                    paddingLeft: doMarquee ? `${textBoxWidth}px` : "",
                }}>
                    &nbsp;{getTitle(testTitle)}
                </div> */}
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

// const getColor = (title) => {
//     let str = title.toLowerCase()

//     if (str.includes("solder"))
//         return 'rgb(37, 74, 186)'
//     if (str.includes("cnc"))
//         return 'rgb(54, 128, 48)'
//     if (str.includes("laser"))
//         return 'rgb(207, 100, 43)'
//     if (str.includes("wood"))
//         return 'rgb(92, 27, 33)'
//     return 'darkviolet'
// }

const getColor = (title, startHour, hour, isSelected) => {
    if (isSelected)
        return "rgb(200, 100, 43)"
    if (hour > startHour)
        return "rgb(0,0,0,0.6)"
    return "rgb(92, 27, 33, 0.8)"
}

const getTextColor = (startHour, hour) => {
    if (hour > startHour)
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