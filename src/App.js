import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import "./App.css"
import { OrbitControls,OrthographicCamera  } from "@react-three/drei";
import Tile from './components/Tile'
import Player from "./components/Player";
import { Pickup } from "./components/Pickup";
import { Level } from "./components/Level";

// const CameraController = () => {
//   const { camera, gl } = useThree();
//   useEffect(
//     () => {
//       const controls = new OrbitControls(camera, gl.domElement);

//       controls.minDistance = 3;
//       controls.maxDistance = 20;
//       return () => {
//         controls.dispose();
//       };
//     },
//     [camera, gl]
//   );
//   return null;
// };


const  App = () => {
  const camRef = useRef();
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [10, 10, 0] }}>
      {/* <CameraController /> */}
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
    </div>
  )
}

export default App;
