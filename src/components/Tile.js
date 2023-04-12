import { PickupModel } from './PickupModel';
import { TileModel } from './TileModel'
import { state,incrementScore, setExecuting, setAnimateFall } from "../State";
import {useSnapshot} from "valtio";
import { useEffect, useState } from 'react';
import { LEVELS } from "../Levels";
import { render } from '@testing-library/react';

const Tile = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const {currentPlayerPosition,level,executing} = useSnapshot(state);
  const [initialPlayerPosition,setInitialPlayerPosition] = useState(LEVELS[level]["player"]);

  const pickPickup = () => {
    setVisible(false);
    incrementScore();
  }
  
  useEffect(()=>{
    if(visible){
      if (currentPlayerPosition[0]/2===props.data[0] && currentPlayerPosition[1]/2===props.data[1])
      {
        props.render && pickPickup()
      }
    }

    if(!props.render && currentPlayerPosition[0]/2===props.data[0] && currentPlayerPosition[1]/2===props.data[1]){
      setAnimateFall(true);
    }

  },[currentPlayerPosition,initialPlayerPosition])

  useEffect(()=>{
    !executing && setVisible(true)
    if(initialPlayerPosition[0]/2===props.data[0] && initialPlayerPosition[2]/2===props.data[1])
    {
      setVisible(false) 
    }
  },[level, executing])
 
    return(
        <mesh>
          {visible?<PickupModel render={props.render} position={[props.position[0],props.position[1]+2,props.position[2]]} scale={[0.5,0.5,0.5]}/>:null}
          <TileModel index={props.index} render={props.render} position={props.position}/>
        </mesh>
    )
}

export default Tile;