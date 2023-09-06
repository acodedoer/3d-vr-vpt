import React, { useEffect, useRef, useState } from "react";
import { COLORS, ItemTypes } from "../../Constants";
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import "../../App.css"
import { ExecutableBlocks } from "./ExecutableBlocks";
import { SourceBlocks } from "./SourceBlocks";
import {useSnapshot} from "valtio";
import { setCode, setExecuting, state } from "../../State";
import { Bin } from "./Bin";

export const ProgrammingEnvironment = (props) => {
    const {code,executing,level} = useSnapshot(state);
    const [running,setRunning] = useState(false);
    const [full, setFull] = useState(false);
    const [program, setProgram] = useState([]);
    
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: [ItemTypes.FORWARD, ItemTypes.LEFT, ItemTypes.RIGHT],
      drop: (i,monitor)=>{updateProgram({name:monitor.getItemType(),type:monitor.getItemType()+"Code"})},
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }) 
      })
  
      const updateProgram = (block) => {
        if(!full){
          setProgram([...program,block])
        }
      }
      useEffect(()=>{
        setProgram([]);
        setRunning(false);
      },[level])

    const remove = (index) => {
      const temp = JSON.parse(JSON.stringify(program));
      temp.splice(index, 1);
      setProgram(temp);
    }

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
      if(program.length>0){

        if(!running){
          setRunning(true);
        }
        else{
          setRunning(false);
        }
      }
    };
    const [busy, setBusy] = useState(false);

    useEffect(()=>{
        if(program.length<12 && full ===true)
        {
          setFull(false)
        }
        else if(program.length>=12 && full ===false)
        {
          setFull(true)
        }
        setCode(program)
        setRunning(false)
    },[program])

    useEffect(()=>{
        setExecuting(running)
    },[running])

    useEffect(()=>{
        setRunning(executing)
    },[executing])

    const Scroller = (props) =>{
      return(
        <button onClick={()=>scrollTo(props.dir)} id={`scroll${props.dir}`}></button>
      )
    }

    const BlocksLeft = () => {
      return(
        <div style={{display:"flex", flexDirection:"row", position:"absolute", top:0, left:0}}>
          <img src={`/assets/images/forward.png`}/>
          <p>x {12-program.length}</p>
        </div>
      )
    }
    const [scrollPos, setScrollPos] = useState(11);

    const scrollTo = (dir) =>{
      let id = dir==="left"?scrollPos-1:scrollPos+1;
      const elem = document.getElementById(`xBlock${id}`);
      elem.scrollIntoView();
      setScrollPos(id);
    }


    return(
      <div id="programming-area" style={{backgroundColor:COLORS.environmentBG}} >
              <div style={{position:"absolute", top:0,right:0, padding:"20px", fontSize:"2em", fontWeight:"bold"}}>
                Level {level}
              </div>
              <div style={{position:"absolute", top:0,left:0, padding:"20px", fontSize:"2em", fontWeight:"bold", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <img src={`/assets/images/forward.png`} style={{maxWidth:"1em", maxHeight:"1em"}}/>
                <span> &#215; </span> {12-program.length}
              </div>
              <div style={{display:"flex"}}>
                <div id="execution-area" style={{backgroundColor:COLORS.environmentBG.darken(0.2).hex()}}>
                  {busy && full?<div style={{width:"100%", textAlign:"center"}}><h2>Blocks Area Full, Drag a Block From this Area to The Bin to Delete It</h2></div>:
                  <ExecutableBlocks executing={executing} refData ={drop} showPlaceholder={isOver && canDrop} rearrange={rearrange} busy={busy} blocks={program}/>}
                </div>
                <button id="playButton" style={{backgroundColor:executing?"red":COLORS.playButton}} onClick={()=>playProgram()}>
                  <img 
                    id="playButtonImage" 
                    src={`/assets/images/${executing?"stop":"play"}.png`}
                  />
                </button>
              </div>
              <div id="blocks-area">
              <SourceBlocks setBusy={setBusy}/>
              <Bin  remove={remove} />
              </div>
          </div>
    )
  }