import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';

import Start from './components/Start/StartContainer';
import Navbar from './components/Navbar/NavbarContainer';
import Login from './components/Login/LoginContainer';
import Questions from './components/Questions/QuestionsContainer';
import EditQuestion from './components/Questions/EditQuestion/EditQuestionContainer';
import NewQuestion from './components/Questions/NewQuestion/NewQuestionContainer';
import Quiz from './components/Quiz/QuizContainer';
import Result from './components/Result/ResultContainer';


class App extends Component {
    // constructor(props) {
    //     super(props)
    // }
    componentDidMount() {
        this.props.getQuestionsFromDBThunk();
        const token = localStorage.getItem('jwt');
        if (token) {
            this.props.tokenTrue(token);
        }
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Navbar />
                        <Route path="/" exact >
                            <Start />
                        </Route>
                        <Route path="/quiz">
                            {this.props.questions.length ?
                                <Quiz /> :
                                <div className="loading__data">Розпочни знову</div>
                            }
                        </Route>
                        <Route path="/questions">
                            <Questions />
                        </Route>
                        <Route path="/add">
                            {this.props.token ?
                                <NewQuestion /> :
                                <Redirect
                                    to={'/login'}
                                />
                            }
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/edit/:id"
                            history={this.history}>
                            {this.props.editQuestion ?
                                <EditQuestion /> :
                                null}
                        </Route>
                        <Route path="/result">
                            <Result />
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }
}



export default App;
