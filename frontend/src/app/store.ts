import { combineReducers, configureStore } from '@reduxjs/toolkit'
import songReducer from './slices/songSlice';
import statReducer from './slices/statsSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';

const rootReducers = combineReducers({
    songs: songReducer,
    stats: statReducer
});

// creating saga middleware
const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;