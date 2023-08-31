import { useState, useEffect, useRef } from 'react'
import './css/attendance.css';

const Capacity = ({ className, students }) => {
    //hooks
    const ref = useRef()
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()

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

    //constants
    const fontHeight = Math.min(width * 0.15, height * 0.8);

    return (
        <div className={className} id="attendance-body" ref={ref}>
            <label style={{
                fontSize: `${fontHeight}px`,
            }}>
                {students} {students === 1 ? 'Student' : "Students"}
            </label>
        </div>
    )
};

export default Capacity;