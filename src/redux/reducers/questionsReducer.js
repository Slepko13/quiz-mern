import { REMOVE_QUESTION } from '../constants/constants';

const initialState = {
    questions: [],
    runningQuestionIndex: 0,
    lastQuestionIndex: undefined,
    runningQuestion: undefined,
    userAnswer: undefined,


}

const questionsReducer = (state = initialState, action) => {

    switch (action.type) {
        case REMOVE_QUESTION:
            return {
                ...state
            }
        default:
            return state
    }


}

export default questionsReducer;