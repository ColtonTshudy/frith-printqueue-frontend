import { useEffect, useState, useRef } from 'react'
import CalendarDay from './calendar-day'
import './css/calendar.css'

const class_old = "course_109922";
const class_old2 = "course_99575";
const class_old3 = "course_121352";
const class_ula = "course_162912";
const class_production = "course_180929";

const class_id = class_ula;

const url = "http://localhost:3100/canvas-get"

const Calendar = ({ className, data }) => {
    // let test = 'black'
    // if(data) {
    //     test = Object.keys(data).length ? 'green' : 'black'
    // }
    const [date, setDate] = useState(new Date());
    const ref = useRef();

    useEffect(() => {
        setDate(new Date())
        getAppointments(data);
    }, [data])

    return (
        <div className={className} ref={ref} id="calendar-main">
            <CalendarDay className="calendar-day blur" day={date.getDay()} />
            <CalendarDay className="calendar-day calendar-sub blur" day={date.getDay() + 1} />
            <CalendarDay className="calendar-day calendar-sub blur" day={date.getDay() + 2} />
        </div>
    )
}

//returns all the appointments grouped by groupID
const getAppointments = (data) => {
    const apptsByGroup = {}
    data.map((d) => {
        if (d.context_codes.includes(class_id))
            if (!(d.id in apptsByGroup))
                fetch(url, { method: "POST" })



        apptsByGroup[d.id] = {
            "title": d.title
        }
    })
    console.log(apptsByGroup)
    return apptsByGroup
}

const getAllAppointments = (groupIDs) => {

}

export default Calendar