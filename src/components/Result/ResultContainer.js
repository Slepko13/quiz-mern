import { connect } from 'react-redux';
import Result from './Result';



const mapStateToProps = state => {
    return {
        score: state.questions.score,
        total: state.questions.questions.length
    }
}

export default connect(mapStateToProps, null)(Result);