import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../assets/img/mern-logo.png';
import { Link } from 'react-router-dom';




import './Navbar.scss';

const Navbar = ({ toggleModal, isOpen, resetState, getQuestionsFromDB, isAuth, logout }) => {
    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <a className="navbar-brand " href="http://www.google.com" target="blank">
                    <img src={logo} alt="logo" width="150" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleModal}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={isOpen ? "navbar-collapse collapse show justify-content-end" :
                    "navbar-collapse collapse justify-content-end"}>
                    <ul className="navbar-nav  ">
                        <li className="navbar-item">
                            <Link
                                to="/"
                                className="nav-link"
                                onClick={resetState}
                            >Розпочати знову</Link>
                        </li>
                        <li className="navbar-item">
                            <Link
                                to="/questions"
                                className="nav-link"
                                onClick={getQuestionsFromDB}
                            >Редагувати опитувальник</Link>
                        </li>
                        {isAuth ?
                            <li className="navbar-item">
                                <Link
                                    to="/"
                                    className="nav-link"
                                    onClick={logout}
                                >Вийти з системи</Link>
                            </li> :
                            <Link
                                to="/login"
                                className="nav-link"
                            >Увійти</Link>}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;