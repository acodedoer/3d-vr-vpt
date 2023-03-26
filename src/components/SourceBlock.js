import { useDrag } from 'react-dnd'
import { useEffect } from 'react'

export const SourceBlock = ({ name, type, isDropped, setDragged }) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: type,
        item: name,
        collect: monitor => ({
        isDragging: !!monitor.isDragging(),
        })
    }))

    useEffect(()=>{
        console.log("Dragging Source")
        isDragging?setDragged(true):setDragged(false)
    },[isDragging,setDragged])

    return (
        <div  
        ref={drag}
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