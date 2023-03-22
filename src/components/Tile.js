import { TileModel } from './TileModel'

const Tile = (props) => {
    return(
        <mesh>
          <TileModel position={props.position}/>
        </mesh>
    )
}

export default Tile;