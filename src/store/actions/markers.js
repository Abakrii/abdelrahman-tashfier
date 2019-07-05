import Axois from 'axios';

export const GetAllMarkers = () => {
    return async (dispatch) => {
        dispatch({ type: 'GettingMarkers', payload: true })
        Axois.get('http://storage1.tashfier.com/Markers.js')
            .then((e) => {
                const tex = 'export const Markers = '
                const finaldataString = e.data.replace(tex, '')
                const f = eval(finaldataString)
                dispatch({ type: 'GettedMarkers', payload: f })
            })
            .catch((r) => {
                dispatch({ type: 'ErorrMarkers', payload: r })
            })
    }
}
