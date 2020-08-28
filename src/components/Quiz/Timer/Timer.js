import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import './Timer.scss';



const Timer = ({ nextQuestionThunk, getResultThunk, userAnswer, correct,
    lastQuestionIndex, runningQuestionIndex, history, }) => {
    let [count, setCount] = useState(0);
    useEffect(() => {
        setCount(0);
    }, [runningQuestionIndex]);

    useEffect(() => {
        let id = setInterval(() => {
            setCount(count + 1);
        }, 1000);
        if (count === 5) {
            runningQuestionIndex <= lastQuestionIndex - 1 ?
                setTimeout(() => {
                    nextQuestionThunk(userAnswer, correct);
                    setCount(0);
                }, 1000) :
                setTimeout(() => {
                    getResultThunk(userAnswer, correct);
                    history.push('./result')
                }, 1000)
        }
        return () => clearInterval(id);
    }, [count, history, lastQuestionIndex, runningQuestionIndex, nextQuestionThunk, getResultThunk]);
    return (
        <div className="Timer">
            <div
                className="counter"
            >{count}</div>
            <div className="btimeGauge">
                <div className="timeGauge" style={{ width: `${count * 50}px` }}></div>
            </div>
        </div>
    );
}

export default withRouter(Timer);
