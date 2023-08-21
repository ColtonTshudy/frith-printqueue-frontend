import PrintItem from './print-item'
import './css/printing-list.css'

const Printing = ({ className, data }) => {
  const epoch = Math.floor(Date.now() / 1000)
  const printingArr = []

  data.forEach((d) => {
    if (d.status === "Printing" || d.status === "Failed - Attempting Re-Print")
      printingArr.push(d)
  })
  printingArr.sort((a, b) => a.print_id.substring(7) - b.print_id.substring(7))

  return (
    <div className={className} id="printing-main">
      <label className="shadow">Printing:</label>
      <div className="seperator" />
      {printingArr.map((d) => <PrintItem className="printing-item" key={d.print_id} printID={d.print_id} status={d.status} startTime={d.start_time} duration={d.duration} />)}
    </div>
  )
}

export default Printing