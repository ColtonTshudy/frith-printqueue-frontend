import { useState, useEffect } from 'react'
import './css/App.css'
import './css/Fonts.css'
import FrithLogo from './components/frith-logo'
import Printing from './components/printing-list'
import Queue from './components/queue-list'
import Key from './components/queue-key'
import Calendar from './components/calendar'
import Capacity from './components/capacity'

import Neco from './assets/neco.png'
import Torgersen from './assets/torgersen.jpg'

const print_api_url = "https://script.googleusercontent.com/macros/echo?user_content_key=3xxxii9SiqLjf4y8b8beO2Pz85leuNmAqOuY6UFGPoOFb9FyoCDHOvO-IBGhKAdKYr4UmgMi0GHfa_PdYSL7Nr32Jhlkj1O-m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnArRAwHSNPPq7pDcoLAwYX40YnK4ybPvpHRuWOigBzEAfcg0a410HiTuEL9yoVdrYy3Nb51WRo9v9edRx1ucKuaUVAEh4jPTgA&lib=MN9JxjBccorYYWxCW5XYinS8iU2Jo7_id"
const refresh_time = 10 //minutes

// For testing
import PrinterData from './assets/dummyprinterdata.json'

function App() {
  const [prints, setPrints] = useState([])
  const [capacity, setCapacity] = useState([])
  const [trainings, setTrainings] = useState([])
  const [closing, setClosing] = useState([])

  const [refresh, setRefresh] = useState(false)

  //fetches from each api every 15 minutes
  useEffect(() => {
    //15 minute refresh timer
    console.log('refreshed')

    const timer = setTimeout(() => {
      setRefresh((oldState) => !oldState)
    }, 1000 * 60 * 5)

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
          setPrints(removeEmpties(data))
        }
      )
      .catch(err => {
        console.log(err)
      })

    //fetch capacity data

    //fetch calendar data

    //reset timer
    return () => {
      clearTimeout(timer)
    }
  }, [refresh])

  return (
    <div className="main-container">

      <img src={Torgersen} className="fullscreen" />

      <div className="left-screen">
        <div className="printer-column">
          <Printing className="printer-printing blur" data={prints} />
        </div>
        <div className="printer-column ">
          <Queue className="printer-queue blur" data={prints} />
          <Key className="printer-key blur" />
          {/* <img src={Neco} /> */}
        </div>
      </div>

      <div className="right-screen">
        {/* <FrithLogo className="frith-logo" /> */}
        <div className="capacity-box blur">
          <Capacity className="capacity" students={25} max={55} />
        </div>
        <Calendar className="calendar" data={trainings} />
      </div>

    </div >
  )
}

const removeEmpties = (arr) => {
  const newArr = arr.filter(dict => Object.keys(dict).length !== 0)
  return newArr
}

export default App
