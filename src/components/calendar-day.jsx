import { useEffect, useState, useRef } from 'react'
import './css/calendar-day.css'

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Calendar = ({ className, day, data }) => {
    const ref = useRef();

    return (
        <div className={className}>
            <label className="calendar-day-weekday">{weekday[day]}</label>
            <div className="seperator" />
            <div className="calendar-day-container" ref={ref}>
                
            </div>
        </div>
    )
}

export default Calendar