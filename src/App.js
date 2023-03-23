import React, { useEffect, useRef } from "react";
import { ItemTypes } from "./Constants";
import ReactDOM from 'react-dom'
import { useDrag, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import "./App.css"
import { OrbitControls,OrthographicCamera  } from "@react-three/drei";
import Tile from './components/Tile'
import Player from "./components/Player";
import { Pickup } from "./components/Pickup";
import { Level } from "./components/Level";

const Area = () => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.Foward,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return(
    <div id="programming-area">
            Programming Area
            <div id="parent-blocks-area">
            <div
              ref={drag}
              style={{
                opacity: isDragging ? 0.5 : 1,
                fontSize: 25,
                width:25,
                height:25,
                fontWeight: 'bold',
                cursor: 'move',
              }}
            >
              {ItemTypes.Foward}
            </div>
            </div>
        </div>
  )
}
const  App = () => {
  const camRef = useRef();
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [10, 10, 0] }}>
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
       </Canvas>  
       <DndProvider backend={HTML5Backend}>
        <Area/>
      </DndProvider>     
    </div>
  )
}

export default App;
