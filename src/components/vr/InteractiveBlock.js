import { Interactive} from '@react-three/xr'
import { Block } from './Block'

export const InteractiveBlock = (props) => {
    return(
        <Interactive>
          <Block myRef={props.myRef} transparency={props.transparency} type={props.type} scale = {props.scale} position={props.position}/>
        </Interactive>
    )
}
