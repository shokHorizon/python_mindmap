import { useState, useEffect } from 'react'
import MenuPosition from './MenuPosition'
import axios from 'axios'
import ApiButton from './ApiButton';

const MainMenu = ({switchToMap}) => {
    const [canvas, setCanvas] = useState({
        data: [],
        loaded: false,
    });
    const [text, setText] = useState('')


    const deleteCanvas = (id) => {
        axios.delete('http://localhost:8000/api/deleteCanvas/'+id+'/')
            .then(res => {
            if (res.status > 400) {
                return;
            }
            setCanvas({
                ...canvas,
                loaded: false
            })
            return
        });
    }

    const addCanvas = (id) => {
        axios.post('http://localhost:8000/api/addCanvas/', {
            name: text,
        })
        .then(res => {
            if(res.status > 400){
                return
            }
            setText('')
            setCanvas({
                ...canvas,
                loaded: false
            })
            return
        })
    }
    
    useEffect(() => {
        if (canvas.loaded === false){
            axios.get("http://localhost:8000/api/getCanvasList ")
                .then(res => {
                if (res.status > 400) {
                    setCanvas({ placeholder: "Something went wrong!" });
                    return;
                }
                (
                    setCanvas({
                        data: res.data,
                        loaded: true,
                    }));
                return
                });
        };
    });


    return(
        <div className='MainMenu py-5'>
           <div>{canvas.data ? canvas.data.map(elem => {
                return(<MenuPosition 
                    key={elem.id} 
                    switchToMap={switchToMap}
                    id={elem.id} 
                    name={elem.name} 
                    func={deleteCanvas}
                    />
                )}) : 'none'}</div>
           <input 
                className='border rounded mx-5'
                type='text' onChange={(e) => {setText(e.target.value)}} />
           <ApiButton id={0} func={addCanvas} char={'+'} />
        </div>
    )
}

export default MainMenu
