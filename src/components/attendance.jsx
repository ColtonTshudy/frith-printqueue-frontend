import { useState, useEffect, useRef } from 'react'
import './css/attendance.css';

const Capacity = ({ className, data }) => {
    //unpack data
    const students = data.current
    const max = data.max

    //hooks
    const ref = useRef()
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()

    //get size
    useEffect(() => {
        setHeight(ref.current.clientHeight)
        setWidth(ref.current.clientWidth)
    }, [])

    //constants
    const fontHeight = Math.min(width * 0.15, height * 0.8);
    const borderRadius = Math.min(width, height) * 0.3;

    //input conditioning
    const percentage = isNaN(students) ? 0 : 100 * students / max

    //colors
    let barColor = 'white';
    if (percentage > 75) {
        barColor = 'rgb(255,0,0)';
    }

    return (
        <div className={className} id="attendance-body" ref={ref} style={{
            borderRadius: `${borderRadius}px`,
        }}>
            <label style={{
                fontSize: `${fontHeight}px`,
                lineHeight: `${height}px`,
            }}>
                {students} Students
            </label>
        </div>
    )
};

export default Capacity;