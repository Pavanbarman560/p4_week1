import React, { useState } from 'react'
import Logo from './Logo'
import { FiSearch } from "react-icons/fi";
import { FaUserGraduate } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryapi from '../common';
import { Toast, toast } from 'react-toastify';
import { setuserdetails } from '../store/userslice';
import ROLE from '../common/role';


const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menudisplay, setMenuDisplay] = useState(false)

  const handlelogout = async () => {

    const fetchdata = await fetch(summaryapi.logout.url, {
      method: summaryapi.logout.method,
      credentials: 'include'
    })
    const data = await fetchdata.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setuserdetails(null))
    }

    if (data.error) {

      toast.error(data.message)
    }

  }

  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h full container mx-auto flex items-center px-4 justify-between'>

        <div className=''>
          <Link to={"/"}>
            <Logo w={100} h={50} />
          </Link>
        </div>

        <div className=' hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search product here...' className='w-full outline-none' />
          <div className='text-lg min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white'>
            <FiSearch />
          </div>
        </div>


        <div className='flex items-center gap-7'>


          <div className='relative flex justify-center'>


            {
              user?._id && (

                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilepic ? (
                      <img src={user?.profilepic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaUserGraduate />
                    )
                  }
                </div>

              )

            }
            {
              menudisplay && (

                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {

                      user?.role === ROLE.ADMIN && (

                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-1' onClick={() => setMenuDisplay(preve => !preve)}>Admin panel</Link>

                      )

                    }


                  </nav>
                </div>

              )
            }
          </div>


          <div className='text-2xl relative'>
            <span><FaShoppingCart /></span>

            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>

          <div>
            {

              user?._id ? (
                <button onClick={handlelogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'> logout </button>
              )
                :
                (

                  <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>login</Link>
                )
            }
          </div>

        </div>

      </div>
    </header >
  )
}

export default Header