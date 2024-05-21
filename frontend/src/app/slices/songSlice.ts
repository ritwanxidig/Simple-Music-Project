import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    _createdAt: Date;
    _updatedAt: Date;
}

interface SongsState {
    songs: Song[];
    loading: boolean;
    error: string | null;
}

const initialState: SongsState = {
    songs: [],
    loading: false,
    error: null,
};

const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        fetchSongsRequest(state) {
            state.loading = true;
        },
        fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
            state.loading = false;
            state.songs = action.payload;
        },
        fetchSongsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addSongRequest(state) {
            state.loading = true;
        },
        addSongSuccess(state, action: PayloadAction<Song>) {
            state.loading = false;
            state.songs.push(action.payload);
        },
        addSongFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateSongRequest(state) {
            state.loading = true;
        },
        updateSongSuccess(state, action: PayloadAction<Song>) {
            state.loading = false;
            const updatedSong = action.payload;
            state.songs = state.songs.map(song =>
                song._id === updatedSong._id ? updatedSong : song
            );
        },
        updateSongFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteSongRequest(state) {
            state.loading = true;
        },
        deleteSongSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.songs = state.songs.filter(song => song._id !== action.payload);
        },
        deleteSongFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchSongsRequest,
    fetchSongsSuccess,
    fetchSongsFailure,
    addSongRequest,
    addSongSuccess,
    addSongFailure,
    updateSongRequest,
    updateSongSuccess,
    updateSongFailure,
    deleteSongRequest,
    deleteSongSuccess,
    deleteSongFailure,
} = songSlice.actions;

export default songSlice.reducer;
