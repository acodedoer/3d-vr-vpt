import { PickupModel } from './PickupModel';
import { TileModel } from './TileModel'
import { state,incrementScore } from "../State";
import {useSnapshot} from "valtio";
import { useEffect, useState } from 'react';
import { LEVELS } from "../Levels";

const Tile = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const {currentPlayerPosition,level} = useSnapshot(state);
  const [initialPlayerPosition] = useState(LEVELS[level]["player"]);

  const pickPickup = () => {
    setVisible(false);
    incrementScore();
  }

  useEffect(()=>{
    setVisible(props.visible)
  }, [props.visible])
  
  useEffect(()=>{
    if(visible){
      (initialPlayerPosition[0]/2===props.data[0] && initialPlayerPosition[2]/2===props.data[1])?setVisible(false):
      (currentPlayerPosition[0]/2===props.data[0] && currentPlayerPosition[1]/2===props.data[1]) ?
      pickPickup():setVisible(true);
    }
  },[currentPlayerPosition,initialPlayerPosition])

    return(
        <mesh>
          {visible?<PickupModel position={[props.position[0],props.position[1]+2,props.position[2]]} scale={[0.5,0.5,0.5]}/>:null}
          <TileModel index={props.index} position={props.position}/>
        </mesh>
    )
}

export default Tile;