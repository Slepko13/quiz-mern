import { connect } from 'react-redux';
import App from './App';
import { getQuestionsFromDBThunk } from './redux/actions/questionsActions';
import { tokenTrue } from './redux/actions/authActions';


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        questions: state.questions.questions,
        runningQuestionIndex: state.questions.runningQuestionIndex,
        lastQuestionIndex: state.questions.lastQuestionIndex,
        runningQuestion: state.questions.runningQuestion,
        userAnswer: state.questions.userAnswer,
        editQuestion: state.questions.editQuestion,
        score: state.questions.score,
        editQuestion: state.questions.editQuestion
    }
}

export default connect(mapStateToProps, { getQuestionsFromDBThunk, tokenTrue })(App);