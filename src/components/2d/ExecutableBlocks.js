import { SourceBlock } from "./SourceBlock"
import { ExecutableBlock } from "./ExecutableBlock"
import { ItemTypes } from "../../Constants"
import { useEffect, useState } from "react"
import { setDraggedIndexState } from "../../State"


export const ExecutableBlocks = (props) =>{
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [blocks,setBlocks] = useState(props.program)

    useEffect(()=>{
      setDraggedIndexState(draggedIndex);
    },[draggedIndex])
    
    useEffect(()=>setBlocks(props.blocks),[props.blocks])
      return(
        <>
        <img className={"executable-block"} src={`assets/images/start.png`}/>
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
        <div ref={props.refData} className={"executable-block"} style={{
            transform: `translate(-${(blocks&&blocks.length)*7}px, 0)`,
        }}>
        </div>
        </>
      )
}