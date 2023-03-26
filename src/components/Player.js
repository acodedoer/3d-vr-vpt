import { PlayerModel } from './PlayerModel'

const Player = (props) => {
    return(
        <mesh>
          <PlayerModel running={props.running} program={[props.program]} position = {props.position}/>
        </mesh>
    )
}

export default Player;