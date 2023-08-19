import './css/queue-key.css'

const Key = ({ className, data }) => {
    return (
        <div className={className} id="key-main">
            <div className="key-item" style={{backgroundColor: "lime"}}>Finished</div>
            <div className="key-item" style={{backgroundColor: "aliceblue"}}>Printing Now</div>
            <div className="key-item" style={{backgroundColor: "cyan"}}>Approved</div>
            <div className="key-item" style={{backgroundColor: "magenta"}}>Under Review</div>
            <div className="key-item" style={{backgroundColor: "yellow"}}>Needs Approval</div>
        </div>
    )
}

export default Key