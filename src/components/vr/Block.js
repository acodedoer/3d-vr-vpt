import { Interactive} from '@react-three/xr'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export const Block = (props) => {
  const primaryTexture = useLoader(TextureLoader, `assets/images/${(props.type).toLowerCase()}_vr_primary.png`)
  const secondaryTexture = useLoader(TextureLoader, `assets/images/${(props.type).toLowerCase()}_vr_secondary.png`)

    return(
        <Interactive>
        <mesh ref={props.myRef} scale = {props.scale} position={props.position}>
            <boxGeometry/>
            <meshStandardMaterial map={primaryTexture} opacity={props.color==="white"?0.1:1} transparent/>
            <mesh ref={props.ref} scale = {[0.17,0.3,1]} position={[-.54,0.35,0]}>
              <boxGeometry/>
              <meshStandardMaterial map={secondaryTexture} opacity={props.color==="white"?0.1:1} transparent/>
            </mesh>
            <mesh ref={props.ref} scale = {[0.17,0.3,1]} position={[-.54,-0.35,0]}>
              <boxGeometry/>
              <meshStandardMaterial map={secondaryTexture} opacity={props.color==="white"?0.1:1} transparent/>
            </mesh>
            <mesh ref={props.ref} scale = {[0.17,0.38,1]} position={[.54,0,0]} >
              <boxGeometry/>
              <meshStandardMaterial map={secondaryTexture} opacity={props.color==="white"?0.1:1} transparent/>
            </mesh>
        </mesh>
        </Interactive>
    )
}