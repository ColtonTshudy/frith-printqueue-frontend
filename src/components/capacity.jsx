import { useState, useEffect, useRef } from 'react'
import './css/capacity.css';

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
    const fontHeight = Math.min(width * 0.1, height * 0.8);
    const borderRadius = Math.min(width, height) * 0.3;
    const fillMargin = Math.min(width, height) * 0.05;

    //input conditioning
    const percentage = isNaN(students) ? 0 : 100 * students / max

    //colors
    let barColor = 'white';
    if (percentage > 75) {
        barColor = 'rgb(255,0,0)';
    }

    return (
        <div className={className} id="capacity-body" ref={ref} style={{
            borderRadius: `${borderRadius}px`,
        }}>
            <div id="capacity-fill" style={{
                background: `linear-gradient(to right, ${barColor} ${percentage}%, transparent ${percentage}%)`,
                borderRadius: `${borderRadius * 0.7}px`,
                margin: `${fillMargin}px`,
                height: `calc(100%-${fillMargin})`
            }}>
                <label style={{
                    fontSize: `${fontHeight}px`,
                    lineHeight: `${height}px`,
                    backgroundImage: `linear-gradient(to right, rgb(0,0,0,.9) ${percentage}%, white ${percentage}%)`,
                }}>
                    {students}/{max} Students
                </label>
            </div>
        </div>
    )
};

export default Capacity;