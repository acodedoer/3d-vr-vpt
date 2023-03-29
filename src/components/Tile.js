import { PickupModel } from './PickupModel';
import { TileModel } from './TileModel'

const Tile = (props) => {
    return(
        <mesh>
          <PickupModel position={[props.position[0],props.position[1]+2,props.position[2]]} scale={[0.5,0.5,0.5]}/>
          <TileModel index={props.index} position={props.position}/>
        </mesh>
    )
}

export default Tile;