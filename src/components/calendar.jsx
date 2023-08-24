import { useEffect, useState, useRef } from 'react'
import CalendarDay from './calendar-day'
import './css/calendar.css'

const class_old = 109922;
const class_ula = 162192;
const class_production = 180929;

const class_id = class_old;

const Calendar = ({ className, data }) => {
    // let test = 'black'
    // if(data) {
    //     test = Object.keys(data).length ? 'green' : 'black'
    // }
    const [date, setDate] = useState(new Date());
    const ref = useRef();

    useEffect(() => {
        setDate(new Date())
    }, [])

    return (
        <div className={className} ref={ref} id="calendar-main">
            <CalendarDay className="calendar-day blur" day={date.getDay()} />
            <CalendarDay className="calendar-day calendar-sub blur" day={date.getDay() + 1} />
            <CalendarDay className="calendar-day calendar-sub blur" day={date.getDay() + 2} />
        </div>
    )
}

const getUniqueTrainingIds = (data) => {
    const unique_training_ids = []
    data.map((d) => {
        if(d.context_codes.includes(class_id)) {
            
        }
    })
}

export default Calendar