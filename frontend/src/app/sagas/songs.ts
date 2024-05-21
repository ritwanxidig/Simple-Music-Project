import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure, Song, addSongRequest, addSongSuccess, addSongFailure, updateSongSuccess, updateSongFailure, deleteSongSuccess, deleteSongFailure, updateSongRequest, deleteSongRequest } from '../slices/songSlice';
import { PayloadAction } from '@reduxjs/toolkit';


const baseURL = 'http://localhost:3030/api/songs';

function* fetchSongs() {
    try {
        const response: Response = yield call(fetch, baseURL);
        const data: Song[] = yield response.json();
        yield put(fetchSongsSuccess(data as any));
    } catch (error: any) {
        yield put(fetchSongsFailure(error.message));
    }
}

function* addSong(action: PayloadAction<Song>) {
    try {
        const { payload } = action;
        const response: Response = yield call(fetch, baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const data: Song = yield response.json();
        yield put(addSongSuccess(data));
    } catch (error: any) {
        yield put(addSongFailure(error.message));
    }
}

function* updateSong(action: PayloadAction<Song>) {
    try {
        const { payload } = action;
        const response: Response = yield call(fetch, `${baseURL}/${payload._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const data: Song = yield response.json();
        yield put(updateSongSuccess(data));
    } catch (error: any) {
        yield put(updateSongFailure(error.message));
    }
}

function* deleteSong(action: PayloadAction<string>) {
    try {
        const { payload } = action;
        yield call(fetch, `${baseURL}/${payload}`, {
            method: 'DELETE',
        });
        yield put(deleteSongSuccess(payload));
    } catch (error: any) {
        yield put(deleteSongFailure(error.message));
    }
}


export default function* songSaga() {
    yield takeEvery(fetchSongsRequest.type, fetchSongs);
    yield takeEvery(addSongRequest.type, addSong);
    yield takeEvery(updateSongRequest.type, updateSong);
    yield takeEvery(deleteSongRequest.type, deleteSong);
}
