import { useEffect, useState } from "react"
import { state,nextLevel, resetScore,setExecuting } from "../State";
import {useSnapshot} from "valtio";
import { LEVELS } from "../Levels";

export const GameController = () => {
    const {score,level} = useSnapshot(state);
    const [pickups,setPickups] = useState(LEVELS[level]["pickups"]);
    useEffect(()=>{
        // eslint-disable-next-line no-unused-expressions
        if(score>=pickups){
            setExecuting(false);
            nextLevel();
        }
    },[score,pickups])

    useEffect(()=>{
        resetScore();
        setPickups(LEVELS[level]["pickups"]);
    },[level])
    return(
        <>
        </>
    )
}