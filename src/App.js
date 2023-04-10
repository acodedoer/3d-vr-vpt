import React, { useEffect, useRef, useState } from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Canvas} from '@react-three/fiber'
import "./App.css"
import { OrbitControls} from "@react-three/drei";
import { VRButton, XR, Controllers, Hands } from '@react-three/xr'
import { ExecutionEnvironment } from "./components/ExecutionEnvironment";
import { ProgrammingEnvironment as ProgrammingEnvironment2D } from "./components/2d/ProgrammingEnvironment";
import { ProgrammingEnvironment as ProgrammingEnvironmentVR } from "./components/vr/ProgrammingEnvironment";

const  App = () => {
  const camRef = useRef();
  
  return (
    <div id="canvas-container">
        <VRButton/>
      <Canvas camera={{zoom:10, position:[-2.5,100,2.5] }} style={{ background: "#98eae0" }}>
        <XR>
        <Controllers />
        <Hands />
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        {/* <ExecutionEnvironment camRef={camRef}/> */}
        <ProgrammingEnvironmentVR/>
        <OrbitControls />
        </XR>
      </Canvas>  
      <DndProvider backend={HTML5Backend}>
        <ProgrammingEnvironment2D/>
      </DndProvider>     
    </div>
  )
}

export default App;
