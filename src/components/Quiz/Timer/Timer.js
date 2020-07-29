import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import './Timer.scss';



const Timer = ({ nextQuestion, lastQuestionIndex, runningQuestionIndex, history, getResult }) => {
    let [count, setCount] = useState(0);
    useEffect(() => {
        setCount(0);

    }, [runningQuestionIndex]);

    useEffect(() => {
        let id = setInterval(() => {
            setCount(count + 1);
        }, 1000);
        if (count === 10) {
            runningQuestionIndex <= lastQuestionIndex - 1 ?
                setTimeout(() => {
                    nextQuestion();
                    setCount(0);
                }, 1000) :
                setTimeout(() => {
                    getResult();
                    history.push('./result')
                }, 1000)
        }
        return () => clearInterval(id);
    }, [count, nextQuestion, getResult, history, lastQuestionIndex, runningQuestionIndex]);
    return (
        <div className="Timer">
            <div
                className="counter"
            >{count}</div>
            <div className="btimeGauge">
                <div className="timeGauge" style={{ width: `${count * 25}px` }}></div>
            </div>
        </div>
    );
}

export default withRouter(Timer);
