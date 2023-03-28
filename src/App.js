import React, { useEffect, useRef, useState } from "react";
import { Box } from '@react-three/drei'
import { ItemTypes } from "./Constants";
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import "./App.css"
import { OrbitControls,OrthographicCamera, useSelect  } from "@react-three/drei";
import { VRButton, ARButton,useHitTest, XR, Controllers, Hands } from '@react-three/xr'
import Player from "./components/Player";

import { Pickup } from "./components/Pickup";
import { Level } from "./components/Level";
import { ExecutableBlocks } from "./components/ExecutableBlocks";
import { SourceBlocks } from "./components/SourceBlocks";
import { ChildBlock } from "./components/SourceBlock";

const Area = (props) => {
  const [program, setProgram] = useState([]);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.FORWARD, ItemTypes.LEFT, ItemTypes.RIGHT],
    drop: (i,monitor)=>{setProgram([...program, {name:monitor.getItemType(),type:monitor.getItemType()+"Code"}])},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }) 
    })

  const rearrange = (block, position) =>{
    if(Number.isFinite(block)){
      const temp = program[block];
      program.splice(block, 1)
      program.splice(position, 0, temp)
    }
    else{
      program.splice(position, 0, {name:block.replace("Code", ""),type:block})
    }
    setProgram(program)
  }
  const playProgram = () => {
    if(!props.running){
      props.setRunning(true);
      document.getElementById("playButton").innerText="Stop"
      const temp =[];
      program.forEach((block)=>temp.push(block.type))
      props.setProgramCode(temp)
    }
    else{
      props.setRunning(false);
      document.getElementById("playButton").innerText="Play"
    }
  };

  const [busy, setBusy] = useState(false);
  return(
    <div id="programming-area">
            Programming Area
            <div style={{display:"flex"}}>
              <div id="execution-area">
                <ExecutableBlocks refData ={drop} rearrange={rearrange} busy={busy} blocks={program}/>
              </div>
              <button id="playButton" onClick={()=>playProgram()}>Play</button>
            </div>
            <div id="blocks-area">
            <SourceBlocks setBusy={setBusy}/>
            </div>
        </div>
  )
}

export function HitTestExample(props) {
  const boxRef = React.useRef(null)

  useHitTest((hitMatrix) => {
    if (boxRef.current) {
      hitMatrix.decompose(boxRef.current.position, boxRef.current.quaternion, boxRef.current.scale)
    }
  })

  return <Box ref={boxRef} {...props} args={[0.1, 0.1, 0.1]} />
}

const  App = () => {
  const camRef = useRef();
  const [programCode, setProgramCode] = useState([]);
  const [running, setRunning] = useState(false);
  const [initialPos, setInitialPos] = useState([0,1.5,-4.5]);

  useEffect(()=>{
    if(!running) setInitialPos([0,1.5,-4.5]);
  },[running])

  return (
    <div id="canvas-container">
      <ARButton />
      <Canvas camera={{zoom:10, position:[-2.5,100,2.5] }}>
      <XR>
      <Controllers />
      <Hands />
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Level/>
        <Player running={running} camRef ={camRef} program={programCode} position={initialPos}/>
        <Pickup position={[4,2.5,4]} scale={[0.5,0.5,0.5]}/>
        <OrbitControls />
      {/* <OrthographicCamera
        ref= {camRef}
        makeDefault
        zoom={10}
        top={3}
        bottom={-3}
        left={-3}
        right={3}
        near={0.1}
        far={1000}
        position={[-2.5, 5, 2.5]}
      /> */}

      </XR>
       </Canvas>  
       <DndProvider backend={HTML5Backend}>
        <Area running={running} setRunning ={setRunning} setProgramCode={setProgramCode}/>
      </DndProvider>     
    </div>
  )
}

export default App;
