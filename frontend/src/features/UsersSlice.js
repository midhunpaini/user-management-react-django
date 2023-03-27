import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: { value: [] },
  reducers: {
    addNewUser: (state, action) => {
      const newUser = action.payload;
      const updatedValue = [...state.value, newUser];
      return { ...state, value: updatedValue };
    },
    removeUser: (state, action) => {
      const index = state.value.findIndex(user => user.email === action.payload);
      if (index !== -1) {
        const updatedValue = [...state.value];
        updatedValue.splice(index, 1);
        return { ...state, value: updatedValue };
      }
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.value.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        const updatedValue = [...state.value];
        updatedValue[index] = updatedUser;
        return { ...state, value: updatedValue };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const json = action.payload;
      const updatedValue = json.map(user => ({
        id: user.id,
        fname: user.first_name,
        lname: user.last_name,
        email: user.email,
      }));
      return { ...state, value: updatedValue };
    });
  },
});

export const { addNewUser, removeUser, updateUser } = usersSlice.actions;

export default usersSlice.reducer;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data = await fetch('http://localhost:8000/api/djadmin', {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  const json = await data.json();
  return json;
});
