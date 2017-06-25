import { authSagas } from 'modules/auth';
import { noteSagas } from 'modules/notes';
import {all} from 'redux-saga/effects';

export default function* sagas() {
  yield all([
      authSagas(),
      noteSagas()
  ]);
}
