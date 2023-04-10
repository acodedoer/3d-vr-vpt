import React, { useEffect, useRef, useState } from "react";
import "../App.css"
import Player from "./Player";
import { Level } from "./Level";
import { GameController } from "./GameController";


export const ExecutionEnvironment = (props) => {
    return(
        // <group scale={[0.5,0.5,0.5]} position={[3,0.5,-2]}>
        <>
            <GameController/>
            <Level/>
            <Player camRef ={props.camRef}/>
        </>
        // </group>
    )
} 