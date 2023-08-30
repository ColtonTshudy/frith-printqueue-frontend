import { useEffect, useState, useRef } from 'react'
import './css/calendar-day.css'

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Calendar = ({ className, day, trainings }) => {
    const ref = useRef();

    console.log(trainings)

    return (
        <div className={className}>
            <label className="calendar-day-weekday">{weekday[day%7]}</label>
            <div className="seperator" />
            <div className="calendar-day-container" ref={ref}>
                
            </div>
        </div>
    )
}

export default Calendar