import { connect } from 'react-redux';
import EditQuestion from './EditQuestion';
import { editQuestionThunk, getQuestionsFromDBThunk } from '../../../redux/actions/questionsActions';



const mapStateToProps = (state) => {
    return {
        question: state.questions.editQuestion
    }
}

export default connect(mapStateToProps, { editQuestionThunk, getQuestionsFromDBThunk })(EditQuestion);