import { proxy, useProxy } from 'valtio'
export const state = proxy({ 
    level: 0, 
    score:0,
    code: [], 
    executing: true,
    currentPlayerPosition:[null],
    placeholderIndex: undefined,
    selected:undefined,
    draggedIndex:null,
    animateNextLevel: false,
    animateFall:false,
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

export const setPlaceholderIndex = (value) => {
    state.placeholderIndex = value;
}

export const setSelectedBlock = (value) => {
    state.selected = value;
}

export const setDraggedIndexState = (value) => {
    state.draggedIndex = value;
}

export const setAnimateNextLevel = (value) => {
    state.animateNextLevel = value;
}
export const setAnimateFall = (value) => {
    state.animateFall = value;
}