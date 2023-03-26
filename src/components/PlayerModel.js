/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";

export const  PlayerModel = (props) =>{
  const meshRef = useRef();
  const initY = 1.5;
  const size = 2.25;
  let distance = 0;
  let jump = 0;
  let move = 0;
  let dir = 0;
  let dirData = ["z","add"];
  const interval = 0.05;
  const [moves, setMoves] = useState(["ForwardCode","ForwardCode", "LeftCode", "ForwardCode", "RightCode", "ForwardCode", "RightCode", "ForwardCode", "LeftCode"]);
  let moveCount = 0;
  
  let x = 0;

  useEffect(()=>{
    props.program && setMoves(...props.program)
  },[props.program])

  useEffect(()=>{
    if(!props.running){
      meshRef.current.position.x=0;
      meshRef.current.position.y=1.5;
      meshRef.current.position.z=-4.5;
    }
  },[props.running])

  const getDirection = (dir) => {
    if(dir%4===0) return ["z","add"];
    else if(dir%4===1) return ["x","sub"];
    else if(dir<0 && Math.abs(dir)%4===1) return ["x","add"];
    else if(dir%4===2 || Math.abs(dir)%4===2 ) return ["z","sub"];
  }

  useFrame((state, delta, xrFrame) => {
      if(moves.length>0 && props.running){
      switch (moves[moveCount]){
        case "RightCode":
          if (meshRef.current && jump<size) {
            size - jump>= interval? jump +=interval: jump += (size - jump)
            let move = (Math.sin(((jump/size) * Math.PI))) ;
            meshRef.current.rotation.y-= (Math.PI/2) / (size/interval);
            meshRef.current.position.y = initY + move
          }
          else{
            moveCount++
            dir++;
            jump =0
            dirData = getDirection(dir);
          }
          break;
        case "LeftCode":
          if (meshRef.current && jump<size) {
            size - jump>= interval? jump +=interval: jump += (size - jump)
            let move = (Math.sin(((jump/size) * Math.PI))) ;
            meshRef.current.rotation.y+= (Math.PI/2) / (size/interval);
            meshRef.current.position.y = initY + move
          }
          else{
            moveCount++
            dir--
            jump =0
            dirData = getDirection(dir);
          }
          break;
        case "ForwardCode":
          if (meshRef.current && move<size) {
            if(dirData[1] === "add"){
              if(size - move >= interval){
                move +=interval;
                meshRef.current.position[dirData[0]] +=interval;
              }
              else{
                move += (size - move)
                meshRef.current.position[dirData[0]] += (size - move)
              }
              
              let sinMove = (Math.sin(((move/size) * Math.PI))) ;
              meshRef.current.position.y = 1.5 + sinMove
            }
            else if(dirData[1] === "sub"){
              if(size - move >= interval){
                move +=interval;
                meshRef.current.position[dirData[0]] -=interval;
              }
              else{
                move += (size - move)
                meshRef.current.position[dirData[0]] -= (size - move)
              }
              
              let sinMove = (Math.sin(((move/size) * Math.PI))) ;
              meshRef.current.position.y = 1.5 + sinMove
            }
          }
          else{
            move = 0;
            moveCount++
          }
      }
    }
  })
  const { nodes, materials } = useGLTF("/assets/gltf/character_duck.gltf");
  return (
    <group {...props} ref={meshRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.character_duck.geometry}
      >
        <meshBasicMaterial color={'#ffffff'}/>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.character_duckArmLeft.geometry}
          position={[0.2, 0.63, 0]}
        />
        <meshBasicMaterial color={'#ffffff'}/>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.character_duckArmRight.geometry}
          position={[-0.2, 0.63, 0]}
        >
          <meshBasicMaterial color={'#ffffff'}/>
        </mesh>
        <group position={[0, 0.7, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube1338.geometry}
          >
            <meshBasicMaterial color={'#ffffff'}/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube1338_1.geometry}
            material={materials.Yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube1338_2.geometry}
            material={materials.Black}
          />
        </group>
      </mesh>
    </group>
  );
}

useGLTF.preload("/assets/gltf/character_duck.gltf");