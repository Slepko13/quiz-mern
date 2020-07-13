import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './Start.scss';


const Start = ({ getQuestions, getQuestionsAxios, getQuestionsFromDB }) => {
    return (
        <div className="Start  bg-dark">
            <p className="title">Перевір наскільки ти кіберспортивний експерт</p>
            <div className="button__wrapper">
                <button className=" btn btn-primary">
                    <Link
                        to="/quiz"
                        className="link"
                        // onClick={getQuestionsAxios}//!get questions with axios from local json file
                        // onClick={() => { getQuestions(questions) }}//!get questions with import from local json file
                        onClick={getQuestionsFromDB}//!get questions  from Mongo DB

                    >Розпочни тест</Link>
                </button>
            </div>
        </div>
    );
}

export default Start;