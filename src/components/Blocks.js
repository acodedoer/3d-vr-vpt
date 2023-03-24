import { ChildBlock } from "./ChildBlock"
import { ItemTypes } from "../Constants"
import { useState } from "react"

export const Blocks = () =>{
    const [blocks] = useState([
        { name: 'Forward', type: ItemTypes.FORWARD },
        { name: 'Right', type: ItemTypes.RIGHT },
        { name: 'Left', type: ItemTypes.LEFT },
      ])
      return(
        <>
        {blocks.map(({ name, type }, index) => (
          <ChildBlock
            name={name}
            type={type}
            key={index}
          />
        ))}
        </>
      )
}