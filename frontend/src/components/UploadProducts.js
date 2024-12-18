import React, { useState } from 'react'
import { RiFolderCloseFill } from "react-icons/ri";
import productCategory from '../helpers/productCategory';
import { RiFolderUploadFill } from "react-icons/ri";
import UploadImage from '../helpers/UploadImage';
import DisplayBigProductImage from './DisplayBigProductImage';
import { MdDelete } from "react-icons/md";
import summaryapi from '../common';
import { toast } from 'react-toastify'


const UploadProducts = (
    { onClose,
        fetchData }
) => {

    const [data, setdata] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    })

    const [openFullScreenImage, setopenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handelonchange = (e) => {

        const { name, value } = e.target
        setdata((preve) => {

            return {
                ...preve,
                [name]: value

            }

        })
    }


    const handelUploadProduct = async (e) => {
        const file = e.target.files[0]
        console.log("file", file)

        const uploadImageCloudinary = await UploadImage(file)
        setdata((preve) => {

            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]

            }

        })

    }

    const handleDeleteProductImage = async (index) => {

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setdata((preve) => {

            return {
                ...preve,
                productImage: [...newProductImage]

            }

        })
    }

    {/**upload product click*/ }

    const handelSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(summaryapi.uploadProduct.url, {

            method: summaryapi.uploadProduct.method,
            credentials: 'include',
            headers: {

                "content-type": "application/json"

            },

            body: JSON.stringify(data)

        })

        const responseData = await response.json()

        if (responseData.success) {

            toast.success(responseData?.message)
            onClose()
            fetchData()
        }

        if (responseData.error) {

            toast.error(responseData?.message)
        }

    }

    return (
        <div className='fixed  w-full h-full bg-slate-200 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>

            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-4'>
                    <h2 className='font-bold text-lg'>UploadProducts</h2>
                    <div className='w-fit text-2xl ml-auto hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <RiFolderCloseFill />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handelSubmit}>

                    <label htmlFor='productName'> Product Name : </label>
                    <input
                        type='text'
                        id='productName'
                        name='productName'
                        placeholder='enter product name '
                        value={data.productName}
                        onChange={handelonchange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='brandName' className='mt-3'> Brand Name : </label>
                    <input
                        type='text'
                        id='brandName'
                        name='brandName'
                        placeholder='enter brand name '
                        value={data.brandName}
                        onChange={handelonchange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='category' className='mt-3'> category : </label>
                    <select required value={data.category} name='category' onChange={handelonchange} className='p-2 bg-slate-100 border rounded'>
                        <option value={""}>Select Category</option>

                        {
                            productCategory.map((el, index) => {

                                return (

                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )

                            })
                        }

                    </select>

                    <label htmlFor=' productImage' className='mt-3'> Product Image: </label>
                    <label htmlFor='UploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full cursor-pointer '>
                            <div className='text-slate-500'>
                                <span className='text-3xl'><RiFolderUploadFill /></span>
                                <p className='text-sm '>Upload Product Image</p>
                                <input type='file' id='UploadImageInput' className='hidden' onChange={handelUploadProduct} />
                            </div>

                        </div>
                    </label>

                    <div>

                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((el, index) => {

                                            return (

                                                <div className='relative group '>
                                                    <img
                                                        src={el}
                                                        alt={el}
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setopenFullScreenImage(true)
                                                            setFullScreenImage(el)

                                                        }} />

                                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>

                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            ) : (

                                <p className='text-red-700 text-xs '> * Please Upload Product Image</p>

                            )
                        }


                    </div>

                    <label htmlFor='price' className='mt-3'> Price : </label>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='enter price '
                        value={data.price}
                        onChange={handelonchange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />


                    <label htmlFor='sellingPrice' className='mt-3'> Selling Price : </label>
                    <input
                        type='number'
                        id='sellingPrice'
                        name='sellingPrice'
                        placeholder='enter selling price '
                        value={data.sellingPrice}
                        onChange={handelonchange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='description' className='mt-3'>description : </label>

                    <textarea
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='enter product description'
                        rows={3}
                        onChange={handelonchange}
                        name='description'
                        value={data.description}
                    >
                    </textarea>



                    <button className='px-3 py-2 bg-red-600 text-white mFb-10 hover:bg-red-700'>Upload Product</button>

                </form>

            </div >

            {/**Displey image in the full screen */}
            {

                openFullScreenImage && (

                    <>

                        {console.log("Displaying image:", fullScreenImage)}
                        < DisplayBigProductImage onClose={() => setopenFullScreenImage(false)} imgurl={fullScreenImage} />

                    </>
                )

            }
        </div >
    )
}

export default UploadProducts