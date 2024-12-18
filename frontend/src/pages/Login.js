import React, { useContext, useState } from 'react'
import loginicon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryapi from '../common';
import { toast } from 'react-toastify';
import context from '../context';



const Login = () => {
    const [showpaasword, setshowpassword] = useState(false)
    const [data, setdata] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const { featchuserdetails } = useContext(context)


    const handleonchange = (e) => {
        const { name, value } = e.target
        setdata((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }


    const handlesubmit = async (e) => {
        e.preventDefault()

        const dataresponce = await fetch(summaryapi.signin.url, {
            method: summaryapi.signin.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"

            },
            body: JSON.stringify(data)
        })

        const dataapi = await dataresponce.json()

        if (dataapi.success) {

            toast.success(dataapi.message)
            navigate('/')
            featchuserdetails()
        }

        if (dataapi.error) {

            toast.error(dataapi.message)

        }

    }


    console.log("data login", data)

    return (
        <section id='login'>

            <div className='mx-auto container p-4'>

                <div className='bg-white p-5 w-full max-w-sm mx-auto rounded '>

                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginicon} alt='login icons' />
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handlesubmit}>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleonchange}
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
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-700'>
                                Forgot paasword?
                            </Link>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 '>login</button>
                    </form>

                    <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sign Up</Link></p>
                </div>

            </div>

        </section>
    )
}

export default Login