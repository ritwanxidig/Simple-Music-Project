import { Song, deleteSongRequest } from '@/app/slices/songSlice';
import { RootState } from '@/app/store';
import Modal from '@/components/Modal';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const DeleteSong = ({ openDeleteModal, setOpenDeleteModal, data }:
    { openDeleteModal: boolean, setOpenDeleteModal: any, data: Song }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.songs);

    const handleSubmit = async () => {
        try {
            await dispatch(deleteSongRequest(data?._id as any));
            setOpenDeleteModal(false);
            toast.success('Song successfully deleteds');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        toast.loading("Loading");
    }
    return (
        <Modal title='Delete Song' isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} submitFun={handleSubmit}>
            <div>
                <p>Are you sure you want to delete this song?
                    <br />
                    <span className='text-red-500'>this action is irreversible</span>
                </p>
            </div>
        </Modal>
    )
}

export default DeleteSong