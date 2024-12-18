import React, { useEffect, useState } from 'react'
import summaryapi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRoll from '../components/ChangeUserRoll';



const AllUsers = () => {

  const [allUser, setallUser] = useState([])
  const [openupdatUser, setopenUpdateUser] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({

    email: "",
    name: "",
    role: "",
    _id: "",

  })

  const fetchallusers = async () => {

    const fetchData = await fetch(summaryapi.alluser.url, {

      method: summaryapi.alluser.method,
      credentials: 'include'

    })

    const dataresponce = await fetchData.json()

    if (dataresponce.success) {

      setallUser(dataresponce.data)

    }

    if (dataresponce.error) {

      toast.error(dataresponce.message)

    }

  }

  useEffect(() => {

    fetchallusers()

  }, [])

  return (
    <div className='bg-white pb-4'>

      <table className='w-full usertable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>
              Action
            </th>
          </tr>

        </thead>
        <tbody>
          {

            allUser.map((el, index) => {

              return (

                <tr className=''>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LL')}</td>
                  <td>

                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white'
                      onClick={() => {

                        setUpdateUserDetails(el)
                        setopenUpdateUser(true)


                      }}

                    >
                      <MdModeEditOutline />
                    </button>

                  </td>

                </tr>

              )

            })

          }
        </tbody>

      </table>

      {

        openupdatUser && (

          <ChangeUserRoll
            onClose={() => setopenUpdateUser(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userid={updateUserDetails._id}
            callFunc={fetchallusers}

          />

        )

      }



    </div>
  )
}

export default AllUsers