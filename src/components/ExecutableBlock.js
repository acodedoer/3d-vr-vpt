import { useEffect } from 'react'
import { useDrag,useDrop } from 'react-dnd'
import { ItemTypes } from '../Constants'

export const ExecutableBlock = ({ name, type, isDropped, setDragged, isDragged,index,check,rearrange, draggedIndex}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: type,
        item: name,
        collect: monitor => ({
        isDragging: !!monitor.isDragging(),
        })
    }))


    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [ItemTypes.FORWARDCODE, ItemTypes.LEFTCODE, ItemTypes.RIGHTCODE, ItemTypes.FORWARD, ItemTypes.LEFT, ItemTypes.RIGHT],
        drop: (i,monitor)=>{rearrange(draggedIndex || draggedIndex===0?draggedIndex:monitor.getItemType()+"Code", index)},
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }) 
    })

    useEffect(()=>{
        isDragging?setDragged(index):setDragged(null)
    },[isDragging,setDragged])

    return (
        <div  
        ref={!check?drag:isDragged?drag:drop}
        className={name.toLowerCase()}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontWeight: 'bold',
          cursor: 'move',
        }}>
        {isDropped ? <s>{name}</s> : name}
        </div>
    )
}