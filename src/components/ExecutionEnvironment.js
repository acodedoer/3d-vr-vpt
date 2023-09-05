import React, { useEffect, useRef, useState } from "react";
import "../App.css"
import Player from "./Player";
import { Level } from "./Level";
import { GameController } from "./GameController";
import { useThree} from '@react-three/fiber'


export const ExecutionEnvironment = (props) => {
    useThree(({camera}) => {
        camera.rotation.set(-0.44376121886074993, -0.7171924857136165, -0.30284477037129276);
    });

    return(
        <group scale={[1,1,1]} position={[3,0.5,-2]}>
        <>
            <GameController/>
            <Level/> 
            <Player camRef ={props.camRef}/>
        </>
         </group>
    )
}   

// _x: -0.44376121886074993
// _y: -0.7171924857136165
// _z: -0.30284477037129276