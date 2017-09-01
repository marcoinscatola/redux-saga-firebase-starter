import IntlMessageFormat from 'intl-messageformat';
import Intl from 'intl';
import * as i18nActions from './actions';
import * as i18nSelectors from './selectors';
import {makeCollection, localize} from './utils';

global.IntlMessageFormat = IntlMessageFormat;
global.Intl = Intl

require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/it.js');
// add more requires here to support more locales (for number/date formatting)

require('intl-messageformat/dist/locale-data/it')
// add more requires here to support more locales (for pluralization rules)


export {i18nActions, i18nSelectors};

export {default as i18nReducer} from './reducer'

export {default as FormattedMessage} from './FormattedMessage'

export {makeCollection, localize};