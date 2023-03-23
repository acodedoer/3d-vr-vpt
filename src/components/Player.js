import { useFrame } from '@react-three/fiber'
import { PlayerModel } from './PlayerModel'

const Player = (props) => {
  
  useFrame((state, delta, xrFrame) => {
    console.log(props.camRef)
  })
    return(
        <mesh>
          <PlayerModel position = {props.position}/>
        </mesh>
    )
}

export default Player;