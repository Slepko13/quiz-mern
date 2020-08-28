import { questionsApi } from '../../api/api';
import axios from 'axios';
import {
    GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILED,
    GET_QUESTION_BY_ID_SUCCESS, GET_QUESTION_BY_ID_FAILED,
    ADD_QUESTION_SUCCESS, ADD_QUESTION_FAILED,
    REMOVE_QUESTION_FAILED, REMOVE_QUESTION_SUCCESS,
    UPDATE_QUESTION_SUCCESS, UPDATE_QUESTION_FAILED,
    RESET_STATE, HANDLE_ANSWER,
    GET_RESULT, NEXT_QUESTION

} from '../constants/constants';


//! GET QUESTIONS FROM DB

const getQuestionsFromDB_success = (questions) => {
    return {
        type: GET_QUESTIONS_SUCCESS,
        questions
    }
}
const getQuestionsFromDB_failed = (message) => {
    return {
        type: GET_QUESTIONS_FAILED,
        message
    }
}

export const getQuestionsFromDBThunk = () => {
    return async dispatch => {
        try {
            const questions = await questionsApi.getQuestionsFromDB();
            dispatch(getQuestionsFromDB_success(questions));
            console.log("Get questions from DB thunk");
        } catch (error) {
            // dispatch(getQuestionsFromDB_failed(error.response.data.message));
            console.log(error);

        }
    }
}

//! GET QUESTION BY ID

const getQuestionById_success = (editQuestion) => {
    return {
        type: GET_QUESTION_BY_ID_SUCCESS,
        editQuestion
    }
}
const getQuestionById_failed = (message) => {
    return {
        type: GET_QUESTION_BY_ID_FAILED,
        message
    }
}
export const getQuestionByIdThunk = (id) => {
    return async dispatch => {
        try {
            const editQuestion = await questionsApi.getQuestionById(id);
            dispatch(getQuestionById_success(editQuestion));
            console.log("Get questions by ID thunk");

        } catch (error) {
            //    dispatch(getQuestionById_failed(error.response.data.message));
            console.log(error);
        }

    }
}

//!EDIT QUESTION

export const editQuestionThunk = (id, question, answer_1, answer_2, answer_3, answer_4, correct) => {
    return async dispatch => {
        const token = localStorage.getItem('jwt');
        const editQuestion = {
            question: question,
            answers: [answer_1, answer_2, answer_3, answer_4],
            correct_answers: [correct]
        }
        try {
            await questionsApi.editQuestion(id, editQuestion, token);
            console.log("EDIT question thunk");

            dispatch(getQuestionsFromDBThunk());

        } catch (error) {
            console.log(error);
        }
    }
}

//!REMOVE QUESTION 
export const removeQuestionThunk = (id) => {
    return async dispatch => {
        const token = localStorage.getItem('jwt');
        try {
            await questionsApi.removeQuestion(id, token);
            dispatch(getQuestionsFromDBThunk());
            console.log("REMOVE question  thunk");

        } catch (error) {
            console.log(error);
        }
    }
}

//!ADD NEW QUESTION 
export const addNewQuestionThunk = (question, answer_1, answer_2, answer_3, answer_4, correct) => {
    return async dispatch => {
        const token = localStorage.getItem('jwt');
        axios.defaults.headers.common = { 'Authorization': token }
        const newQuestion = {
            question: question,
            answers: [answer_1, answer_2, answer_3, answer_4],
            correct_answers: [correct]
        }
        try {
            await questionsApi.addNewQuestion(newQuestion);
            dispatch(getQuestionsFromDBThunk());
            console.log("ADD question thunk");

        } catch (error) {
            console.log(error);
        }
    }
}

//!RESET STATE
export const resetState = () => {
    return {
        type: RESET_STATE
    }
}

//!HANDLE ANSWER 
export const handleAnswer = (e) => {
    return {
        type: HANDLE_ANSWER,
        answer: e.target.value
    }
}


//!NEXT QUESTION
export const nextQuestionThunk = (userAnswer, correct) => {
    return dispatch => {
        if (userAnswer === correct) {
            dispatch(getResult())
        }
        dispatch(nextQuestion())
        console.log("NEXT  thunk");

    }
}

export const getResultThunk = (userAnswer, correct) => {
    return dispatch => {
        if (userAnswer === correct) {
            dispatch(getResult())
        }
        console.log("RESULT thunk");

    }
}
const getResult = () => {
    return {
        type: GET_RESULT
    }
}

const nextQuestion = () => {
    return {
        type: NEXT_QUESTION
    }
}