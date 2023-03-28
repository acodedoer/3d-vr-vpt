import { TileModel } from './TileModel'

const Tile = (props) => {
    return(
        <mesh>
          <TileModel index={props.index} position={props.position}/>
        </mesh>
    )
}

export default Tile;