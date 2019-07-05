const init_State = {
    AllMarkers: [],
    Loading: false,
    Error:''
}
export default (state = init_State, action) => {
    switch (action.type) {
        case 'GettingMarkers':
            return { ...state, Loading: action.payload, Error: '' }
        case 'GettedMarkers':
            return { ...state, Loading: false, Error: '', AllMarkers: action.payload }
        case 'ErorrMarkers':
            return { ...state, Loading: false, Error: action.payload }
        default:
            return state
    }
}