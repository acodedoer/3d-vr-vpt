import { SourceBlock } from "./SourceBlock"
import { ItemTypes } from "../Constants"
import {  useState } from "react"

export const SourceBlocks = (props) =>{

    const [blocks] = useState([
        { name: 'Forward', type: ItemTypes.FORWARD },
        { name: 'Right', type: ItemTypes.RIGHT },
        { name: 'Left', type: ItemTypes.LEFT },
      ])

      return(
        <>
        {
        blocks.map(({ name, type }, index) => (
          <SourceBlock
            name={name}
            type={type}
            key={index}
            setDragged = {props.setBusy}
          />
        ))
      }
        </>
      )
}