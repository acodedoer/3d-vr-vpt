import { Interactive} from '@react-three/xr'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export const Start = (props) => {
  const primaryTexture = useLoader(TextureLoader, `assets/images/${(props.type).toLowerCase()}_vr_primary.png`)
  const secondaryTexture = useLoader(TextureLoader, `assets/images/${(props.type).toLowerCase()}_vr_secondary.png`)

    return(
        <Interactive>
        <mesh ref={props.myRef} scale = {props.scale} position={props.position}>
            <boxGeometry/>
            <meshStandardMaterial map={primaryTexture}/>
            <mesh ref={props.ref} scale = {[0.17,1,1]} position={[-.54,0,0]}>
              <boxGeometry/>
              <meshStandardMaterial map={secondaryTexture}/>
            </mesh>
            <mesh ref={props.ref} scale = {[0.17,0.38,1]} position={[.54,0,0]}>
              <boxGeometry/>
              <meshStandardMaterial map={secondaryTexture}/>
            </mesh>
        </mesh>
        </Interactive>
    )
}