import React from 'react';
import './Questions.scss';
import { Link, withRouter } from 'react-router-dom';

let Questions = ({ questions, history, token,
    removeQuestionThunk, getQuestionByIdThunk }) => {
    return (
        <div className="Questions">
            <div className="title">
                Оберіть запитання для редагування
            </div>
            <div className="new__question">
                <Link
                    to="/add"
                    className="new__question-link"
                > Додати нове запитання</Link>
            </div>
            <div className="questions">
                {questions.map((question, index) => {

                    return (
                        <div key={question.question + index} className="question">
                            <div className="question__title">{question.question}</div>
                            <div className="button__wrapper d-flex">
                                {token ?
                                    <button
                                        className="question__delete btn btn-danger m-2"
                                        onClick={() => { removeQuestionThunk(question._id) }}
                                    >Видалити</button>
                                    :
                                    <button
                                        className="question__delete btn btn-danger m-2"
                                        onClick={() => { history.push('/login') }}
                                    >Видалити</button>
                                }
                                <button
                                    className="question__edit btn btn-warning m-2">
                                    {token ?
                                        <Link
                                            style={{ color: "white", textDecoration: "none" }}
                                            onClick={() => { getQuestionByIdThunk(question._id) }}
                                            to={'/edit/' + question._id}
                                        >Редагувати</Link>
                                        :
                                        <Link
                                            style={{ color: "white", textDecoration: "none" }}
                                            to={'/login'}
                                        > Редагувати</Link>
                                    }
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}
Questions = withRouter(Questions);
export default Questions;