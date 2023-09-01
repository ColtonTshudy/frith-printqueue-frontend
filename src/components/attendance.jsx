import { useState, useEffect, useRef } from 'react'
import './css/attendance.css';

const Capacity = ({ className, students }) => {
    //hooks
    const ref = useRef()
    const [height, setHeight] = useState()
    const [width, setWidth] = useState()
    const fontSize = Math.min(height*0.7, width*0.7)

    //get size
    useEffect(() => {
        //get height of reference
        const handleResize = () => {
            setHeight(ref.current.clientHeight)
            setWidth(ref.current.clientWidth)
        }
        handleResize()
        window.addEventListener("resize", handleResize);
    }, []);

    return (
        <div className={className} id="attendance-body" ref={ref} style={{
            fontSize: `${fontSize}px`,
        }}>
            <label style={{
                fontSize: "20%",
                marginBottom: "1%"
            }}>
                Students
            </label>
            <div id="attendance-readout">

                <label id="attendance-number">
                    {students}
                </label>
            </div >
        </div >
    )
};

export default Capacity;