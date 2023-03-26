import { SourceBlock } from "./SourceBlock"
import { ExecutableBlock } from "./ExecutableBlock"
import { ItemTypes } from "../Constants"
import { useEffect, useState } from "react"

export const ExecutableBlocks = (props) =>{
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [blocks,setBlocks] = useState(props.program)

    useEffect(()=>setBlocks(props.blocks),[props.blocks])
      return(
        <>
        { blocks&&blocks.map(({ name, type }, index) => (
          <ExecutableBlock
            name={name}
            type={type}
            key={index}
            index={index}
            rearrange={props.rearrange}
            draggedIndex={draggedIndex}
            check={props.busy?props.busy:draggedIndex!==null}
            setDragged = {setDraggedIndex}
            isDragged={draggedIndex === index}
          />
        ))}
        </>
      )
}