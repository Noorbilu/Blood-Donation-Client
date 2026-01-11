import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer';
import NavBar from '../pages/Shared/Navbar';
import ChartRegistry from '../lib/chart';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <ChartRegistry></ChartRegistry>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;