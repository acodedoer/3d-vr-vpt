import { useState, useRef, useEffect } from "react";
import { Block } from "./Block";
import { useFrame } from "@react-three/fiber";
import { setPlaceholderIndex,state } from "../../State";
import { Start } from "./Start";
import { useSnapshot } from "valtio";


export const ExecutableBlock = (props) => {
  const {selected} = useSnapshot(state)
    const blockRef = useRef();
    const [collided, setCollided] = useState(false);
    const [placeholder, placeholderSet] = useState(false);

    useFrame(()=>{
      if(props.color!=="white"){
        if(props.busy &&props.selectedBlock && !collided){
          if(Math.pow(props.selectedBlock.current.position.x - blockRef.current.position.x, 2) + Math.pow(props.selectedBlock.current.position.y - blockRef.current.position.y, 2) <= props.scale[0]/2 * props.scale[0]/2 ){
            setCollided(true);
          }
        }
        else if (collided){
          if(!props.selectedBlock || Math.pow(props.selectedBlock.current.position.x - (blockRef.current.position.x+0.6), 2) + Math.pow(props.selectedBlock.current.position.y - blockRef.current.position.y, 2) > (props.scale[0]*0.84) *(props.scale[0]*0.84)){
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
      <Block 
        myRef = {blockRef} 
        scale = {props.scale}
        position = {[props.position[0],props.position[1],props.position[2]]}
        type = {props.type}
        color={props.color}
      />
      :
      <Start 
        myRef = {blockRef} 
        scale = {props.scale}
        position = {[props.position[0],props.position[1],props.position[2]]}
        type = {props.type}
        
      />
    )
  }
