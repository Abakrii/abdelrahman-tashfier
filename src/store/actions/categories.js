import Axois from 'axios';

export const GetAllCategories = () => {
    return async (dispatch) => {
        dispatch({ type: 'GettingCategories', payload: true })
        Axois.get('http://storage1.tashfier.com/Categories.js')
            .then((e) => {
                const tex = 'export const Categories = '
                const finaldataString = e.data.replace(tex, '')
                const f = eval(finaldataString)
                dispatch({ type: 'GettedCategories', payload: f })
            })
            .catch((r) => {
                dispatch({ type: 'ErorrCategories', payload: r })
            })
    }
}
