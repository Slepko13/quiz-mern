import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import authReducer from '../reducers/authReducer';
import customReducer from '../reducers/customReducer';
import questionsReducer from '../reducers/questionsReducer';
import createSagaMiddleware from 'redux-saga';
import sagaWatcher from '../sagas/sagas';
import thunkMiddleware from 'redux-thunk';


const saga = createSagaMiddleware();
const rootReducer = combineReducers({
    auth: authReducer,
    custom: customReducer,
    questions: questionsReducer
})
const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

// saga.run(sagaWatcher);
window.store = store;
export default store;
