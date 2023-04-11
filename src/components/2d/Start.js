import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../Constants'

export const StartBlock = ({ index,rearrange, draggedIndex}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [ItemTypes.FORWARDCODE, ItemTypes.LEFTCODE, ItemTypes.RIGHTCODE, ItemTypes.FORWARD, ItemTypes.LEFT, ItemTypes.RIGHT],
        drop: (i,monitor)=>{rearrange(draggedIndex || draggedIndex===0?draggedIndex:monitor.getItemType()+"Code", index)},
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }) 
    })
    const isActive = isOver && canDrop

    return (
        !isActive?
        <img src={`assets/images/start.png`}
        alt={`a start block`}
        id={`xBlocks-1`}
        ref={drop}
        className={"executable-block"}
       />:
        <div ref={drop} style={{
            display:"flex",
            transform: `translate(-${(index+1)*7}px, 0)`,
        }}>
            <img className={"executable-block"} src={`assets/images/start.png`} alt={`a start block`} />
            <img className={"executable-block"} style={{transform: `translate(-3.5px, 0)`, opacity:0.5}} alt={`a placeholder block`} src={`assets/images/placeholder.png`} />
        </div>
    )
}