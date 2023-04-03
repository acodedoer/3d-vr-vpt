import { proxy, useProxy } from 'valtio'
export const state = proxy({ 
    level: 0, 
    code: [], 
    executing: false,
    playerPos:[0,0]
})

export const setCode = ( blocks ) => {
    state.code = blocks;
}

export const setExecuting = ( value ) => {
    state.executing = value;
}

export const setPlayerPos = ( value ) => {
    state.playerPos = value;
}