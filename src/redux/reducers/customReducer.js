import { TOGGLE_MODAL } from '../constants/constants';

const initialState = {
    // questions: [],
    // runningQuestionIndex: 0,
    // lastQuestionIndex: undefined,
    // runningQuestion: undefined,
    isOpen: false,
    score: 0,



}

const customReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen
            }
        default:
            return state
    }

}

export default customReducer;