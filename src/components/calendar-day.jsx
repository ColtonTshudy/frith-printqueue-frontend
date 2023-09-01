import { useEffect, useState } from 'react'
import CalendarItem from './calendar-item'
import './css/calendar-day.css'

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Calendar = ({ className, dayIndex, trainings, date, openTime, closeTime }) => {
    // console.log(trainings)
    const isToday = dayIndex === date.getDay()

    const [nowHour, setNowHour] = useState() // hour of the day in float form (0 to 24)
    const [durations, setDurations] = useState([])
    const [startHours, setStartHours] = useState([])

    //update the current time every second
    useEffect(() => {
        const durationsArr = []
        const startPercentsArr = []
        trainings.forEach((training) => {
            const start = new Date(training.start_at)
            const end = new Date(training.end_at)

            const startHour = start.getHours() + start.getMinutes() / 60
            const endHour = end.getHours() + end.getMinutes() / 60
            const duration = endHour - startHour

            durationsArr.push(duration)
            startPercentsArr.push(startHour)

            // console.log((startTime - openTime) / closeTime)
        })
        setDurations(durationsArr)
        setStartHours(startPercentsArr)

        //initial set time
        setNowHour((date.getHours() + date.getMinutes() / 60))

        // console.log(durations[0] / hoursInDay)
        // console.log((startHours[0] - openTime) / hoursInDay)
        // console.log((startHours[1] - openTime) / hoursInDay)

    }, [trainings]);

    // console.log(date)
    // console.log(((date.getHours() + date.getMinutes() / 60) - openTime) / closeTime * 100)
    // console.log(clamp((nowHour - openTime) / closeTime * 100, 0, 100))

    return (
        <div className={className}>
            <label className="calendar-day-weekday">{weekday[dayIndex]}</label>
            <div className="seperator" />
            <div className="calendar-day-container" >
                {
                    trainings.length > 0 ?
                        trainings.map((training, index) =>
                            //map each training to its own box in the calendar window
                            <CalendarItem
                                className={isToday ? "calendar-day-item-today" : "calendar-day-item-future"}
                                key={index}
                                openTime={openTime}
                                closeTime={closeTime}
                                duration={durations[index]}
                                startHour={startHours[index]}
                                startTime={training.start_at}
                                title={training.title}
                                hour={nowHour}
                                isToday={isToday}
                                openSlots={training.available_slots}
                                totalSlots={training.participants_per_appointment} />
                        )
                        :
                        <div className="calendar-day-no-trainings">
                            no trainings
                        </div>
                }
                <div className="calendar-day-needle" style={{
                    top: `${clamp((nowHour - openTime) / (closeTime - openTime) * 100, 0, 100)}%`,
                    opacity: isToday ? 1 : 0
                }} />
            </div>
        </div>
    )
}

//clamp value
const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

export default Calendar