import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Empowerment from './pages/Empowerment';
import Career from './pages/Career';
import Contact from './pages/Contact';
import Login from './pages/Login';
import RegistrationsEnquiry from './pages/RegistrationsEnquiry';
import EnrolledStudents from './pages/EnrolledStudents';
import EmployeeRegistrations from './pages/EmployeeRegistrations';
import RecycleBin from './pages/RecycleBin';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import { MenuProvider } from './context/MenuContext';

function App() {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Products />} />
          <Route path="/empowerment" element={<Empowerment />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
          <Route path="/dashboard/registrations-enquiry" element={<RegistrationsEnquiry />} />
          <Route path="/dashboard/enrolled-students" element={<EnrolledStudents />} />
          <Route path="/dashboard/employee-registrations" element={<EmployeeRegistrations />} />
          <Route path="/dashboard/recycle-bin" element={<RecycleBin />} />
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  );
}

export default App;
