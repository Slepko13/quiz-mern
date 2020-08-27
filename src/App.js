import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import './App.scss';
import Start from './components/Start/Start';
import Quiz from './components/Quiz/Quiz';
import Result from './components/Result/Result';
import logo from '../src/assets/img/mern-logo.png';
import Questions from './components/Questions/Questions';
import NewQuestion from './components/Questions/NewQuestion/NewQuestion';
import EditQuestion from './components/Questions/EditQuestion/EditQuestion';
// import Login from './components/Login/Login';
import Login from './components/Login/LoginContainer';

import { authApi, questionsApi } from './api/api';
// import Navbar from './components/Navbar/Navbar';
import Navbar from './components/Navbar/NavbarContainer';

class App extends Component {

  state = {
    questions: [],
    editQuestion: null,
    runningQuestionIndex: 0,
    lastQuestionIndex: undefined,
    runningQuestion: undefined,
    userAnswer: undefined,
    score: 0,
    // isOpen: false,//?removed in customReducer`s state
    isAuth: false,
    token: undefined,
    loginMessage: null,
  }


  nextQuestion = this.nextQuestion.bind(this);
  resetState = this.resetState.bind(this);
  handleAnswer = this.handleAnswer.bind(this);
  getResult = this.getResult.bind(this);
  getQuestionsFromDB = this.getQuestionsFromDB.bind(this);
  removeQuestion = this.removeQuestion.bind(this);
  addNewQuestion = this.addNewQuestion.bind(this);
  editQuestion = this.editQuestion.bind(this);
  getQuestionById = this.getQuestionById.bind(this);
  // toggleModal = this.toggleModal.bind(this);
  login = this.login.bind(this);
  logout = this.logout.bind(this);

  componentDidMount() {
    this.getQuestionsFromDB();

    const token = localStorage.getItem('jwt');
    if (token) {
      this.setState({
        isAuth: true,
        token: localStorage.getItem('jwt')
      })
    }
  }


  async login(email, password) {
    try {
      // const response = await authApi.login(email, password);
      // localStorage.setItem('jwt', response.data.token);

      const { data: { token, message } } = await authApi.login(email, password);
      localStorage.setItem('jwt', token);

      console.log(token);
      this.setState({
        isAuth: true,
        token: localStorage.getItem('jwt'),
        loginMessage: message
      })
      this.getQuestionsFromDB();
    } catch (error) {
      this.setState({
        loginMessage: error.response.data.message,
        isAuth: false
      })
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.setState({
      isAuth: false,
      token: undefined,
      loginMessage: null
    })

  }

  //!get questions from Mongo DB (cloud)
  async getQuestionsFromDB() {
    try {
      const questions = await questionsApi.getQuestionsFromDB();
      this.setState({
        questions,
        lastQuestionIndex: questions.length - 1,
        runningQuestion: questions[0],
        editQuestion: undefined
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getQuestionById(id) {
    try {
      const question = await questionsApi.getQuestionById(id);
      this.setState({
        editQuestion: question
      })
    } catch (error) {
      console.log(error);
    }
  }

  async editQuestion(id, question, answer_1, answer_2, answer_3, answer_4, correct) {
    const token = localStorage.getItem('jwt');
    const editQuestion = {
      question: question,
      answers: [answer_1, answer_2, answer_3, answer_4],
      correct_answers: [correct]
    }
    try {
      await questionsApi.editQuestion(id, editQuestion, token);
      this.getQuestionsFromDB();
    } catch (error) {
      console.log(error);
    }
  }

  async removeQuestion(id) {
    const token = localStorage.getItem('jwt');
    try {
      await questionsApi.removeQuestion(id, token);
      await this.getQuestionsFromDB();
    } catch (error) {
      console.log(error);
    }
  }

  async addNewQuestion(question, answer_1, answer_2, answer_3, answer_4, correct) {
    const token = localStorage.getItem('jwt');
    axios.defaults.headers.common = { 'Authorization': token }

    const newQuestion = {
      question: question,
      answers: [answer_1, answer_2, answer_3, answer_4],
      correct_answers: [correct]
    }
    try {
      await questionsApi.addNewQuestion(newQuestion);
      this.getQuestionsFromDB();
    } catch (error) {
      console.log(error);
    }
  }

  nextQuestion() {
    if (this.state.userAnswer === this.state.runningQuestion.correct_answers[0]) {
      this.setState((prevState) => ({
        score: prevState.score++,
        count: 0
      }));
    }
    this.setState(state => ({
      runningQuestion: state.questions[state.runningQuestionIndex],
      runningQuestionIndex: state.runningQuestionIndex++,
      userAnswer: undefined,
      count: 0
    }));
  }

  getResult() {
    if (this.state.userAnswer === this.state.runningQuestion.correct_answers[0]) {
      this.setState((prevState) => ({
        score: prevState.score + 1
      }));
    }
  }

  resetState() {
    this.setState({
      questions: [],
      runningQuestionIndex: 0,
      lastQuestionIndex: undefined,
      runningQuestion: undefined,
      userAnswer: undefined,
      score: 0,
      // editQuestion: undefined

    })
  }

  handleAnswer(e) {
    this.setState({
      userAnswer: e.target.value
    })
  }
  //? Removed customActions 
  // toggleModal() {
  //   console.log(this.state.isOpen);
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   })
  // }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Navbar
              // toggleModal={this.toggleModal}
              // isOpen={this.state.isOpen}
              resetState={this.resetState}
              getQuestionsFromDB={this.getQuestionsFromDB}
              isAuth={this.state.isAuth}
            // logout={this.logout}
            />
            <Route path="/" exact >
              <Start
                getQuestionsFromDB={this.getQuestionsFromDB}
              />
            </Route>
            <Route path="/quiz">
              {this.state.questions.length ?
                <Quiz
                  runningQuestion={this.state.runningQuestion}
                  runningQuestionIndex={this.state.runningQuestionIndex}
                  lastQuestionIndex={this.state.lastQuestionIndex}
                  nextQuestion={this.nextQuestion}
                  handleAnswer={this.handleAnswer}
                  userAnswer={this.state.userAnswer}
                  getResult={this.getResult}
                /> :
                <div className="loading__data">Розпочни знову</div>
              }
            </Route>
            <Route path="/questions">
              <Questions
                questions={this.state.questions}
                removeQuestion={this.removeQuestion}
                getQuestionById={this.getQuestionById}
                token={this.state.token}
              />
            </Route>
            <Route path="/add">
              {this.state.token ?
                <NewQuestion
                  addNewQuestion={this.addNewQuestion}
                /> :
                <Redirect
                  to={'/login'}
                />
              }
            </Route>
            <Route path="/login">
              <Login
              // login={this.login}
              // loginMessage={this.state.loginMessage}
              // isAuth={this.state.isAuth}
              />
            </Route>
            <Route path="/edit/:id"
              history={this.history}>
              {this.state.editQuestion ?
                <EditQuestion
                  question={this.state.editQuestion}
                  editQuestion={this.editQuestion}
                /> :
                null}
            </Route>
            <Route path="/result">
              <Result
                score={this.state.score}
                total={this.state.questions.length}
              />
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
