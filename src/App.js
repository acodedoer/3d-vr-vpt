import React, { useEffect } from "react";
import ReactDOM from 'react-dom'
import { Canvas, useThree } from '@react-three/fiber'
import "./App.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Tile from './components/Tile'
import Player from "./components/Player";
import { Pickup } from "./components/Pickup";
import { Level } from "./components/Level";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};


const  App = () => {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [10, 10, 0] }}>
      <CameraController />
        {/* <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} /> */}
        <Level/>
        <Player position={[0,1.5,0]}/>
        <Pickup position={[4,2.5,4]} scale={[0.5,0.5,0.5]}/>
      </Canvas>
      <button>Jump</button>
    </div>
  )
}

export default App;
