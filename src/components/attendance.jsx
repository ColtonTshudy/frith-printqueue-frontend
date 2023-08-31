import { useState, useEffect, useRef } from 'react'
import './css/attendance.css';

const Capacity = ({ className, students }) => {
    //hooks
    const ref = useRef()
    const [height, setHeight] = useState()

    //get size
    useEffect(() => {
        //get height of reference
        const handleResize = () => {
            setHeight(ref.current.clientHeight)
        }
        handleResize()
        window.addEventListener("resize", handleResize);
    }, []);

    return (
        <div className={className} id="attendance-body" ref={ref} style={{
            fontSize: `${height*0.8}px`,
        }}>
            <label id="attendance-label">
                
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