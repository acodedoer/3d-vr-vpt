import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export const Block = (props) => {
  const primaryTexture = useLoader(TextureLoader, `assets/images/${(props.type).toLowerCase()}_vr_primary.png`)
  const secondaryTexture = useLoader(TextureLoader, `assets/images/${(props.type).toLowerCase()}_vr_secondary.png`)

    return(
        <mesh ref={props.myRef} scale = {props.scale} position={props.position}>
            <boxGeometry/>
            <meshStandardMaterial map={primaryTexture} opacity={props.type==="placeholder"?0.5:props.transparency} transparent/>
            <mesh ref={props.ref} scale = {[0.17,0.3,1]} position={[-.54,0.35,0]}>
              <boxGeometry/>
              <meshStandardMaterial map={secondaryTexture} opacity={props.type==="placeholder"?0.5:props.transparency} transparent/>
            </mesh>
            <mesh ref={props.ref} scale = {[0.17,0.3,1]} position={[-.54,-0.35,0]}>
              <boxGeometry/>
              <meshStandardMaterial map={secondaryTexture} opacity={props.type==="placeholder"?0.5:props.transparency} transparent/>
            </mesh>
            <mesh ref={props.ref} scale = {[0.17,0.38,1]} position={[.54,0,0]} >
              <boxGeometry/>
              <meshStandardMaterial map={secondaryTexture} opacity={props.type==="placeholder"?0.5:props.transparency} transparent/>
            </mesh>
        </mesh>
    )
}

useLoader.preload(TextureLoader,["assets/images/placeholder_vr_primary.png","assets/images/placeholder_vr_secondary.png"])