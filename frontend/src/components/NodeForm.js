import { useState } from "react"

const NodeForm = ({ addNode} ) => {
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        addNode(text);
        setText('');
    }

    return(
        <form onSubmit={(e) => onSubmit(e)}
            className='border w-min flex flex-row'>
            <input type='text' placeholder='Text' onChange={e => {setText(e.target.value)}}
                className='bg-gray-100 py-1 px-2'/>
            <input type='submit' value='Add node'
                className="bg-green-300 py-2 px-2"/>
        </form>
    )
}

export default NodeForm