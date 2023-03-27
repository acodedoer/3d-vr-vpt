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
        isDragging?setDragged(true):setDragged(false)
    },[isDragging,setDragged])

    return (
        <img src={`assets/images/${name}.png`}  
        ref={drag}
        className="source-block"
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontWeight: 'bold',
          cursor: 'move',
        }}/>
    )
}