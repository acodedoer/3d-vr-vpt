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

    useEffect(()=>{
      console.log(blockRef.current)
      blockRef&&console.log(props.type,"- ",blockRef.current.matrixWorld.elements[12],":",blockRef.current.matrixWorld.elements[13])
    },blockRef)

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
        console.log("here")
        blockRef.current.matrixAutoUpdate = false;
        let m = [...blockRef.current.matrixWorld.elements];
        m[12] = 30
        blockRef.current.matrix.set(m);
        console.log(blockRef.current.matrixWorld.elements)
      }
    })

    useInteraction(blockRef, 'onSelectEnd', (event) => {
      if(selected && vrBlocksBusy){
        setVRBlocksBusy(false);
        setSelected(false);
        setSelectedBlock(undefined)
        props.setSelectedRef(null);
        if(placeholderIndex!==undefined){
          props.setCode({type:props.type, color:props.color},placeholderIndex)
        }
      }
    })

    useFrame(()=>{
      if(props.color!=="white" && props.selectedBlock!==blockRef){
        if(vrBlocksBusy &&props.selectedBlock && !collided ){
          if(Math.pow(props.selectedBlock.current.matrixWorld.elements[12] - blockRef.current.matrixWorld.elements[12], 2) + Math.pow(props.selectedBlock.current.matrixWorld.elements[13] - blockRef.current.matrixWorld.elements[13], 2) <= props.scale[0]/2 * props.scale[0]/2 ){
            setCollided(true);
          }
        }
        else if (collided){
          if(!props.selectedBlock || Math.pow(props.selectedBlock.current.matrixWorld.elements[12] - (blockRef.current.matrixWorld.elements[12]+0.6), 2) + Math.pow(props.selectedBlock.current.matrixWorld.elements[13] - blockRef.current.matrixWorld.elements[13], 2) > (props.scale[0]) *(props.scale[0])){
            setCollided(false);
          }
        }
      }
    })

    useEffect(()=>{
      if(collided && !placeholder){
        // !placeholder && props.setCode({type:"placeholder", color:"white"},props.index+1)
        placeholderSet(true);
        setPlaceholderIndex(props.index+1)
      }
      else if(!collided && placeholder){
        placeholderSet(false)
        setPlaceholderIndex(undefined)
      }
    },[collided,placeholder])

    return(
      !props.start?
      <>
      <InteractiveBlock
        transparency={1} 
        myRef = {blockRef} 
        scale = {props.scale}
        type = {props.type}
        color={props.color}
        />
      </>
      :
      <Start 
        myRef = {blockRef}
        scale = {props.scale}
        type = {props.type}
        
      />
    )
  }
