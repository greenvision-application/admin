import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../widgets';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
