import { PickupModel } from "./PickupModel"

export const Pickup = (props) => {
    return(
        <PickupModel position = {props.position} scale = {props.scale}/>
    )
}