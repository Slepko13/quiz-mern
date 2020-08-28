import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './Start.scss';


const Start = ({ getQuestionsFromDBThunk }) => {
    return (
        <div className="Start  bg-dark">
            <p className="title">Перевір наскільки ти кіберспортивний експерт</p>
            <div className="button__wrapper">
                <button className=" btn btn-primary">
                    <Link
                        to="/quiz"
                        className="link"
                        onClick={getQuestionsFromDBThunk}
                    >Розпочни тест</Link>
                </button>
            </div>
        </div>
    );
}

export default Start;