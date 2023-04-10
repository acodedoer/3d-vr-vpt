import { ExecutableBlock } from "./ExecutableBlock"
import { Start } from "./Start"
export const ExecutableBlocks = (props) => {    
    return(
    <> 
        <ExecutableBlock
            type={"start"} 
            position={[props.dimension.left+0.8,5, -4.95]} 
            scale={[1.2,1.2,0.1]}
            start={true}
            setCode={props.setCode} 
            selectedBlock={props.selectedBlock} 
            busy={props.topBusy} 
            key={-1} 
            index={-1} 
        />
        {
        props.code && props.code.map((block,i)=>(
            <ExecutableBlock 
                code={props.code} 
                setCode={props.setCode} 
                selectedBlock={props.selectedBlock} 
                busy={props.topBusy} 
                key={i} 
                index={i} 
                scale={[1.2,1.2,0.1]} 
                position={[props.dimension.left+0.2+((i+2)*0.6 + ((i+1)*0.6)+((i+1)*0.16)),5, -4.95]} 
                type={block.type}
                color={props.color}
            />
        ))
    }    
    </>
    )
  } 