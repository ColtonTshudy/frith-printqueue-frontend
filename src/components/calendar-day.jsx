import { useEffect, useState, useRef } from 'react'
import './css/calendar-day.css'

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const refreshRate = 1 //minutes until needle position refresh

const openTime = 9
const closeTime = 21
const hoursInDay = closeTime - openTime; //total hours in a day

const Calendar = ({ className, day, trainings }) => {
    // console.log(trainings)

    const [now, setNow] = useState(new Date())
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
        setNow(new Date())
        setNowHour((now.getHours() + now.getMinutes() / 60))

        const timer = setInterval(() => {
            setNow(new Date())
            setNowHour((now.getHours() + now.getMinutes() / 60))
        }, 1000 * 60 * refreshRate)
        return function cleanup() {
            clearInterval(timer)
        }
    }, [trainings]);

    // console.log(((now.getHours() + now.getMinutes() / 60) - openTime) / closeTime * 100)
    // console.log(clamp((nowHour - openTime) / closeTime * 100, 0, 100))
    // console.log(now)

    return (
        <div className={className}>
            <label className="calendar-day-weekday">{weekday[day % 7]}</label>
            <div className="seperator" />
            <div className="calendar-day-container">
                {trainings.map((training, index) =>
                    // console.log(index)
                    <div
                        className="calendar-day-training"
                        key={index}
                        style={{
                            height: `calc(100% * ${durations[index] / hoursInDay})`,
                            top: `${(startHours[index] - openTime) / closeTime * 100}%`,
                            backgroundColor: (nowHour - startHours[index]) > 0 && (nowHour - startHours[index])  < durations[index]  ? 'lime' : ''
                        }}>
                        <label>{training.title}</label>
                        <label>{new Date(training.start_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</label>
                    </div>
                )}
                <div className="calendar-day-needle" style={{
                    top: `${clamp((nowHour - openTime) / closeTime * 100, 0, 100)}%`,
                    opacity: day === now.getDay() ? 1 : 0
                }} />
            </div>
        </div>
    )
}

//clamp value
const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

export default Calendar