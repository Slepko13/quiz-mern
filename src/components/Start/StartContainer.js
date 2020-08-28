import { connect } from 'react-redux';
import Start from './Start';
import { getQuestionsFromDBThunk } from '../../redux/actions/questionsActions';


export default connect(null, { getQuestionsFromDBThunk })(Start);


