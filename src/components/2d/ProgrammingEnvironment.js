import React, { useEffect, useRef, useState } from "react";
import { COLORS, ItemTypes } from "../../Constants";
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
        setRunning(false);
      },[level])
      
    const rearrange = (block, position) =>{
      const temp = JSON.parse(JSON.stringify(program));
      if(Number.isFinite(block)){
        const block_ = program[block];
        temp.splice(block, 1)
        temp.splice(position, 0, block_)
      }
      else{
        temp.splice(position, 0, {name:block.replace("Code", ""),type:block})
      }
      setProgram(temp)
    }
    const playProgram = () => {
      if(!running){
        setRunning(true);
      }
      else{
        setRunning(false);
      }
    };
    const [busy, setBusy] = useState(false);

    useEffect(()=>{
        setCode(program)
        setRunning(false)
    },[program])

    useEffect(()=>{
        setExecuting(running)
    },[running])

    const Scroller = (props) =>{
      return(
        <button onClick={()=>scrollTo(props.dir)} id={`scroll${props.dir}`}></button>
      )
    }

    const [scrollPos, setScrollPos] = useState(11);

    const scrollTo = (dir) =>{
      dir==="left"?setScrollPos(scrollPos-1):setScrollPos(scrollPos+1);
      const elem = document.getElementById(`xBlock${scrollPos}`);
      elem.scrollIntoView();
    }

    return(
      <div id="programming-area" style={{backgroundColor:COLORS.environmentBG}} >
              <div style={{display:"flex"}}>
                <div id="execution-area" style={{backgroundColor:COLORS.environmentBG.darken(0.2).hex()}}>
                 
                  {/* <Scroller dir={"left"}/>
                  <Scroller dir={"right"}/> */}
                  <ExecutableBlocks refData ={drop} rearrange={rearrange} busy={busy} blocks={program}/>
                </div>
                <button id="playButton"  onClick={()=>playProgram()}>
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