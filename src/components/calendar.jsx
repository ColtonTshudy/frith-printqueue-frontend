import { useEffect, useState, useRef } from 'react'
import CalendarDay from './calendar-day'
import './css/calendar.css'

const class_old = "course_109922";
const class_old2 = "course_99575";
const class_old3 = "course_121352";
const class_ula = "course_162912";
const class_production = "course_180929";

const class_id = class_old2;

const url1 = "http://localhost:3100/canvas-set"
const url2 = "http://localhost:3100/canvas-get"

const Calendar = ({ className, data }) => {
    // let test = 'black'
    // if(data) {
    //     test = Object.keys(data).length ? 'green' : 'black'
    // }
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState({})
    const ref = useRef();

    useEffect(() => {
        setDate(new Date())
        getAppointments(data, date);
    }, [data])

    return (
        <div className={className} ref={ref} id="calendar-main">
            <CalendarDay className="calendar-day blur" day={date.getDay()} />
            <CalendarDay className="calendar-day calendar-sub blur" day={date.getDay() + 1} />
            <CalendarDay className="calendar-day calendar-sub blur" day={date.getDay() + 2} />
        </div>
    )
}

//returns a dictionary of all the appointments grouped by groupID
const getAppointments = (data, date) => {
    const apptsByGroup = {}
    data.map((d) => {
        if (d.context_codes.includes(class_id))
            if (!(d.id in apptsByGroup))
                apptsByGroup[d.id] = {} //create a new dictionary entry for this id
    })

    //make a list of all the group IDs we just got
    const groupIDs = Object.keys(apptsByGroup)
    const idCount = groupIDs.length

    groupIDs.forEach((id, index) => {
        fetch(url1, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "groupID": id })
        }).then(() => {
            fetch(url2).then(res => {
                return res.json()
            }).then(data => {
                apptsByGroup[id] = data.appointments

                //do this once all appointments have been added
                if (index === idCount - 1) {
                    console.log(apptsByGroup)
                    sortByDays(apptsByGroup, 3, date)
                    return apptsByGroup
                }
            })
        })
    })
}

//returns a dictionary of all meetings belonging to a day
const sortByDays = (data, days, date) => {
    const keys = Object.keys(data);

    keys.forEach((key, index) => {
        console.log(data[key]);
    })

    return 0
}

export default Calendar

//useful API stuff
/*
canvas data, after specifying group id:
data.appointments[0].available_slots: unreserved spots
data.appointments[0].participants_per_appointments: total spots
data.appointments[0].start_at: start time in date object string (east coast?)
data.appointments[0].end_at: end time in date object string (east coast?)

*/