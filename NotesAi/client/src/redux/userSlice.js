import { createSlice } from '@reduxjs/toolkit'

const userSlice =  createSlice({
    name:"user",
    initialState : {
        userData:null,
        isAuthenticated:false,
        credits:50
   
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        },
        setAuthenticated:(state,action)=>{
            state.isCredential = action.payload
        },
        Logout :(state,action)=>{
           state.userData = null,
           state.isAuthenticated = false
        },
        setCredits:(state,action)=>{
            state.credits = action.payload
        }


    }
});
// const UserDataSlice = createSlice({
//     name:"userData",
//     initialState:{
//         userName : userData
//     }
// })
export const {setUserData, setAuthenticated,Logout, setCredits }= userSlice.actions
export default userSlice.reducer 