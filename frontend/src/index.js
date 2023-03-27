import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { appRouter } from './App';
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import userReducer from './features/User';
import usersReducer from './features/UsersSlice'



const store = configureStore({
  reducer:{
    user:userReducer,
    users: usersReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter}/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
