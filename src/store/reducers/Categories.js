const init_State = {
    AllCategories: [],
    Loading: false,
    Error:''
}
export default (state = init_State, action) => {
    switch (action.type) {
        case 'GettingCategories':
            return { ...state, Loading: action.payload, Error: '' }
        case 'GettedCategories':
            return { ...state, Loading: false, Error: '', AllCategories: action.payload }
        case 'ErorrCategories':
            return { ...state, Loading: false, Error: action.payload }
        default:
            return state
    }
}