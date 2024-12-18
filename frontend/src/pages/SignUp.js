import React, { useState } from 'react'
import loginicon from '../assest/signup.gif'
import { FaEye, FaRocketchat } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, json, useNavigate } from 'react-router-dom';
import imagetobase64 from '../helpers/imagetobase64';
import summaryapi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {

    const [showpaasword, setshowpassword] = useState(false)
    const [showconfirmpaasword, setshowconfirmpassword] = useState(false)
    const [data, setdata] = useState({

        email: "",
        password: "",
        name: "",
        confirmpassword: "",
        profilepic: "",
    })

    const navigate = useNavigate()

    const handleonchange = (e) => {
        const { name, value } = e.target
        setdata((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleuploadpic = async (e) => {
        const file = e.target.files[0]

        const imagepic = await imagetobase64(file)
        setdata((preve) => {
            return {

                ...preve,
                profilepic: imagepic
            }
        })

    }

    const handlesubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmpassword) {

            const dataresponce = await fetch(summaryapi.signup.url, {

                method: summaryapi.signup.method,
                headers: {
                    "content-type": "application/json"
                },

                body: JSON.stringify(data)

            })

            const dataapi = await dataresponce.json()

            if (dataapi.success) {
                toast.success(dataapi.message)
                navigate("/login")
            }
            if (dataapi.error) {
                toast.error(dataapi.message)
            }

        }
        else {

            toast.error("please check paasword and confirm paasword")

        }

    }


    return (
        <section id='signup'>

            <div className='mx-auto container p-4'>

                <div className='bg-white p-5 w-full max-w-sm mx-auto rounded '>

                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilepic || loginicon} alt='login icons' />
                        </div>
                        <form>
                            <label>
                                <div className=' text-xs bg-opacity-0 bg-slate-200 pb-5 pt-3 cursor-pointer text-center absolute bottom-0 w-full'>
                                    upload photo
                                </div>
                                <input type='file' className='hidden' onChange={handleuploadpic} />
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handlesubmit}>

                        <div className='grid'>
                            <label>Name:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleonchange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>

                        </div>

                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleonchange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showpaasword ? "text" : "password"}
                                    placeholder='enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleonchange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setshowpassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showpaasword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showconfirmpaasword ? "text" : "password"}
                                    placeholder='enter confirm password'
                                    name='confirmpassword'
                                    value={data.confirmpassword}
                                    onChange={handleonchange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setshowconfirmpassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showconfirmpaasword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 '>Sign UP</button>
                    </form>

                    <p className='my-5'>Already have account ? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
                </div>

            </div>

        </section>
    )
}

export default SignUp