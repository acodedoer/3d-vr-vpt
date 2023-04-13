import { useState, useRef, useEffect } from "react";
import { InteractiveBlock } from "./InteractiveBlock";
import { Block } from "./Block";
import { useInteraction } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { setPlaceholderIndex,state,setSelectedBlock, setVRBlocksBusy } from "../../State";
import { Start } from "./Start";
import { useSnapshot } from "valtio";


export const ExecutableBlock = (props) => {
  const {vrBlocksBusy,placeholderIndex,code} = useSnapshot(state)
  const [selected, setSelected] = useState(false);
    const blockRef = useRef();
    const nullRef = useRef(null);
    const [collided, setCollided] = useState(false);
    const [placeholder, placeholderSet] = useState(false);

    
    useInteraction(blockRef, 'onSelectStart', (event) => {
      if(!vrBlocksBusy && !props.start){
        setVRBlocksBusy(true)
        setSelectedBlock({type:props.type, color:props.color})
        setSelected(true);
        props.setSelectedRef(blockRef);
      }
    })

    useInteraction(blockRef, 'onMove', (event) => {
      if(vrBlocksBusy && selected && !props.start){
        blockRef.current.position.x = event.intersections[0].point.x;
      }
    })

    useInteraction(blockRef, 'onSelectEnd', (event) => {
      if(selected && vrBlocksBusy){
        setVRBlocksBusy(false);
        setSelected(false);
        setSelectedBlock(undefined)
        props.setSelectedRef(null);
        if(placeholderIndex!==undefined){
          props.setCode({type:props.type, color:props.color},placeholderIndex,props.index)
        }
      }
    })

    useFrame(()=>{
      if(props.color!=="white" && props.selectedBlock!==blockRef){
        if(vrBlocksBusy &&props.selectedBlock && !collided ){
          if(Math.pow(props.selectedBlock.current.position.x - blockRef.current.position.x, 2) + Math.pow(props.selectedBlock.current.position.y - blockRef.current.position.y, 2) <= props.scale[0]/2 * props.scale[0]/2 ){
            setCollided(true);
          }
        }
        else if (collided){
          if(!props.selectedBlock || Math.pow(props.selectedBlock.current.position.x - (blockRef.current.position.x+0.6), 2) + Math.pow(props.selectedBlock.current.position.y - blockRef.current.position.y, 2) > (props.scale[0]) *(props.scale[0])){
            setCollided(false);
          }
        }
      }
    })

    useEffect(()=>{
      if(collided && !placeholder && props.color!=="white"){
        !placeholder && props.setCode({type:"placeholder", color:"white"},props.index+1)
        placeholderSet(true);
        setPlaceholderIndex(props.index+1)
      }
      else if(!collided && placeholder){
        props.setCode(null,props.index+1)
        placeholderSet(false)
        setPlaceholderIndex(undefined)
      }
    },[collided,placeholder])

    return(
      !props.start?
      <>
      {selected?
       <Block 
       type={props.type} 
       scale = {props.scale} 
       position={[props.position[0],props.position[1],props.position[2]-0.01]}
       transparency={0.2}
       color={props.color}
       />:null}
      <InteractiveBlock
        transparency={1} 
        myRef = {blockRef} 
        scale = {props.scale}
        position = {[props.position[0],props.position[1],vrBlocksBusy&&!selected?props.position[2]-0.01:props.position[2]]}
        type = {props.type}
        color={props.color}
        />
      </>
      :
      <Start 
        myRef = {blockRef}
        scale = {props.scale}
        position = {[props.position[0],props.position[1],vrBlocksBusy&&!selected?props.position[2]-0.01:props.position[2]]}
        type = {props.type}
        
      />
    )
  }
