import {combineReducers} from 'redux';
import {authReducer as auth} from 'modules/auth';

export default combineReducers({
    auth
});
