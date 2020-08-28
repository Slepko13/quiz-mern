import { connect } from 'react-redux';
import { removeQuestionThunk, getQuestionByIdThunk } from '../../redux/actions/questionsActions';
import Questions from './Questions';



const mapStateToProps = state => {
    return {
        token: state.auth.token,
        questions: state.questions.questions
    }

}

export default connect(mapStateToProps, { removeQuestionThunk, getQuestionByIdThunk })(Questions);