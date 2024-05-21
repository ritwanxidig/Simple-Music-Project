import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure, StatsData } from '../slices/statsSlice';

const baseURL = import.meta.env.VITE_BASE_URL;

function* fetchStats() {
    try {
        const response: Response = yield call(fetch, `${baseURL}/stats`);
        const data: StatsData = yield response.json();
        yield put(fetchStatsSuccess(data));
    } catch (error: any) {
        yield put(fetchStatsFailure(error.message));
    }
}

export function* statsSaga() {
    yield takeEvery(fetchStatsRequest.type, fetchStats);
}
