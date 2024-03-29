import Tile from "./Tile"
import React, { ComponentProps, useEffect, useState } from 'react'
import { state, setAnimateFall} from "../State";
import {useSnapshot} from "valtio";
import { LEVELS } from "../Levels";

export const Level = () => {
    const {level, currentPlayerPosition} = useSnapshot(state);
    const [levelData, setLevelData] = useState([...LEVELS[level].tiles])
    
    useEffect(()=>{
  
        if(Math.abs(currentPlayerPosition[0])>4 ||Math.abs(currentPlayerPosition[1])>4){
          setAnimateFall(true);
        }
    
    },[currentPlayerPosition])

    useEffect(()=>{
        setLevelData(LEVELS[level]["tiles"])
    },[level])

    return(
       levelData&&levelData.map((row, i)=>
            row.map((tile, j)=>{
                return tile?<Tile data={[i-2,j-2]} key={`${i}${j}`} render={true} visible={true} index={i*levelData[0].length + j} position={[(i-2)*2, 0, (j-2)*2]}/>:
                <Tile data={[i-2,j-2]} visible={false} key={`${i}${j}`} render={false} index={i*levelData[0].length + j} position={[(i-2)*2, 0, (j-2)*2]}/>
            }
            )
        )
    )
}