import React, { useEffect, useRef, useState } from "react";
import "../App.css"
import Player from "./Player";
import { Level } from "./Level";
import { GameController } from "./GameController";


export const ExecutionEnvironment = (props) => {
    return(
        <>
            <GameController/>
            <Level/>
            <Player camRef ={props.camRef}/>
        </>
    )
} 