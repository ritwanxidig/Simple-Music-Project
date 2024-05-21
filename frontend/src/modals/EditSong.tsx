import { useFormik } from 'formik';
import { validations } from './AddSong';
import { toast } from 'react-hot-toast';
import { Song, updateSongRequest } from '@/app/slices/songSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Modal from '@/components/Modal';
import SongForm from '@/components/SongForm';

const EditSong = ({ openEditModal, setOpenEditModal, data }: { openEditModal: boolean, setOpenEditModal: any, data: Song }) => {

    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.songs);

    const handleSubmit = async (values: any) => {
        try {
            await dispatch(updateSongRequest({ _id: data?._id, ...values }));
            setOpenEditModal(false); // Close modal after successful submission
            toast.success('Song successfully updated');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: data?.title || '',
            artist: data?.artist || '',
            album: data?.album || '',
            genre: data?.genre || '',
        },
        validationSchema: validations,
        onSubmit: handleSubmit
    });

    if (loading) {
        toast.loading("Loading");
    }
    return (
        <Modal title='Edit Song' isOpen={openEditModal} onClose={() => setOpenEditModal(false)} submitFun={formik.handleSubmit}>
            <div>
                <SongForm formik={formik} />
            </div>
        </Modal>
    )
}

export default EditSong