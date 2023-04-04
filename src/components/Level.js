import Tile from "./Tile"
import React, { ComponentProps, useEffect, useState } from 'react'
import { state} from "../State";
import {useSnapshot} from "valtio";
import { LEVELS } from "../Levels";

export const Level = () => {
    const {level} = useSnapshot(state);
    const [levelData, setLevelData] = useState([...LEVELS[level].tiles])
    useEffect(()=>{
        setLevelData(LEVELS[level]["tiles"])
    },[level])

    return(
       levelData&&levelData.map((row, i)=>
            row.map((tile, j)=>{
                return tile?<Tile data={[i-2,j-2]} visible={true} index={i*levelData[0].length + j} position={[(i-2)*2, 0, (j-2)*2]}/>:null
            }
            )
        )
    )
}