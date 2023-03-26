import { SourceBlock } from "./SourceBlock"
import { ExecutableBlock } from "./ExecutableBlock"
import { ItemTypes } from "../Constants"
import { useEffect, useState } from "react"

export const SourceBlocks = (props) =>{
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [blocks] = useState([
        { name: 'Forward', type: ItemTypes.FORWARD },
        { name: 'Right', type: ItemTypes.RIGHT },
        { name: 'Left', type: ItemTypes.LEFT },
      ])

      useEffect(()=>{
        console.log(draggedIndex)
      },[draggedIndex])

      return(
        <>
        {
        blocks.map(({ name, type }, index) => (
          <SourceBlock
            name={name}
            type={type}
            key={index}
            setDragged = {props.setBusy}
          />
        ))
      }
        </>
      )
}