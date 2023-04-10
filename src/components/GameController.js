import { useEffect, useState } from "react"
import { state,nextLevel, setAnimateNextLevel, resetScore,setExecuting } from "../State";
import {useSnapshot} from "valtio";
import { LEVELS } from "../Levels";

export const GameController = () => {
    const {score,level, executing, animateNextLevel} = useSnapshot(state);
    const [pickups,setPickups] = useState(LEVELS[level]["pickups"]);
    useEffect(()=>{
        // eslint-disable-next-line no-unused-expressions
        if(score>=pickups){
            setTimeout(()=> setAnimateNextLevel(true),250)
        }
    },[score,pickups])

    useEffect(()=>{
        if(!animateNextLevel)
        {
            setExecuting(false);
            nextLevel()
        }
    },[animateNextLevel])
    useEffect(()=>{
        if(!executing){
            resetScore();
            setPickups(LEVELS[level]["pickups"]);
        }
    },[level,executing])

    return(
        <>
        </>
    )
}