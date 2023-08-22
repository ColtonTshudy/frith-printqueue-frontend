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

import Neco from './assets/neco.png'
import Torgersen from './assets/torgersen.jpg'

const print_api_url = "https://script.google.com/macros/s/AKfycbyN22oZdeTkunq8VZRNIK8ehjFLZPHbeikhVhzEqe5L7ZJEzlcMTVXuU5R1KMX714J5/exec"
const refresh_time = 1 //minutes to refresh

// For testing
import PrinterData from './rsc/dummyprinterdata.json'
import HoursData from './rsc/openhours.json'
import CapacityData from './rsc/capacity.json'
import TrainingsData from './rsc/trainings.json'

function App() {
  const [printData, setPrintData] = useState([])
  const [capacityData, setCapacityData] = useState([])
  const [trainingsData, setTrainingsData] = useState([])
  const [hoursData, setHoursData] = useState([])
1

  const [refresh, setRefresh] = useState(false)

  //fetches from each api every X minutes
  useEffect(() => {
    //X minute refresh timer
    const timer = setTimeout(() => {
      setRefresh((oldState) => !oldState)
    }, 1000 * 60 * refresh_time)

    //fetch 3d printer queue data
    // setPrints(removeEmpties(PrinterData)) //dummy data
    fetch(print_api_url).then(res => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!");
      }
      return res.json()
    })
      .then(
        data => {
          setPrintData(removeEmpties(data))
        }
      )
      .catch(err => {
        console.log(err)
      })

    //fetch capacity data
    setCapacityData(CapacityData) //dummy data

    //fetch opening/closing hours data
    setHoursData(HoursData) //dummy data

    //fetch tool training appointments data
    setTrainingsData(TrainingsData) //dummy data

    //reset timer
    return () => {
      clearTimeout(timer)
    }
  }, [refresh])

  return (
    <div className="main-container">

      <img src={Torgersen} className="fullscreen picture-background" />

      <div className="left-screen">
        <div className="printer-column">
          <Printing className="printer-printing blur" data={printData} />
        </div>
        <div className="printer-column">
          <Queue className="printer-queue blur" data={printData} />
          <Key className="printer-key blur" />
          {/* <img src={Neco} /> */}
        </div>
      </div>

      <div className="right-screen">
        {/* <FrithLogo className="frith-logo" /> */}
        <div className="top-box">
          <div className="capacity-box blur">
            <label className="capacity-label">Lab Attendance</label>
            <Attendance className="capacity" data={capacityData} />
          </div>
          <div className="clock-box blur">
            <Clock className="clock" data={hoursData} />
          </div>
        </div>
        <Calendar className="calendar" data={trainingsData} />
      </div>

    </div >
  )
}

const removeEmpties = (arr) => {
  const newArr = arr.filter(dict => Object.keys(dict).length !== 0)
  return newArr
}

export default App
