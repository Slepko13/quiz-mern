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
import Login from './components/Login/Login';

class App extends Component {

  state = {
    questions: [],
    runningQuestionIndex: 0,
    lastQuestionIndex: undefined,
    runningQuestion: undefined,
    userAnswer: undefined,
    score: 0,
    isOpen: false,
    isAuth: false,
    token: undefined,
    loginMessage: null,
    test: null
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
  toggleModal = this.toggleModal.bind(this);
  login = this.login.bind(this);
  logout = this.logout.bind(this);

  componentDidMount() {
    this.getQuestionsFromDB();

    let token = localStorage.getItem('jwt');
    if (token) {
      this.setState({
        isAuth: true,
        token: localStorage.getItem('jwt')
      })
    }

  }

  async login(email, password) {
    try {
      let response = await axios.post(`http://localhost:5000/auth/login`, { email, password });
      localStorage.setItem('jwt', response.data.token);
      console.log(response);
      this.setState({
        isAuth: true,
        token: localStorage.getItem('jwt'),
        loginMessage: response.data.message
      })
      this.getQuestionsFromDB();
    } catch (error) {
      this.setState({
        loginMessage: error.response.data.message,
        isAuth: false
      })
    }
  }

  async logout() {
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
      let response = await axios.get('http://localhost:5000/questions/');
      let q = response.data;
      this.setState({
        questions: q,
        lastQuestionIndex: q.length - 1,
        runningQuestion: q[0],
        editQuestion: undefined
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getQuestionById(id) {
    try {
      let response = await axios.get(`http://localhost:5000/questions/${id}`);
      let q = response.data;
      this.setState({
        editQuestion: q
      })
    } catch (error) {
      console.log(error);
    }
  }

  async editQuestion(id, question, answer_1, answer_2, answer_3, answer_4, correct) {
    let token = localStorage.getItem('jwt');
    const editQuestion = {
      question: question,
      answers: [answer_1, answer_2, answer_3, answer_4],
      correct_answers: [correct]
    }
    try {

      await axios.post(`http://localhost:5000/questions/update/${id}`, editQuestion, { headers: { Authorization: token } });
      this.getQuestionsFromDB();
    } catch (error) {
      console.log(error);
    }
  }

  async removeQuestion(id, history) {
    let token = localStorage.getItem('jwt');

    try {
      await axios.delete(`http://localhost:5000/questions/${id}`, { headers: { Authorization: token } });
      await this.getQuestionsFromDB();
    } catch (error) {
      console.log(error);
    }



  }

  async addNewQuestion(question, answer_1, answer_2, answer_3, answer_4, correct) {
    let token = localStorage.getItem('jwt');
    axios.defaults.headers.common = { 'Authorization': token }

    const newQuestion = {
      question: question,
      answers: [answer_1, answer_2, answer_3, answer_4],
      correct_answers: [correct]
    }
    try {
      await axios.post(`http://localhost:5000/questions/add`,
        newQuestion

      );
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
      editQuestion: undefined

    })
  }

  handleAnswer(e) {
    this.setState({
      userAnswer: e.target.value
    })
  }

  toggleModal() {
    this.setState({
      isOpen: ~this.state.isOpen
    })
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
              <a className="navbar-brand " href="http://www.google.com" target="blank">
                <img src={logo} alt="logo" width="150" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                onClick={this.toggleModal}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={this.state.isOpen ? "navbar-collapse collapse show justify-content-end" :
                "navbar-collapse collapse justify-content-end"}>
                <ul className="navbar-nav  ">
                  <li className="navbar-item">
                    <Link
                      to="/"
                      className="nav-link"
                      onClick={this.resetState}
                    >Розпочати знову</Link>
                  </li>
                  <li className="navbar-item">
                    <Link
                      to="/questions"
                      className="nav-link"
                      onClick={this.getQuestionsFromDB}
                    >Редагувати опитувальник</Link>
                  </li>
                  {this.state.isAuth ?
                    <li className="navbar-item">
                      <Link
                        to="/"
                        className="nav-link"
                        onClick={this.logout}
                      >Вийти з системи</Link>
                    </li> :
                    <Link
                      to="/login"
                      className="nav-link"
                    >Увійти</Link>}
                </ul>
              </div>
            </nav>
            <Route path="/" exact >
              <Start
                getQuestions={this.getQuestions}//!get questions with import from local json file
                getQuestionsAxios={this.getQuestionsAxios}//!get questions with axios from local json file
                getQuestionsFromDB={this.getQuestionsFromDB}//!get questions from Mongo DB(cloud)
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
                login={this.login}
                loginMessage={this.state.loginMessage}
                isAuth={this.state.isAuth}
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
