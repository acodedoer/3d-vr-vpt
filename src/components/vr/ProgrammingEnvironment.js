import React, {useEffect, useState} from "react";
import '@react-three/fiber'
import { SourceBlocks } from "./SourceBlocks";
import { ExecutableBlocks } from "./ExecutableBlocks";
import {useSnapshot} from "valtio";
import { setCode, setExecuting, state } from "../../State";
import { Interactive} from '@react-three/xr'


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

const PlayButton = (props) => {

  return(
    <Interactive onSelect={()=>props.onSelect()} onHover={()=>console.log("Hovered")}>
      <mesh scale={[1.5,1.5,0.1]} position={props.position}>
          <boxGeometry/>
          <meshStandardMaterial color={props.color} />
      </mesh>
    </Interactive>
  )
} 

export const ProgrammingEnvironment = (props) => {
  
    const {executing,level} = useSnapshot(state);
    const [code, setLocalCode] = useState([]);
    const[busy, setBusy] = useState(false);
    const[selectedRef, setSelectedRef] = useState(null);
    const initialWidth = 1.4*5 +1.6
    const[dimension, setDimension] = useState({width:initialWidth, left:1})

    const playProgram = () => {
      if(!executing){
        setExecuting(true);
      }
      else{
        setExecuting(false);
      }
    };

    useEffect(()=>{
      setLocalCode([]);
      setExecuting(false);
    },[level])

    useEffect(()=>{
      let newWidth = code.length<5?initialWidth:1.4*code.length +1.6;
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
      setLocalCode();
      setLocalCode(temp)
    }

    
    useEffect(()=>{
      setCode(code)
  },[code])

return(
    <>
        <ExecutablesBoard dimension={dimension} code={code}/>
        <ExecutableBlocks dimension={dimension} setCode={updateCode} selectedBlock={selectedRef} topBusy={busy} code={code}/>
        <PlayButton position={[dimension.width/2 + 0.95,5,-5]} color={executing?"red":"#00aa88"} onSelect={playProgram}/>
        <PlayButton position={[0,0,-5]} color={executing?"red":"#00aa88"} onSelect={playProgram}/>
        <SourceBoard/>
        <SourceBlocks setCode={updateCode} setSelectedRef={setSelectedRef} setTopBusy={setBusy}/>
    </>
)
}