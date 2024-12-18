import React from 'react'
import { IoCloseCircle } from "react-icons/io5";


function DisplayBigProductImage({
    imgurl,
     onClose

}) {
    return (
        <div className='fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center'>

            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
                <div className='w-fit text-2xl ml-auto hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <IoCloseCircle />
                </div>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgurl} className='w-full h-full ' />
                </div>

            </div>

        </div>
    );
}

export default DisplayBigProductImage