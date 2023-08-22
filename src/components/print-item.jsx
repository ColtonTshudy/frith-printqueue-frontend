import { useEffect, useState } from 'react'

const PrintItem = ({ className, printID, status, startTime, duration }) => {
  const [epoch, setEpoch] = useState(Number.MAX_VALUE);

  const secondsRemaining = duration * 60 * 60 - (epoch - startTime)
  let timeRemaining = ""

  //check if this print task has an associated time
  if (!isNaN(secondsRemaining)) {
    timeRemaining = formatSeconds(secondsRemaining)
    //empty the string if timer's up
    if (secondsRemaining < 0) {
      timeRemaining = "";
    }
  }

  //update the current epoch every second
  useEffect(() => {
    const timer = setInterval(() => setEpoch(Math.floor(Date.now() / 1000)), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  }, []);

  //return a div with 1 or 2 labels; printID and time remaining
  return (
    <div className={className} style={{
      backgroundColor: getColor(status, timeRemaining),
      margin: "1%",
      padding: "2%",
      borderRadius: '10px',
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <label style={{
      }}>
        {printID}
      </label>
      <label style={{
        fontStyle: "italic",
        opacity: "0.7",
        textAlign: "center",
        fontWeight: "normal",
      }}>
        {timeRemaining}
      </label>
    </div >
  )
}

//change the div color based on the task's status and remaining time
const getColor = (status, time) => {
  switch (status) {
    case "Approved - Waiting for Printer":
      return "cyan"
    case "Requires Approval from MGMT":
      return "magenta"
    case "Approved by MGMT":
      return "cyan"
    case 'Printing':
      if (time <= 0)
        return "lime"
      return "aliceblue"
    case "":
      return "yellow"
    case "Failed - Attempting Re-Print":
      if (time <= 0)
        return "lime"
      return "aliceblue"
    default:
      return "white"
  }
}

//convert seconds to HH:MM:SS
const formatSeconds = (totalSeconds) => {
  let minutes = `${Math.floor(totalSeconds / 60 % 60)}`
  let seconds = `${Math.floor(totalSeconds % 60)}`

  if (minutes.length < 2)
    minutes = `0${minutes}`
  if (seconds.length < 2)
    seconds = `0${seconds}`

  return `${Math.floor(totalSeconds / 60 / 60)}:${minutes}:${seconds}`
}

export default PrintItem