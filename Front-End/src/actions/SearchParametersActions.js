

export const setParams = ({query='',startTime=''}={})=> {
    return {
        type:'SET_PARAMS',
        query,
        startTime,
    }
}

export const clearParams = () => {
    return {
        type:'CLEAR_PARAMS'
    }
}