


const CustomField = (
    { label, id, handleChange, value, type, error }:
        { label: string, id: string, handleChange: () => void }
        & { value: string, type: string, error: string }) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='font-semibold' htmlFor={id}>{label}</label>
            <input className='px-4 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 ring-1' type={type} id={id} name={id} value={value} onChange={handleChange} />
            {error && <p className='text-red-500 font-medium'>{error}</p>}
        </div>
    )
}

const SongForm = ({ formik }: { formik: any }) => {
    return (
        <div>
            <CustomField type='text' id='title' handleChange={formik.handleChange} label='Title' error={formik.errors.title} value={formik.values.title} />
            <CustomField type='text' id='artist' handleChange={formik.handleChange} label='Artist' error={formik.errors.artist} value={formik.values.artist} />
            <CustomField type='text' id='album' handleChange={formik.handleChange} label='Album' error={formik.errors.album} value={formik.values.album} />
            <CustomField type='text' id='genre' handleChange={formik.handleChange} label='Genre' error={formik.errors.genre} value={formik.values.genre} />
        </div>
    )
}

export default SongForm