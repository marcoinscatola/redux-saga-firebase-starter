import { authSagas } from 'modules/auth';
import {all} from 'redux-saga/effects';

export default function* sagas() {
  yield all([authSagas()]);
}
