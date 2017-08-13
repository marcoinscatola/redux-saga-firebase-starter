import * as i18nActions from './actions';
import * as i18nSelectors from './selectors';
import {init} from './config';
export {i18nActions, i18nSelectors};

export {default as i18nReducer} from './reducer'

init();
