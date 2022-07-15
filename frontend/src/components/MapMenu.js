import axios from "axios"
import { useState, useEffect } from "react"
import NodeForm from './NodeForm.js'
import Node from './Node.js'

const MapMenu = ({ canvasId, canvasName, switchToMain }) => {
    const [canvas, setCanvas] = useState({
        name: canvasName,
        canvasId: canvasId,
        loaded: false,
        selected_node: -1,
    })
    const [nodes, setNodes] = useState([])

    const addNode = (text) => {
        axios.post('http://localhost:8000/api/addNode/', {
            canvas: canvasId,
            text: text,
            pos_x: 0,
            pos_y: 0,
        })
        .then(res => {
            setCanvas({
                ...canvas,
                loaded: false
            })
            return
        })
    };

    const removeNode = (id) => {
        axios.delete('http://localhost:8000/api/deleteNode/'+id)
        .then(res => {
            setCanvas({
                ...canvas,
                loaded: false
            })
            return
        })
    }

    const addLink = (id1, id2) => {
        return(<div></div>)
    }

    const onSelect = (id) =>{
        console.log('onselect', id)
        if(id === -1){
            setCanvas({...canvas, selected_node: -1})
            return
        }
        if(canvas.selected_node === -1){
            setCanvas({...canvas, selected_node: id})
            return
        }
        const selected_node = nodes.find(node => node.id === canvas.selected_node)
        const links_array = (selected_node.links.includes(id) ? Array.from(new Set(selected_node.links).add(id)) : Array.from(new Set(selected_node.links).delete(id)))
        axios.put('http://localhost:8000/api/editNode/'+selected_node.id+'/', {
            canvas: canvasId,
            text: selected_node.text,
            pos_x: selected_node.pos_x,
            pos_y: selected_node.pos_y,
            links: links_array,
        })
        .then(res => {
            setCanvas({
                ...canvas,
                loaded: false
            })
            return true
        })
    }

    const MoveNode = (e) => {
        if(canvas.selected_node === -1) return
        const selected_node = nodes.find(node => node.id === canvas.selected_node)
        axios.put('http://localhost:8000/api/editNode/'+selected_node.id+'/', {
            canvas: canvasId,
            text: selected_node.text,
            pos_x: (e.clientX-400),
            pos_y: (e.clientY-400),
            links: selected_node.links,
        })
        .then(res => {
            setCanvas({
                ...canvas,
                loaded: false
            })
            return true
        })
    }

    useEffect(() => {
        if (canvas.loaded === false){
            axios.get("http://localhost:8000/api/getNodeList/?id="+canvasId)
                .then(res => {
                if (res.status > 400) {
                    return;
                }
                setCanvas({
                    ...canvas,
                    loaded: true,
                });
                setNodes(res.data);
                return
        })};
    });


    return(
        <div>
            <h2 className='text-xl px-5'>{canvas.name}</h2>
            <NodeForm addNode={addNode} />
            <div style={{
                width: '800px',
                height: '800px',
            }}
            onClick={(e) => MoveNode(e)}
            >
                {nodes.map(node => {return(<Node key={node.id} node={node} onSelect={onSelect} />)})}
            </div>
        </div>
    )
}

export default MapMenu