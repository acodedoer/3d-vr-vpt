import { useEffect } from 'react'
import { useDrag,useDrop } from 'react-dnd'
import { ItemTypes } from '../../Constants'

export const ExecutableBlock = ({ name, type, setDragged, isDragged,index,check,rearrange, draggedIndex}) => {
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
        className={"executable-block"}
        style={{
          transform: `translate(-${(index+1)*7}px, 0)`,
          opacity: isDragging ? 0.5 : 1,
          fontWeight: 'bold',
          cursor: 'move',
        }}/>:
        <div ref={drop} style={{
            display:"flex",
            transform: `translate(-${(index+1)*7}px, 0)`,
        }}>
            <img className={"executable-block"} src={`assets/images/${name}.png`} alt={`a ${name} block`} />
            <img className={"executable-block"} style={{transform: `translate(-3.5px, 0)`, opacity:0.5}} alt={`a placeholder block`} src={`assets/images/placeholder.png`} />
        </div>
    )
}