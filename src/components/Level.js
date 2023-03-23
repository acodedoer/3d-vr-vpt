import Tile from "./Tile"

export const Level = () => {
    const tiles = [1,2,3,4,5];
    return(
        tiles.map((tile, i)=>
            tiles.map((tile, j)=>{
                return <Tile position={[(i-2)*2.25, 0, (j-2)*2.25]}/>
            }
            )
        )
    )   
}