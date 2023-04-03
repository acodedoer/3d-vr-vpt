import { PickupModel } from './PickupModel';
import { TileModel } from './TileModel'
import { state } from "../State";
import {useSnapshot} from "valtio";
import { useEffect, useState } from 'react';

const Tile = (props) => {
  const [visible, setVisible] = useState(true);
  const {playerPos} = useSnapshot(state);

  useEffect(()=>{
    if(visible){
      playerPos[0]===props.data[0] && playerPos[1]===props.data[1]?setVisible(false):setVisible(true);
    }
  },[playerPos])

    return(
        <mesh>
          {visible?<PickupModel position={[props.position[0],props.position[1]+2,props.position[2]]} scale={[0.5,0.5,0.5]}/>:null}
          <TileModel index={props.index} position={props.position}/>
        </mesh>
    )
}

export default Tile;