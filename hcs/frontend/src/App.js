import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import BookPackage from './pages/BookPackage';
import Confirmation from './pages/Confirmation';
import Bookings from './pages/Bookings';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/packages"     element={<Packages />} />
        <Route path="/book/:id"     element={<BookPackage />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/bookings"     element={<Bookings />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
