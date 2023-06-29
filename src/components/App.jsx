
import { Routes, Route } from "react-router-dom";
import  Header from "./header/header";
import Home from "../pages/home";
import Account from "../pages/account/account";
import  Login from "../pages/login";
import  Phonebook from "../pages/phonebook";
import Reg from "../pages/reg"
import PrivateRoute from '../components/routeTypes/privateRoute'
import PublicRoute from '../components/routeTypes/publicRoute'
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return ( 
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/reg" element={<PublicRoute> <Reg /> </PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/phonebook" element={<PrivateRoute><Phonebook /></PrivateRoute>} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="*" element={<div>NotFound</div>} />
        </Route>
    </Routes>
</>
  )
}





