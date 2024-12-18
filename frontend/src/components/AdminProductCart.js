import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCart = ({

    data,
    fetchdata

}) => {

    const [editproduct, seteditproduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded'>

            <div className='w-40'>

                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full' />
                </div>

                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    <p className='font-semibold'>
                        {
                            displayINRCurrency(data.sellingPrice)
                        }

                    </p>

                    <div className='w-fit ml-auto p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={() => seteditproduct(true)}>
                        <MdEdit />
                    </div>
                </div>

            </div>
            {

                editproduct && (

                    <AdminEditProduct productData={data} onClose={() => seteditproduct(false)} fetchdata={fetchdata} />

                )
            }

        </div>
    )
}

export default AdminProductCart