import { connect } from 'react-redux';
import Quiz from './Quiz';
import { handleAnswer, nextQuestionThunk, getResultThunk } from '../../redux/actions/questionsActions';


const mapStateToProps = state => {
    return {
        runningQuestion: state.questions.runningQuestion,
        runningQuestionIndex: state.questions.runningQuestionIndex,
        lastQuestionIndex: state.questions.lastQuestionIndex,
        userAnswer: state.questions.userAnswer,
        score: state.questions.score
    }
}

export default connect(mapStateToProps, { handleAnswer, nextQuestionThunk, getResultThunk })(Quiz);