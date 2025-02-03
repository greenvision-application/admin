import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer, Sidebar } from '../widgets';

const Layout = () => {
  return (
    <div className="h-screen overflow-x-hidden">
      <Header />
      <main>
        <Sidebar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
