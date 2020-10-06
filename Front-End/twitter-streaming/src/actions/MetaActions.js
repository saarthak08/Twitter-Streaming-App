

export const setMeta = ({meta={}}={}) => ({
    type:'SET_META',
    meta
});

export const clearMeta = () => ({
    type:'CLEAR_META'
});