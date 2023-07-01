import React, {useEffect, useState} from "react";
import '@react-three/fiber'
import { SourceBlocks } from "./SourceBlocks";
import { ExecutableBlocks } from "./ExecutableBlocks";
import {useSnapshot} from "valtio";
import { setCode, setExecuting, state } from "../../State";
import { Interactive} from '@react-three/xr'
import { useLoader } from '@react-three/fiber'
import { Decal } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

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


function Sticker({ url, ...props }) {

  const image = useLoader(TextureLoader, url)
  return (
    <Decal {...props}>
      <meshStandardMaterial
        transparent
        polygonOffset
        polygonOffsetFactor={-10}
        map={image}
        map-flipY={false}
        map-anisotropy={16}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        roughness={1}
        clearcoat={0.5}
        metalness={0.75}
        toneMapped={false}
      />
    </Decal>
  )
}

const PlayButton = (props) => {
  const {executing} = useSnapshot(state)
  return(
    <Interactive onSelect={()=>props.onSelect()}>
      <mesh scale={[1.5,1.5,0.1]} position={props.position}>
          <boxGeometry/>
          <meshStandardMaterial color={props.color}/>
         <Sticker url={`assets/images/${executing?"stop":"play"}.png`} rotation={[0,0,0]} scale={[0.5,0.5,0.5]}position={[0, 0, 0.5]}/>
      </mesh>
    </Interactive>
  )
} 

export const ProgrammingEnvironment = (props) => {
  
    const {executing,level} = useSnapshot(state);
    const [code, setLocalCode] = useState([{type:"Forward", color:"blue"}]);
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
      setLocalCode([{type:"Forward", color:"blue"}]);
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
      console.log(code)
      setCode(code)
      setExecuting(false)
  },[code])

return(
    <>
        <ExecutablesBoard dimension={dimension} code={code}/>
        <ExecutableBlocks setLocalCode={setLocalCode} dimension={dimension} setCode={updateCode} setSelectedRef={setSelectedRef} selectedBlock={selectedRef} topBusy={busy} code={code}/>
        <PlayButton position={[dimension.width/2 + 0.95,5,-5]} color={executing?"red":"#00aa88"} onSelect={playProgram}/>
        <SourceBoard/>
        <SourceBlocks setCode={updateCode} setSelectedRef={setSelectedRef} setTopBusy={setBusy}/>
    </>
)
}

useLoader.preload(TextureLoader,["assets/images/stop.png","assets/images/play.png"])