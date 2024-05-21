import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Song = mongoose.model('Song', songSchema);

export default Song;


// Crud functions for as repository
export const getAllSongs = async () => {
    try {
        return await Song.find();
    } catch (error) {
        console.log("error in get all songs");
        throw error;
    }
}

export const getSongById = async (id: string) => {
    try {
        return await Song.findById(id);
    } catch (error) {
        console.log("error in get song by id");
        throw error;
    }
}

export const createSong = async (song: Record<string, any>) => {
    try {
        return await Song.create(song);
    } catch (error) {
        console.log("error in create song");
        throw error;
    }
}

export const updateSongById = async (id: string, song: Record<string, any>) => {
    try {
        return await Song.findByIdAndUpdate(id, song, { new: true });
    } catch (error) {
        console.log("error in update song by id");
        throw error;
    }
}

export const deleteSongById = async (id: string) => {
    try {
        return await Song.findByIdAndDelete(id);
    } catch (error) {
        console.log("error in delete song by id");
        throw error;
    }
}

export const getStats = async () => {
    try {
        const totalSongs = await Song.countDocuments();
        const distinctArtists = await Song.distinct('artist');
        const totalArtists = distinctArtists.length;
        const distinctAlbums = await Song.distinct('album')
        const totalAlbums = distinctAlbums.length;
        const distinctGenres = await Song.distinct('genre')
        const totalGenres = distinctGenres.length;

        const songsByGenre = await Song.aggregate([
            { $group: { _id: '$genre', count: { $sum: 1 } } }
        ]);

        const songsByArtist = await Song.aggregate([
            { $group: { _id: '$artist', count: { $sum: 1 } } }
        ]);

        const albumsByArtist = await Song.aggregate([
            { $group: { _id: { artist: '$artist', album: '$album' } } },
            { $group: { _id: '$_id.artist', albums: { $sum: 1 } } }
        ]);

        const artistStats = songsByArtist.map(artist => {
            const artistAlbum = albumsByArtist.find(a => a._id === artist._id);
            return {
                artist: artist._id,
                songs: artist.count,
                albums: artistAlbum ? artistAlbum.albums : 0
            };
        });

        const songsByAlbum = await Song.aggregate([
            { $group: { _id: '$album', count: { $sum: 1 } } }
        ]);

        return {
            totalSongs,
            totalArtists,
            totalAlbums,
            totalGenres,
            songsByGenre,
            artistStats,
            songsByAlbum
        };

    } catch (error) {
        console.log("error in get stats");
        throw error;
    }
}
