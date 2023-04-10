
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { COLORS, ItemTypes } from '../../Constants'
import { state } from '../../State'
import { snapshot } from 'valtio'
import {IoTrashBin} from 'react-icons/io5'

export const Bin =(props) => {
    const {draggedIndex} = snapshot(state)
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [ItemTypes.FORWARDCODE, ItemTypes.LEFTCODE, ItemTypes.RIGHTCODE],
        drop: (i,monitor)=>{props.remove(draggedIndex)},
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }) 
    })

    return(
        <div ref={drop} style={{width:"70px", height:"70px",display:"flex", alignItems:"center", justifyContent:"center", marginLeft:"20px",border:`2px solid ${COLORS.deleteButton}`}}><IoTrashBin size={45} color='white'/></div>
    )
}