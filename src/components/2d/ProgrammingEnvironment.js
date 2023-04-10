import React, { useEffect, useRef, useState } from "react";
import { ItemTypes } from "../../Constants";
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import "../../App.css"
import { ExecutableBlocks } from "./ExecutableBlocks";
import { SourceBlocks } from "./SourceBlocks";
import {useSnapshot} from "valtio";
import { setCode, setExecuting, state } from "../../State";

export const ProgrammingEnvironment = (props) => {
    const {code,executing,level} = useSnapshot(state);
    const [running,setRunning] = useState(false);
    const [program, setProgram] = useState([]);
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: [ItemTypes.FORWARD, ItemTypes.LEFT, ItemTypes.RIGHT],
      drop: (i,monitor)=>{setProgram([...program, {name:monitor.getItemType(),type:monitor.getItemType()+"Code"}])},
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }) 
      })
  
      useEffect(()=>{
        setProgram([]);
        //document.getElementById("playButton").innerText="Play"
        setRunning(false);
      },[level])
      
    const rearrange = (block, position) =>{
      if(Number.isFinite(block)){
        const temp = program[block];
        program.splice(block, 1)
        program.splice(position, 0, temp)
      }
      else{
        program.splice(position, 0, {name:block.replace("Code", ""),type:block})
      }
      setProgram(program)
    }
    const playProgram = () => {
      if(!running){
        setRunning(true);
        //document.getElementById("playButton").innerText="Stop"
      }
      else{
        setRunning(false);
        //document.getElementById("playButton").innerText="Play"
      }
    };
    const [busy, setBusy] = useState(false);

    useEffect(()=>{
        setCode(program)
    },[program])

    useEffect(()=>{
        setExecuting(running)
    },[running])

    return(
      <div id="programming-area">
              <div style={{display:"flex"}}>
                <div id="execution-area">
                  <ExecutableBlocks refData ={drop} rearrange={rearrange} busy={busy} blocks={program}/>
                </div>
                <button id="playButton" style={{backgroundColor:executing?"red":"#00aa88"}} onClick={()=>playProgram()}>
                  <img 
                    id="playButtonImage" 
                    src={`/assets/images/${executing?"stop":"play"}.png`}
                  />
                </button>
              </div>
              <div id="blocks-area">
              <SourceBlocks setBusy={setBusy}/>
              </div>
          </div>
    )
  }