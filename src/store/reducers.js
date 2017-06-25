import {combineReducers} from 'redux';
import {authReducer as auth} from 'modules/auth';
import {noteReducer as notes} from 'modules/notes';
export default combineReducers({
    auth,
    notes
});
