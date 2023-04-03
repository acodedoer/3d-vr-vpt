import React, { useEffect, useRef, useState } from "react";
import "../App.css"
import Player from "./Player";
import { Level } from "./Level";


export const ExecutionEnvironment = (props) => {
    return(
        <>
            <Level/>
            <Player camRef ={props.camRef}/>
        </>
    )
} 