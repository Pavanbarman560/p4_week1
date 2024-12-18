import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseCircle } from "react-icons/io5";
import summaryapi from '../common';
import { toast } from 'react-toastify';


function ChangeUserRoll({

    name,
    email,
    role,
    userid,
    onClose,
    callFunc,

}) {

    const [userrole, setuserrole] = useState(role);

    const handleonchangeselect = (e) => {

        setuserrole(e.target.value);

    };

    const updateUserRole = async () => {

        const fetchresponce = await fetch(summaryapi.updateUser.url, {
            method: summaryapi.updateUser.method,

            credentials: 'include',

            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify({
                userid : userid,
                role: userrole
            })
        });

        const responceData = await fetchresponce.json();

        if (responceData.success) {

            toast.success(responceData.message);
            onClose()
            callFunc()

        }

        console.log("updated user responce is ", responceData);


    };


    return (
        <div className=' fixed top-0 bottom-0 left-0 right-0  w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-55'>
            <div className=' mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

                <button className='text-xl block ml-auto' onClick={onClose}>

                    <IoCloseCircle />

                </button>

                <h1 className='pb-4 text-lg font-medium'>Change User Roll</h1>

                <p>Name : {name}</p>
                <p>Email : {email}</p>

                <div className='flex items-center justify-between my-4'>
                    <p>Role:</p>
                    <select className='border px-4 py-2' value={userrole} onChange={handleonchangeselect}>
                        {Object.values(ROLE).map(el => {
                            return (

                                <option value={el} key={el}>{el}</option>
                            );
                        })}


                    </select>
                </div>

                <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>

            </div>
        </div>
    );
}

export default ChangeUserRoll