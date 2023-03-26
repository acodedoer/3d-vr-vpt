import React, { useEffect, useRef, useState } from "react";
import { ItemTypes } from "./Constants";
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import "./App.css"
import { OrbitControls,OrthographicCamera, useSelect  } from "@react-three/drei";
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import Player from "./components/Player";

import { Pickup } from "./components/Pickup";
import { Level } from "./components/Level";
import { Blocks } from "./components/Blocks";
import { ChildBlock } from "./components/SourceBlock";

const Area = () => {
  const [program, setProgram] = useState([]);
  const onDrop = (i,monitor)=>console.log(JSON.stringify(monitor.getItem()));
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.FORWARD, ItemTypes.LEFT, ItemTypes.RIGHT],
    drop: (i,monitor)=>{setProgram([...program, {name:monitor.getItemType(),type:monitor.getItemType()+"Code"}])},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }) 
    })

  return(
    <div id="programming-area">
            Programming Area
            <div  ref={drop} id="execution-area">
              <Blocks program={true} blocks={program}/>
            </div>
            <div id="blocks-area">
            <Blocks/>
            </div>
        </div>
  )
}
const  App = () => {
  const camRef = useRef();
  return (
    <div id="canvas-container">
      {/* <VRButton /> */}
      <Canvas camera={{ position: [10, 10, 0] }}>
      <XR>
      <Controllers />
      <Hands />
        {/* <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} /> */}
        <Level/>
        <Player camRef ={camRef} position={[0,1.5,-4.5]}/>
        <Pickup position={[4,2.5,4]} scale={[0.5,0.5,0.5]}/>
        <OrbitControls />
      <OrthographicCamera
        ref= {camRef}
        makeDefault
        zoom={0.2}
        top={3}
        bottom={-3}
        left={-3}
        right={3}
        near={0.1}
        far={1000}
        position={[-2.5, 5, 2.5]}
      />
      </XR>
       </Canvas>  
       <DndProvider backend={HTML5Backend}>
        <Area/>
      </DndProvider>     
    </div>
  )
}

export default App;
