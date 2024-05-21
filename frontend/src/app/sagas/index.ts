import { all } from 'redux-saga/effects';
import songSaga from './songs';
import { statsSaga } from './stats';

export default function* rootSaga() {
    yield all([songSaga(), statsSaga()]);
}
