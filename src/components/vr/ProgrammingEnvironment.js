import React, {useEffect, useState} from "react";
import '@react-three/fiber'
import { SourceBlocks } from "./SourceBlocks";
import { ExecutableBlocks } from "./ExecutableBlocks";


  const SourceBoard = () => {
    return(
        <mesh scale={[4.5,1.5,0.1]} position={[0,3,-5]}>
            <boxGeometry/>
            <meshStandardMaterial color={"skyblue"} />
        </mesh>
    )
  }



const ExecutablesBoard = (props) => {

  return(
      <mesh scale={[props.dimension.width,1.5,0.1]} position={[0,5,-5]}>
          <boxGeometry/>
          <meshStandardMaterial color={"skyblue"} />
      </mesh>
  )
} 

export const ProgrammingEnvironment = (props) => {
    const [code, setCode] = useState([]);
    const[busy, setBusy] = useState(false);
    const[selectedRef, setSelectedRef] = useState(null);
    const[dimension, setDimension] = useState({width:0, left:1})

    useEffect(()=>{
      let newWidth = 1.4*code.length +1.6;
      setDimension({width:newWidth, left:-newWidth/2})
    },[code.length])
    
    const updateCode = (update, index) =>{
      const temp = JSON.parse(JSON.stringify(code));
      if(update===null){
        code.forEach((block,i)=>{
          if(block.color==="white") {
            temp.splice(i,1)
          }}
        )
      }
      else if(update.color==="white"){
        let add = true;
        code.forEach(block=>{
          if(block.color==="white") add = false}
        )
        if(add) temp.splice(index, 0, update)
      }
      else{
        temp.splice(index, 0, update)
      }
      setCode();
      setCode(temp)
    }

return(
    <>
        <ExecutablesBoard dimension={dimension} code={code}/>
        <ExecutableBlocks dimension={dimension} setCode={updateCode} selectedBlock={selectedRef} topBusy={busy} code={code}/>
        <SourceBoard/>
        <SourceBlocks setCode={updateCode} setSelectedRef={setSelectedRef} setTopBusy={setBusy}/>
    </>
)
}