import PrintItem from './print-item'
import './css/queue-list.css'

const MAX_ITEMS = 14

const Queue = ({ className, data }) => {
  let queueArr = []

  data.forEach((d) => {
    if (d.status !== "Printing" && d.status !== "Failed - Attempting Re-Print")
      queueArr.push(d)
  })

  try {
    queueArr.sort((a, b) => a.print_id.substring(7) - b.print_id.substring(7))
  }
  catch (error) {
  }

  const totalItems = queueArr.length

  if (totalItems > MAX_ITEMS) {
    queueArr = queueArr.slice(0, MAX_ITEMS)
  }

  return (
    <div className={className} id="queue-main">
      <label className="shadow">In Queue:</label>
      <div className="seperator" />
      {queueArr.map((d) => <PrintItem className="queue-item" key={d.print_id} printID={d.print_id} status={d.status} startTime={d.start_time} duration={d.duration} />)}
      {totalItems > MAX_ITEMS ? <label id="queue-comment" className="shadow">...and {totalItems - MAX_ITEMS} more</label> : <></>}
    </div>
  )
}

export default Queue