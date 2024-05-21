import { Song, fetchSongsRequest } from '@/app/slices/songSlice'
import { RootState } from '@/app/store';
import AddSong from '@/modals/AddSong';
import DeleteSong from '@/modals/DeleteSong';
import EditSong from '@/modals/EditSong';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const Songs = () => {
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [selectedSong, setSelectedSong] = React.useState<Song | null>(null);
    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector((state: RootState) => state.songs);

    const handleEdit = (data: Song) => {
        setSelectedSong(data);
        setOpenEditModal(true);
    }

    const handleDelete = (data: Song) => {
        setSelectedSong(data);
        setOpenDeleteModal(true);
    }

    const handleAddSongModalOpen = () => {
        setOpenAddModal(true);
    }


    const Song = ({ song }: { song: Song }) => {

        return (
            <div className='flex flex-col w-full bg-purple-100 p-4 rounded-lg'>
                <div className='flex justify-end items-center w-full gap-2'>
                    <button
                        onClick={() => handleEdit(song)}
                        className='px-4 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-100 hover:text-yellow-600 font-semibold transition-all'>
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(song)}
                        className='px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-100 hover:text-red-600 font-semibold transition-all'>
                        Delete
                    </button>
                </div>
                <h1 className='font-semibold text-xl'>{song.title}</h1>
                <h2>{song.artist}</h2>
                <div className='flex gap-4'>
                    <h4 className='capitalize'><strong> Album </strong>: {song.album}</h4>
                    <h4 className='capitalize'><strong> Genre </strong>: {song.genre}</h4>
                </div>
            </div>
        )
    }

    useEffect(() => {
        dispatch(fetchSongsRequest());
    }, []);

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error: {error}</div>

    return (
        <>
            <AddSong openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
            <EditSong openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}
                data={selectedSong ? selectedSong : {
                    title: '',
                    album: '',
                    artist: '',
                    genre: '',
                    _id: "",
                    _createdAt: new Date(),
                    _updatedAt: new Date()
                }} />

            <DeleteSong openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}
                data={selectedSong ? selectedSong : {
                    title: '',
                    album: '',
                    artist: '',
                    genre: '',
                    _id: "",
                    _createdAt: new Date(),
                    _updatedAt: new Date()
                }} />

            <div className='flex flex-col w-full'>
                <div className='flex w-full items-center justify-between'>
                    <h1 className='text-2xl font-bold py-4'>Songs List</h1>
                    <button
                        onClick={handleAddSongModalOpen}
                        className='bg-blue-500 py-2 px-4 rounded-full text-lg font-semibold text-white hover:bg-blue-200 hover:text-blue-600 transition-all'>
                        Add New
                    </button>
                </div>
                <div>
                    <div className='grid grid-cols-4 gap-4 w-full'>
                        {songs?.map((song) => (<Song key={song?._id} song={song} />))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Songs