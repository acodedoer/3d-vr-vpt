import { useEffect } from 'react'
import { useDrag,useDrop } from 'react-dnd'
import { ItemTypes } from '../../Constants'
import { state } from "../../State";
import {useSnapshot} from "valtio";



export const ExecutableBlock = ({ active, name, type, setDragged, isDragged,index,check,rearrange, draggedIndex}) => {
    
    const {animateNextLevel, animateFall} = useSnapshot(state);
    const [{isDragging}, drag] = useDrag(() => ({
        type: type,
        item: name,
        collect: monitor => ({
        isDragging: !!monitor.isDragging(),
        })
    }))

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [ItemTypes.FORWARDCODE, ItemTypes.LEFTCODE, ItemTypes.RIGHTCODE, ItemTypes.FORWARD, ItemTypes.LEFT, ItemTypes.RIGHT],
        drop: (i,monitor)=>{
            rearrange(draggedIndex || draggedIndex===0?draggedIndex:monitor.getItemType()+"Code", draggedIndex===null || index <draggedIndex?index+1:index)
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }) 
    })
    const isActive = isOver && canDrop
    
    useEffect(()=>{
        isDragging?setDragged(index):setDragged(null)
    },[isDragging,setDragged])
 
    return (
        !isActive?
        <img src={`assets/images/${name}.png`}
        alt={`a ${name} block`}
        id={`xBlock${index}`}
        ref={!check?drag:isDragged?drag:drop}
        className={`executable-block ${active &&!animateNextLevel &&!animateFall?"animate-block":""}`}
        style={{
          transform:`translate(-${(draggedIndex===null?index+1:draggedIndex<index?index:index+1)*7}px, 0)`,
          fontWeight: 'bold',
          cursor: 'move',
          display:isDragging?"none":"block"
        }}/>:
        <div ref={drop} style={{
            display:'flex',
            transform:`translate(-${(draggedIndex===null?index+1:draggedIndex<index?index:index+1)*7}px, 0)`,
        }}>
            <img className={"executable-block"} src={`assets/images/${name}.png`} alt={`a ${name} block`} />
            <img className={"executable-block"} style={{transform: `translate(-3.5px, 0)`, opacity:0.5}} alt={`a placeholder block`} src={`assets/images/placeholder.png`} />
        </div>
    )
}