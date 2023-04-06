import React, {useState} from "react";
import '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Interactive} from '@react-three/xr'

const BLOCKS = ["Forward", "Turn", "Repeat"]
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
    return(
        <mesh scale = {props.scale} position={props.position}>
            <boxGeometry/>
            <meshPhongMaterial color={props.color} />
        </mesh>
    )
  }


  const SourceBoard = () => {
    return(
        <mesh scale={[5.4,1.8,0.1]} position={[0,3,-5]}>
            <boxGeometry/>
            <meshStandardMaterial color={"skyblue"} />
            {
                BLOCKS.map((block,i)=> (<CodeBlock scale={[0.27777777/1,0.833333/1,0.5/1]} position={[i-1===0?0:0.27777777/(i-1) +(0.04/(i-1)), 0, 0.5]}/>))
            }
        </mesh>
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
        <SourceBoard/>
        <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
        <Box color={color} position ={[0,4,-4]} scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]} size={[2,2,2]}>
        <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
            Hello react-xr!
        </Text>
        </Box>
        </Interactive>
    </>
)
}