import Tile from "./Tile"
import { Box } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Controllers, useHitTest, ARButton, XR } from '@react-three/xr'
import React, { ComponentProps } from 'react'

export const Level = () => {

    const tiles = [[1,1,1,0,0],[1,0,1,0,0],[1,1,1,1,1],[0,0,1,0,1],[0,0,1,1,1]];
    return(
       tiles.map((row, i)=>
            row.map((tile, j)=>{
                return tile?<Tile index={i*tiles[0].length + j} position={[(i-2)*2.25, 0, (j-2)*2.25]}/>:null
            }
            )
        )
    )
}