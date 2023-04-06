import React, {useRef, useState} from "react";
import '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Interactive, useInteraction} from '@react-three/xr'

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
    useInteraction(blockRef, 'onSelectStart', (event) => {
      if(!props.busy){
        setSelected(true);
        props.setBusy(true);
      }
    })

    useInteraction(blockRef, 'onSelectEnd', (event) => {
      setSelected(false);
      props.setBusy(false);
      blockRef.current.position.x = props.position[0];
      blockRef.current.position.y = props.position[1]
    })

    useInteraction(blockRef, 'onMove', (event) => {
      if(selected){
        blockRef.current.position.x = event.intersections[0].point.x;
        blockRef.current.position.y = event.intersections[0].point.y;
      }
    })
    return(
      <Interactive onHover={() => console.log("Hover")} onBlur={() => null}>
        <mesh ref={props.busy && !selected?null:blockRef} scale = {props.scale} position={[props.position[0],props.position[1],props.busy && !selected? props.position[2]-0.05:props.position[2]]}>
            <boxGeometry/>
            <meshStandardMaterial color={props.color} opacity={props.busy && !selected?0.7:1} transparent />
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

  const SourceBoardBlocks = () => {
    const [busy, setBusy] = useState(false);
    return(
        <>
          {
            BLOCKS.map((block,i)=> (
              <CodeBlock key={i} busy={busy} setBusy={setBusy} scale={[1.2,1.2,0.1]} position={[i-1===0?0:(i-1)*1.2 +(0.2/(i-1)), 3, -4.95]} color={block.color}/>))
          }
        </>
    )
  }


  const ProgrammingBoard = () => {
    return(
        <mesh scale={[5,1.5,0.1]} position={[0,5,-5]}>
            <boxGeometry/>
            <meshStandardMaterial color={"skyblue"} />
        </mesh>
    )
  }
export const VRProgrammingEnvironment = (props) => {
    const [hover, setHover] = useState(false)
    const [color, setColor] = useState(0x123456)
  
    const onSelect = () => {
      setColor((Math.random() * 0xffffff) | 0)
    }
return(
    <>
        <ProgrammingBoard/>
        {/* <SourceBoard/> */}
        <SourceBoardBlocks/>
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