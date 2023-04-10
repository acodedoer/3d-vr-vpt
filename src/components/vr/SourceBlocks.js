import { useState } from "react";
import { SourceBlock } from "./SourceBlock";

export const SourceBlocks = (props) => {
    const [busy, setBusy] = useState(false);
    const [blocks] = useState([
        { type: 'Forward', color: "DodgerBlue" },
        { type: 'Right', color: "darkorange" },
        { type: 'Left', color: "darkorange" },
      ])
    return(
        <>
          {
            blocks.map((block,i)=> (
              <SourceBlock key={i} busy={busy} setCode={props.setCode} setSelectedRef={props.setSelectedRef} setTopBusy= {props.setTopBusy} setBusy={setBusy} scale={[1.2,1.2,0.1]} position={[i-1===0?0:(i-1)*1.2 +(0.2/(i-1)), 3, -4.95]} color={block.color} type={block.type}/>))
          }
        </>
    )
}