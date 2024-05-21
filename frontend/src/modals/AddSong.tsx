import Modal from '@/components/Modal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import SongForm from '@/components/SongForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { addSongRequest } from '@/app/slices/songSlice';
import toast from 'react-hot-toast';

export const validations = yup.object().shape({
    title: yup.string().required('Title is required'),
    artist: yup.string().required('Artist is required'),
    album: yup.string().required('Album is required'),
    genre: yup.string().required('Genre is required'),
});

const AddSong = ({ openAddModal, setOpenAddModal }: { openAddModal: boolean, setOpenAddModal: any }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.songs);

    const handleSubmit = async (values: any) => {
        try {
            await dispatch(addSongRequest(values));
            setOpenAddModal(false); // Close modal after successful submission
            toast.success('Song successfully saved');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            artist: '',
            album: '',
            genre: '',
        },
        validationSchema: validations,
        onSubmit: handleSubmit
    });

    if (loading) {
        toast.loading("Loading");
    }

    return (
        <Modal title='Add Song' isOpen={openAddModal} onClose={() => setOpenAddModal(false)} submitFun={formik.handleSubmit}>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <div>
                <SongForm formik={formik} />
            </div>
        </Modal>
    )
}

export default AddSong;
