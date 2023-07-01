import { ExecutableBlock } from "./ExecutableBlock"
import { Flex, Box } from '@react-three/flex'
export const ExecutableBlocks = (props) => {    
    return(
        <Flex position={[-5,5,-5]} flexDirection={"row"} justifyContent="center" alignItems="center">
             <Box centerAnchor>
                <ExecutableBlock
                    type={"start"} 
                    scale={[1.2,1.2,0.1]}
                    start={true}
                    setCode={props.setCode} 
                    selectedBlock={props.selectedBlock} 
                    busy={props.topBusy}
                    key={-1} 
                    index={-1} 
                />
            </Box>
        {
        props.code && props.code.map((block,i)=>(
            <Box centerAnchor>
                <ExecutableBlock
                    setLocalCode={props.setLocalCode}
                    code={props.code} 
                    setCode={props.setCode} 
                    selectedBlock={props.selectedBlock} 
                    setSelectedRef={props.setSelectedRef}
                    busy={props.topBusy} 
                    key={i} 
                    index={i} 
                    scale={[1.2,1.2,0.1]} 
                    type={block.type}
                    color={props.color}
                />
            </Box>
        ))
    }    
    </Flex>
    )
  } 