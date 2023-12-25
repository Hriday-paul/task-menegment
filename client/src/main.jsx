import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import rout from './Rout/Rout.jsx';
import Authonicate from './component/Navbar/Authonicate/Authonicate';

ReactDOM.createRoot(document.getElementById('root')).render(
  // Removed React.StrictMode
  <Authonicate>
    <RouterProvider router={rout}></RouterProvider>
  </Authonicate>,
);
