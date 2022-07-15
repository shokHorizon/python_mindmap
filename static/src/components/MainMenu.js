import { useState, useEffect } from 'react'
import axios from 'axios'

const MainMenu = () => {
    const [canvas, setCanvas] = useState({
        data: [],
        loaded: false,
        placeholder: "Loading"
    });
    
    useEffect(() => {
        console.log(123)
        axios.get("http://localhost:8000/api/getCanvasList")
            .then(response => {
            if (response.status > 400) {
                return setCanvas({ placeholder: "Something went wrong!" });
            }
            })
            .then(data => {
            setCanvas({
                data: data,
                loaded: true,
            });
            });

            return {placeholder: data};
    });


    return(
        <div className='MainMenu'>
           {canvas.placeholder}
           <button onClick={() => setCanvas({placeholder:'Processing'})}></button>
        </div>
    )
}

export default MainMenu
