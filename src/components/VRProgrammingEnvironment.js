import React, {useEffect, useRef, useState} from "react";
import '@react-three/fiber'
import { Cone, Text } from '@react-three/drei'
import { Interactive, useInteraction} from '@react-three/xr'
import { useFrame } from "@react-three/fiber";
import { setPlaceholderIndex } from "../State";
import { state } from "../State";
import {useSnapshot} from "valtio";

const BLOCKS = [{text:"Forward", color:"blue"},{text:"Turn", color:"orange"},{text:"Repeat", color:"yellow"}]
function Box({scale, rest, size, position, color, children}) {
    return (
      <mesh scale={scale} position={position} {...rest}>
        <boxGeometry args={size} />
        <meshPhongMaterial color={color} />
        {children}
      </mesh>
    )
  }

  const CodeBlock = (props) => {
    const [selected, setSelected] = useState(false);
    const blockRef = useRef();
    const {placeholderIndex} = useSnapshot(state);
    useInteraction(blockRef, 'onSelectStart', (event) => {
      if(!props.busy){
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
      props.setSelectedRef(null);
      blockRef.current.position.x = props.position[0];
      blockRef.current.position.y = props.position[1];
      if(placeholderIndex!==undefined){
        props.setCode({text:"Forward", color:"red"},placeholderIndex)
      }
    })

    useInteraction(blockRef, 'onMove', (event) => {
      if(selected){
        blockRef.current.position.x = event.intersections[0].point.x;
        blockRef.current.position.y = event.intersections[0].point.y;
      }
    })
    return(
      <Interactive onBlur={() => null}>
        <mesh ref={props.busy && !selected?null:blockRef} scale = {props.scale} position={[props.position[0],props.position[1],props.busy && !selected? props.position[2]-0.05:props.position[2]]}>
            <boxGeometry/>
            <meshStandardMaterial color={props.color} opacity={props.busy && !selected?0.7:1} transparent />
        </mesh>
        </Interactive>
    )
  }

  const ExecutableCodeBlock = (props) => {
    const blockRef = useRef();
    const [collided, setCollided] = useState(false);
    const [placeholder, placeholderSet] = useState(false);

    useFrame(()=>{
      props.selectedBlock && collided && console.log("Distance from ",props.color,":",Math.pow(props.selectedBlock.current.position.x - blockRef.current.position.x, 2) + Math.pow(props.selectedBlock.current.position.y - blockRef.current.position.y, 2))
      if(props.color!=="pink"){
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
      if(collided && !placeholder && props.color!=="pink"){
        !placeholder && props.setCode({text:"Forward", color:"pink"},props.index+1)
        placeholderSet(true);
        setPlaceholderIndex(props.index+1)
      }
      else if(!collided && placeholder){
        props.setCode(null,props.index+1)
        placeholderSet(false)
        setPlaceholderIndex(undefined)
      }
    },[collided,placeholder]) 
    // useEffect(()=>{
    //   console.log("Busy")
    //   // if(Math.pow(props.selectedBlock.current.position.x - blockRef.current.position.x, 2) + Math.pow(props.selectedBlock.current.position.y - blockRef.current.position.y, 2) <= 0.6){
    //   //   console.log("Close to ", props.color);
    //   // }
    // },[props.busy])
    // const [selected, setSelected] = useState(false);
    // const blockRef = useRef();
    // useInteraction(blockRef, 'onSelectStart', (event) => {
    //   if(!props.busy){
    //     setSelected(true);
    //     props.setBusy(true);
    //   }
    // })

    // useInteraction(blockRef, 'onSelectEnd', (event) => {
    //   setSelected(false);
    //   props.setBusy(false);
    //   blockRef.current.position.x = props.position[0];
    //   blockRef.current.position.y = props.position[1]
    // })

    // useInteraction(blockRef, 'onMove', (event) => {
    //   if(selected){
    //     blockRef.current.position.x = event.intersections[0].point.x;
    //     blockRef.current.position.y = event.intersections[0].point.y;
    //   }
    // })
    return(
      <Interactive>
        <mesh ref={blockRef} scale = {props.scale} position={[props.position[0],props.position[1],props.position[2]]}>
            <boxGeometry/>
            <meshStandardMaterial color={props.color}/>
        </mesh>
        </Interactive>
    )
  }


  const SourceBoard = () => {
    return(
        <mesh scale={[4.5,1.5,0.1]} position={[0,3,-5]}>
            <boxGeometry/>
            <meshStandardMaterial color={"skyblue"} />
        </mesh>
    )
  }

  const SourceBoardBlocks = (props) => {
    const [busy, setBusy] = useState(false);
    return(
        <>
          {
            BLOCKS.map((block,i)=> (
              <CodeBlock key={i} busy={busy} setCode={props.setCode} setSelectedRef={props.setSelectedRef} setTopBusy= {props.setTopBusy} setBusy={setBusy} scale={[1.2,1.2,0.1]} position={[i-1===0?0:(i-1)*1.2 +(0.2/(i-1)), 3, -4.95]} color={block.color}/>))
          }
        </>
    )
  }


  const ProgrammingBoard = (props) => {
    const[dimension, setDimension] = useState({width:5, left:-2.5})
    useEffect(()=>{
      let newWidth = 1.4*props.code.length +1.6;
      setDimension({width:newWidth,left:-newWidth/2})
    },[props.code.length])
    
    return(
      <>
        <mesh scale={[dimension.width,1.5,0.1]} position={[0,5,-5]}>
            <boxGeometry/>
            <meshStandardMaterial color={"skyblue"} />
        </mesh>
        <> 
          {
            props.code && props.code.map((block,i)=>(
              <ExecutableCodeBlock code={props.code} setCode={props.setCode} selectedBlock={props.selectedBlock} busy={props.topBusy} key={i} index={i} scale={[1.2,1.2,0.1]} position={[dimension.left+0.2+((i+1)*0.6 + (i*0.6)+(i*0.2)),5, -4.95]} color={block.color}/>
            ))
          }
          <mesh scale={[1.2,1.2,0.1]} position={[dimension.width/2 -0.8,5,-4.95]} >
              <boxGeometry/>
              <meshStandardMaterial color={"white"} opacity={0} transparent />
          </mesh>
        </>
      </>
    )
  } 
export const VRProgrammingEnvironment = (props) => {
    const [hover, setHover] = useState(false)
    const [code, setCode] = useState([{text:"Forward", color:"blue"},{text:"Forward", color:"blue"},{text:"Forward", color:"blue"},{text:"Turn", color:"orange"},{text:"Forward", color:"blue"},{text:"Forward", color:"blue"},{text:"Repeat", color:"yellow"}]);
    const [color, setColor] = useState(0x123456)
    const[busy, setBusy] = useState(false);
    const[selectedRef, setSelectedRef] = useState(null);
    const updateCode = (update, index) =>{
      const temp = JSON.parse(JSON.stringify(code));
      if(update===null){
        code.forEach((block,i)=>{
          if(block.color==="pink") {
            temp.splice(i,1)
          }}
        )
      }
      else if(update.color==="pink"){
        let add = true;
        code.forEach(block=>{
          if(block.color==="pink") add = false}
        )
        if(add) temp.splice(index, 0, update)
      }
      else{
        temp.splice(index, 0, update)
      }
      setCode();
      setCode(temp)
    }

    const onSelect = () => {
      setColor((Math.random() * 0xffffff) | 0)
    }
return(
    <>
        <ProgrammingBoard  setCode={updateCode} selectedBlock={selectedRef} topBusy={busy} code={code}/>
        {/* <SourceBoard/> */}
        <SourceBoardBlocks setCode={updateCode} setSelectedRef={setSelectedRef} setTopBusy={setBusy}/>
        {/* <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
        <Box color={color} position ={[0,4,-4]} scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]} size={[2,2,2]}>
        <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
            Hello react-xr!
        </Text>
        </Box>
        </Interactive> */}
    </>
)
}