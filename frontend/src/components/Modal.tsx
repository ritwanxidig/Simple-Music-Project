import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    submitFun: () => void;
    children: React.ReactNode;
    title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, submitFun }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-xl w-full">
                <div className='flex w-full justify-between items-center'>
                    <h1 className='text-lg font-semibold'>{title}</h1>
                    <button className='p-2 w-10 h-10 rounded-full text-lg font-semibold bg-gray-200 flex justify-center items-center hover:bg-opacity-70'
                        onClick={onClose}>X</button>
                </div>
                {children}
                <div className='flex justify-end gap-4 mt-12'>
                    <button
                    type='button'
                        className='px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-100 hover:text-blue-500 transition-all'
                        onClick={submitFun}
                    >
                        Submit
                    </button>
                    <button
                        type='button'
                        className='px-4 py-2 bg-red-500 rounded-lg text-white font-semibold hover:bg-red-100 hover:text-red-500 transition-all'
                        onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
