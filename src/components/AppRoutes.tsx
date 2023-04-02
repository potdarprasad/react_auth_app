import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import Notes from '../pages/Notes';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/notes" element={<Notes />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
    )
}

export default AppRoutes;