import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import BookAppointment from '@/pages/BookAppointment';
import AppointmentBooking from '@/pages/AppointmentBooking';
import AdminDashboard from '@/pages/AdminDashboard';
import PublicHeader from '@/layout/Header/PublicHeader';

// Placeholder components for routes that don't exist yet
const Services = () => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-3xl font-bold">Services Page</h1>
  </div>
);

const Contact = () => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-3xl font-bold">Contact Page</h1>
  </div>
);

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/Administrator/*" element={<AdminDashboard />} />
        <Route path="/*" element={
          <>
            <PublicHeader />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<BookAppointment />} />
              <Route path="/appointment" element={<AppointmentBooking />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </>
        } />
      </Routes>
    </>
  );
}
