/*
TODO
- Add big "CLOSING IN X MINUTES" over schedule 15 from closing
- Figure out why times before 12PM mess up the clock string: "open time 0:00"
*/

import { useState, useEffect } from 'react'
import './css/App.css'
import './css/Fonts.css'
import FrithLogo from './components/frith-logo'
import Printing from './components/printing-list'
import Queue from './components/queue-list'
import Key from './components/queue-key'
import Calendar from './components/calendar'
import Capacity from './components/capacity'
import Attendance from './components/attendance'
import Clock from './components/clock'

import Torgersen2 from './assets/p1840383511.jpg'
import WifiError from './assets/wifierror.png'

const refresh_time = 1 //minutes to refresh

//for testing
// import PrinterData from './rsc/dummyprinterdata.json'
// import HoursData from './rsc/openhours.json'
// import CapacityData from './rsc/capacity.json'
// import TrainingsData from './rsc/trainings.json'

function App() {
  const [printData, setPrintData] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [trainingsData, setTrainingsData] = useState([])
  const [hoursData, setHoursData] = useState([])
  const [date, setDate] = useState(new Date())
  const [errors, setErrors] = useState({
    print: false,
    attendance: false,
    trainings: false,
    hours: false,
  })

  const [refresh, setRefresh] = useState(false)

  //fetches from each api every X minutes
  useEffect(() => {
    //X minute refresh timer
    const timer = setTimeout(() => {
      setRefresh((oldState) => !oldState)
    }, 1000 * 60 * refresh_time)

    //fetch 3d printer queue data
    // setPrints(removeEmpties(PrinterData)) //dummy data
    fetch("http://localhost:3100/printer").then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!");
      }
      return res.json()
    }).then(data => {
      setPrintData(removeEmpties(data))
      setErrors({ ...errors, print: false })
    }).catch(err => {
      setErrors({ ...errors, print: true })
    })

    //fetch capacity data
    // setCapacityData(CapacityData) //dummy data
    fetch("http://localhost:3100/attendance").then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!");
      }
      return res.json()
    }).then(data => {
      setAttendanceData(data)
      setErrors({ ...errors, attendance: false })
    }).catch(err => {
      setErrors({ ...errors, attendance: true })
    })

    //fetch opening/closing hours data
    // setHoursData(HoursData) //dummy data
    fetch("http://localhost:3100/open-hours").then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!");
      }
      return res.json()
    }).then(data => {
      setHoursData(data)
      setErrors({ ...errors, hours: false })
    }).catch(err => {
      setErrors({ ...errors, hours: true })
    })

    //fetch tool training appointments data
    // setTrainingsData(TrainingsData) //dummy data
    fetch("http://localhost:3100/canvas-all").then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!");
      }
      return res.json()
    }).then(data => {
      setTrainingsData(data)
      setErrors({ ...errors, trainings: false })
    }).catch(err => {
      setErrors({ ...errors, trainings: true })
    })

    setDate(new Date())

    //reset timer
    return () => {
      clearTimeout(timer)
    }
  }, [refresh])

  return (
    <div className="main-container">
      {/* <FrithLogo className="frith-logo" /> */}

      {/* <img src={Torgersen} className="fullscreen picture-background" /> */}
      <img src={Torgersen2} className="fullscreen picture-background" />
      {
        date.getHours() === 0 && date.getMinutes() < 3 ?
          <div className="fullscreen youtube">
            <iframe className="youtube" src="https://www.youtube.com/embed/4LMjbWDYsGs?si=-yHWly8StYjeS8KN&autoplay=1&mute=1&loop=1&playsinline=1&controls=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
          :
          <></>
      }

      <div className="left-screen">
        <div className="printer-column">
          <Printing className="printer-printing blur" data={printData} />
        </div>
        <div className="printer-column">
          <Queue className="printer-queue blur" data={printData} />
          <Key className="printer-key blur" />
        </div>
      </div>

      <div className="right-screen">
        <div className="top-right-box blur">
          <Attendance className="capacity" students={attendanceData.data} max={55} />
          <Clock className="clock" operatingHours={hoursData} />
        </div>
        <Calendar className="calendar" data={trainingsData} date={date} operatingHours={hoursData} />
      </div>

      {
        allFalse(errors) ?
          <img className="wifi-error" src={WifiError} />
          :
          <></>
      }

    </div >
  )
}

const removeEmpties = (arr) => {
  const newArr = arr.filter(dict => Object.keys(dict).length !== 0)
  return newArr
}

const allFalse = (dict) => {
  for (const [key, value] of Object.entries(dict)) {
    if (value === true) return true
  }
  return false
}

export default App
