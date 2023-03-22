import { PlayerModel } from './PlayerModel'

const Player = (props) => {
    return(
        <mesh>
          <PlayerModel position = {props.position}/>
        </mesh>
    )
}

export default Player;