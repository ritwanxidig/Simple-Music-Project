import { Request, Response, NextFunction } from "express";
import { createSong, deleteSongById, getAllSongs, getSongById, getStats, updateSongById } from "../models/song";
import { errorHandler } from "../utils";



export default {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const songs = await getAllSongs();
            res.status(200).json(songs);
        } catch (error) {
            next(error);
        }
    },

    getOne: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const song = await getSongById(id);
            if (!song) return next(errorHandler(400, "this song does not exist"))
            res.status(200).json(song);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, artist, album, genre } = req.body;
            if (!title || !artist || !album || !genre) {
                return next(errorHandler(400, "title, artist, album and genre are required"));
            }
            const newSong = await createSong({ title, artist, album, genre });
            res.status(201).json(newSong);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            // checking if it exists
            const song = await getSongById(id);
            if (!song) return next(errorHandler(400, "this song does not exist"))
            const title = req.body?.title || song.title;
            const artist = req.body?.artist || song.artist;
            const album = req.body?.album || song.album;
            const genre = req.body?.genre || song.genre;
            const updatedSong = await updateSongById(id, { title, artist, album, genre });
            res.status(200).json(updatedSong);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            // checking if it exists
            const song = await getSongById(id);
            if (!song) return next(errorHandler(400, "this song does not exist"))
            const deletedSong = await deleteSongById(id);
            res.status(200).json(deletedSong);
        } catch (error) {
            next(error);
        }
    },

    getStats: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stats = await getStats();
            res.status(200).json(stats);
        } catch (error) {
            next(error);
        }
    }

}