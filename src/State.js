import { proxy, useProxy } from 'valtio'
export const state = proxy({ 
    level: 0, 
    code: [], 
    executing: false
})

export const setCode = ( blocks ) => {
    state.code = blocks;
}

export const setExecuting = ( value ) => {
    state.executing = value;
}