import {combineReducers} from 'redux';
import {authReducer as auth} from 'modules/auth';
import {noteReducer as notes} from 'modules/notes';
import {i18nReducer as i18n} from 'modules/i18n';
export default combineReducers({
    auth,
    notes,
    i18n
});
