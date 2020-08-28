import { connect } from 'react-redux';
import NewQuestion from './NewQuestion';
import { addNewQuestionThunk } from '../../../redux/actions/questionsActions';




export default connect(null, { addNewQuestionThunk })(NewQuestion);