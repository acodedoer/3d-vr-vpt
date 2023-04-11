import { SourceBlock } from "./SourceBlock"
import { ExecutableBlock } from "./ExecutableBlock"
import { ItemTypes } from "../../Constants"
import { useEffect, useState } from "react"
import { setDraggedIndexState,state } from "../../State"
import { StartBlock } from "./Start"
import { useSnapshot } from "valtio"



export const ExecutableBlocks = (props) =>{
    const [draggedIndex, setDraggedIndex] = useState(null);
    const {moveState} = useSnapshot(state);
    const [blocks,setBlocks] = useState(props.program)

    useEffect(()=>{
      setDraggedIndexState(draggedIndex);
    },[draggedIndex])
    
    useEffect(()=>setBlocks(props.blocks),[props.blocks])
      return(
        <>
        <StartBlock
           rearrange={props.rearrange}
           draggedIndex={draggedIndex}
        />
        { blocks&&blocks.map(({ name, type }, index) => (
          <ExecutableBlock
            name={name}
            type={type}
            key={index}
            index={index}
            active={index===moveState}
            rearrange={props.rearrange}
            draggedIndex={draggedIndex}
            check={props.busy?props.busy:draggedIndex!==null}
            setDragged = {setDraggedIndex}
            isDragged={draggedIndex === index}
          />
        ))}
        <img ref={props.refData} className={"executable-block"} style={{transform: `translate(${-3.5 -(blocks&&blocks.length)*7}px`, opacity:props.showPlaceholder?0.5:0}} alt={`a placeholder block`} src={`assets/images/placeholder.png`} />
        </>
      )
}