import {
    GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILED,
    GET_QUESTION_BY_ID_SUCCESS, GET_QUESTION_BY_ID_FAILED,
    RESET_STATE, HANDLE_ANSWER,
    GET_RESULT, NEXT_QUESTION
} from '../constants/constants';

const initialState = {
    questions: [],
    runningQuestionIndex: 0,
    lastQuestionIndex: null,
    runningQuestion: null,
    editQuestion: null,
    userAnswer: null,
    score: 0,



}

const questionsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: action.questions,
                lastQuestionIndex: action.questions.length - 1,
                runningQuestion: action.questions[0],
            }
        case GET_QUESTIONS_FAILED:
            return { ...state }

        case GET_QUESTION_BY_ID_SUCCESS:
            return {
                ...state,
                editQuestion: action.editQuestion
            }
        case GET_QUESTION_BY_ID_FAILED:
            return { ...state }
        case RESET_STATE:
            return {
                ...state,
                questions: [],
                runningQuestionIndex: 0,
                lastQuestionIndex: null,
                runningQuestion: null,
                userAnswer: null,
                score: 0,
            }
        case HANDLE_ANSWER:
            return {
                ...state,
                userAnswer: action.answer
            }

        case NEXT_QUESTION:
            return {
                ...state,
                runningQuestion: state.questions[state.runningQuestionIndex],
                runningQuestionIndex: state.runningQuestionIndex++,
                userAnswer: null,
                count: 0

            }
        case GET_RESULT:
            return {
                ...state,
                score: state.score + 1,
                count: 0

            }
        default:
            return state
    }


}

export default questionsReducer;