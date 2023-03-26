import { SourceBlock } from "./SourceBlock"
import { ExecutableBlock } from "./ExecutableBlock"
import { ItemTypes } from "../Constants"
import { useEffect, useState } from "react"

export const Blocks = (props) =>{
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [blocks,setBlocks] = useState(props.program?props.blocks:[
        { name: 'Forward', type: ItemTypes.FORWARD },
        { name: 'Right', type: ItemTypes.RIGHT },
        { name: 'Left', type: ItemTypes.LEFT },
      ])

      useEffect(()=>props.program&&setBlocks(props.blocks),[props.blocks])
      return(
        <>
        {
        props.program?
        blocks.map(({ name, type }, index) => (
          <ExecutableBlock
            name={name}
            type={type}
            key={index}
            index={index}
            check={draggedIndex!==null}
            setDragged = {setDraggedIndex}
            isDragged={draggedIndex === index}
          />
        )):
        blocks.map(({ name, type }, index) => (
          <SourceBlock
            name={name}
            type={type}
            key={index}
          />
        ))
      }
        </>
      )
}