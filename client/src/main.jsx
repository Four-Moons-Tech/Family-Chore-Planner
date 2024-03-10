import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import ChildProfile from './pages/ChildProfile.jsx';
import FamilyProfile from './pages/FamilyProfile.jsx';
// import ErrorPage from './pages/ErrorPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/child-profile/:username',
        element: <ChildProfile />
      }, {
        path: '/me',
        element: <FamilyProfile />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
)
