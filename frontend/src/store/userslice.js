import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
}

export const userslice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setuserdetails: (state, action) => {
            state.user = action.payload
           console.log("action.payload",action.payload)

        }
    },
})

// Action creators are generated for each case reducer function
export const { setuserdetails } = userslice.actions

export default userslice.reducer