import { useInteraction } from "@react-three/xr";
import { useState, useRef } from "react";
import { useSnapshot } from "valtio";
import { setVRBlocksBusy, state } from "../../State";
import { InteractiveBlock } from "./InteractiveBlock";
import { Block } from "./Block";
import { setSelectedBlock } from "../../State"

export const SourceBlock = (props) => {
    const [selected, setSelected] = useState(false);
    const blockRef = useRef();
    const {placeholderIndex,vrBlocksBusy} = useSnapshot(state);
    useInteraction(blockRef, 'onSelectStart', (event) => {
      if(!props.busy){
        console.log("Selected Source")
        setSelectedBlock({type:props.type, color:props.color})
        setSelected(true);
        props.setBusy(true);
        setVRBlocksBusy(true)
        props.setTopBusy(true);
        props.setSelectedRef(blockRef);
      }
    })

    useInteraction(blockRef, 'onSelectEnd', (event) => {
      if(selected){
        console.log("Dropped Source")
        setSelected(false);
        props.setBusy(false);
        props.setTopBusy(false);
        setVRBlocksBusy(false)
        setSelectedBlock(undefined)
        props.setSelectedRef(null);
        blockRef.current.position.x = props.position[0];
        blockRef.current.position.y = props.position[1];
        if(placeholderIndex!==undefined){
          props.setCode({type:props.type, color:props.color},placeholderIndex)
        }
      }
    })

    useInteraction(blockRef, 'onMove', (event) => {
      if(vrBlocksBusy && selected){
        blockRef.current.position.x = event.intersections[0].point.x;
        blockRef.current.position.y = event.intersections[0].point.y;
      }
    })
    return(
      <>
      {selected?
      <Block 
      type={props.type} 
      scale = {props.scale} 
      position={[props.position[0],props.position[1],props.position[2]-0.01]}
      transparency={0.2}
      />:null}
        <InteractiveBlock 
          myRef={props.busy && !selected?null:blockRef} 
          type={props.type} 
          scale = {props.scale} 
          position={[props.position[0],props.position[1],props.busy && !selected? props.position[2]-0.01:props.position[2]]}
          transparency={1}
        />
      </>
    )
  }