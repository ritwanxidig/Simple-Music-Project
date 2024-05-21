import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatsData {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
    songsByGenre: { _id: string; count: number }[];
    artistStats: { artist: string; songs: number; albums: number }[];
    songsByAlbum: { _id: string; count: number }[];
}

interface StatsState {
    data: StatsData | null;
    loading: boolean;
    error: string | null;
}

const initialState: StatsState = {
    data: null,
    loading: false,
    error: null,
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        fetchStatsRequest(state) {
            state.loading = true;
        },
        fetchStatsSuccess(state, action: PayloadAction<StatsData>) {
            state.loading = false;
            state.data = action.payload;
        },
        fetchStatsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure } = statsSlice.actions;

export default statsSlice.reducer;
