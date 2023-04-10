import { useInteraction } from "@react-three/xr";
import { useState, useRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../State";
import { Block } from "./Block";
import { setSelectedBlock } from "../../State"

export const SourceBlock = (props) => {
    const [selected, setSelected] = useState(false);
    const blockRef = useRef();
    const {placeholderIndex} = useSnapshot(state);
    useInteraction(blockRef, 'onSelectStart', (event) => {
      if(!props.busy){
        setSelectedBlock({type:props.type, color:props.color})
        setSelected(true);
        props.setBusy(true);
        props.setTopBusy(true);
        props.setSelectedRef(blockRef);
      }
    })

    useInteraction(blockRef, 'onSelectEnd', (event) => {
      setSelected(false);
      props.setBusy(false);
      props.setTopBusy(false);
      setSelectedBlock(undefined)
      props.setSelectedRef(null);
      blockRef.current.position.x = props.position[0];
      blockRef.current.position.y = props.position[1];
      if(placeholderIndex!==undefined){
        props.setCode({type:props.type, color:props.color},placeholderIndex)
      }
    })

    useInteraction(blockRef, 'onMove', (event) => {
      if(selected){
        blockRef.current.position.x = event.intersections[0].point.x;
        blockRef.current.position.y = event.intersections[0].point.y;
      }
    })
    return(
      <Block 
        myRef={props.busy && !selected?null:blockRef} 
        type={props.type} 
        scale = {props.scale} 
        position={[props.position[0],props.position[1],props.busy && !selected? props.position[2]-0.05:props.position[2]]}
      />
    )
  }