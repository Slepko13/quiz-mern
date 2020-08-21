const initialState = {
    questions: [],
    runningQuestionIndex: 0,
    lastQuestionIndex: undefined,
    runningQuestion: undefined,
    userAnswer: undefined,
    score: 0,
    isOpen: false,
    isAuth: false,
    token: undefined,
    loginMessage: null
}

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    return newState;


}

export default reducer;