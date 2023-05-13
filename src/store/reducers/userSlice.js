// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    id:'',
    raisonsocial: '',
    siret: '',
    nomcontact: '',
    prenom: '',
    tel: '',
    responsabilite: '',
    addressId: '',
    email: ''
};

// ==============================|| SLICE - USER ||============================== //

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
        state.user=action.payload.user;
    },
    clearUser(state) {
        state.user="";
    },
  },
});

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;