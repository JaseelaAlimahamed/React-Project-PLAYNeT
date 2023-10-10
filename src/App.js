import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserRoutes from './Routes/UserRoutes';
import VendorRoutes from './Routes/VendorRoutes';
import NotFound from './pages/user/NotFound';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  return (
    <Routes>

      <Route path="/*" element={<UserRoutes />} />
      <Route path="/vendor/*" element={<VendorRoutes/>} />
      <Route path="/admin/*" element={<AdminRoutes/>} />
      
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
