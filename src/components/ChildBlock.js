import { useDrag } from 'react-dnd'

export const ChildBlock = ({ name, type, isDropped }) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: type,
        item: name,
        collect: monitor => ({
        isDragging: !!monitor.isDragging(),
        })
    }))

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