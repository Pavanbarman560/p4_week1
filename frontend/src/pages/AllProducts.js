import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import summaryapi from '../common'
import AdminProductCart from '../components/AdminProductCart'

const AllProducts = () => {
  const [OpenUploadProduct, setOpenUploadProducts] = useState(false)
  const [allProduct, setallProduct] = useState([])


  const fetchAllProduct = async () => {

    const responce = await fetch(summaryapi.allProduct.url)

    const dataResponce = await responce.json()

    console.log("product responce is :", dataResponce)

    setallProduct(dataResponce?.data || [])

  }


  useEffect(() => {

    fetchAllProduct()

  }, [])

  return (

    <div>
      <div className=' bg-white py-2 px-4 flex justify-between items-center'>

        <h2 className='font-bold text-lg'>
          All Products
        </h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={() => (setOpenUploadProducts(true))}>Upload Product</button>
      </div>


      {/** all products show in the home screen*/}

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll bg-red-50'>

        {

          allProduct.map((product, index) => {

            return (

              <AdminProductCart data={product} key={index + "allproduct"} fetchdata={fetchAllProduct} />
            )


          })

        }


      </div>

      {/**Upload products menu onpen component */}

      {

        OpenUploadProduct && (

          <UploadProducts onClose={() => setOpenUploadProducts(false)} fetchData={fetchAllProduct} />
        )
      }

    </div>
  )
}

export default AllProducts