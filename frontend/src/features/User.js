import { createSlice } from "@reduxjs/toolkit";


const intialvalue = {isLogged:false, fname:"",lname:"",email:"",is_superuser:false,Image:"https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png"}
export const userSlice = createSlice({
    name:"user",
    initialState:{value:intialvalue},
    reducers:{
        login: (state, action)=>{
            state.value = action.payload
        },
        logoutUser:(state)=>{
            state.value = intialvalue
        }
    }
})

export const {login, logoutUser} = userSlice.actions

export default userSlice.reducer