import { useEffect, useState } from "react"
import { state,nextLevel, setAnimateNextLevel, resetScore,setExecuting, resetMoves } from "../State";
import {useSnapshot} from "valtio";
import { LEVELS } from "../Levels";

export const GameController = () => {
    const {score,level, executing, animateNextLevel, animateFall} = useSnapshot(state);
    const [pickups,setPickups] = useState(LEVELS[level]["pickups"]);
    useEffect(()=>{
        // eslint-disable-next-line no-unused-expressions
        if(score>=pickups){
            setAnimateNextLevel(true);
        }
    },[score,pickups])

    useEffect(()=>{
        if(!animateNextLevel)
        {
            setExecuting(false);
            score>=pickups && nextLevel()
            resetMoves()
        }
    },[animateNextLevel])

    // useEffect(()=>{
    //     animateFall && resetScore()
    // })
    useEffect(()=>{
        if(!executing){
            resetScore();
            resetMoves();
            setPickups(LEVELS[level]["pickups"]);
        }
    },[level,executing])

    return(
        <>
        </>
    )
}