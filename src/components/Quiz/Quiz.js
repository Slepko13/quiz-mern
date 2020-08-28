import React from 'react';
import './Quiz.scss';
import { Link } from 'react-router-dom';
import Timer from './Timer/Timer';

const Quiz = ({
    runningQuestion: { question, answers, correct_answers: [correct] },
    runningQuestionIndex, lastQuestionIndex, score,
    userAnswer, handleAnswer,
    nextQuestionThunk, getResultThunk
}) => {
    console.log("runningQuestionIndex", runningQuestionIndex);

    return (
        <div className="Quiz">
            <div className="title">
                <div className="question">Запитання № {runningQuestionIndex + 1}</div>
                <div className="question">{question}</div>
            </div>
            <form action="" className="form">
                <div className="form-group">
                    {answers.map(answer => {
                        return (
                            <div key={answer} className="form-check ">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="question"
                                    id={answer}
                                    value={answer}
                                    checked={userAnswer === answer}
                                    onChange={handleAnswer}
                                />
                                <label htmlFor={answer} className="form-check-label">{answer}</label>
                            </div>
                        )
                    })}
                </div>
            </form>
            <div className="bottom__wrapper">
                <Timer
                    nextQuestionThunk={nextQuestionThunk}
                    runningQuestionIndex={runningQuestionIndex}
                    lastQuestionIndex={lastQuestionIndex}
                    getResultThunk={getResultThunk}
                    userAnswer={userAnswer}
                    correct={correct}
                />
                <div className="progress__wrapper">
                    <div className="prog">Прогрес: {runningQuestionIndex + 1}/{lastQuestionIndex + 1}</div>
                    {runningQuestionIndex <= lastQuestionIndex - 1 ?
                        <button
                            onClick={() => { nextQuestionThunk(userAnswer, correct) }}
                            className="btn btn-primary result__button"
                        >Наступне запитання</button> :
                        <button className="result__button btn btn-danger">
                            <Link
                                to='/result'
                                className="result__link"
                                onClick={() => { getResultThunk(userAnswer, correct) }}
                            > Отримати результат</Link>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Quiz;