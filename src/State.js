import { proxy, useProxy } from 'valtio'
export const state = proxy({ 
    level: 1, 
    score:0,
    code: [], 
    executing: false,
    currentPlayerPosition:[null]
})

export const setCode = ( blocks ) => {
    state.code = blocks;
}

export const setExecuting = ( value ) => {
    state.executing = value;
}

export const setCurrentPlayerPosition = ( value ) => {
    state.currentPlayerPosition = value;
}

export const incrementScore = () => {
    state.score += 1;
}

export const resetScore = () => {
    state.score = 0;
}

export const nextLevel = () => {
    state.level += 1;
}