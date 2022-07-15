import { useState } from "react"

const Node = ({ node, onSelect }) => {
    const [selected, setSelected] = useState(false)

    const onClick = (e) => {
        e.stopPropagation();
        setSelected(!selected)
        if(selected){
            onSelect(-1)
        }
        else{
            const uncolor = onSelect(node.id)
            if(uncolor) setSelected(!selected) 
        }
    }

    return(
        <div className={"Node absolute initial py-5 px-5 w-min h-min rounded "+ (selected ? 'bg-blue-600' : 'bg-blue-300')}
            style={{
                left: (node.pos_x+400)+'px',
                top: (node.pos_y+400)+'px',
            }}
            onClick={(e) => onClick(e)}
            >
            {node.text}
        </div>
    )
}

export default Node