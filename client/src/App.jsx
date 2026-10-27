import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './admin/AdminLogin';
import AdminPanel from './admin/AdminPanel';
import AdminLaptopGate from './admin/AdminLaptopGate';
import { useAuth } from './context/AuthContext';

// Protected Route Component for Admin Dashboard
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0b192c', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', color: '#0284c7', marginBottom: '16px' }}></i>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem' }}>Loading Admin Control Center...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public Main Site */}
      <Route path="/" element={<Home />} />

      {/* Admin Login Route (Laptop size only) */}
      <Route
        path="/admin/login"
        element={
          <AdminLaptopGate>
            <AdminLogin />
          </AdminLaptopGate>
        }
      />

      {/* Protected Admin Control Center (Laptop size only) */}
      <Route
        path="/admin/*"
        element={
          <AdminLaptopGate>
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          </AdminLaptopGate>
        }
      />

      {/* Deep links & Anchor route fallbacks that render Home */}
      <Route path="/tours" element={<Home />} />
      <Route path="/packages" element={<Home />} />
      <Route path="/attractions" element={<Home />} />
      <Route path="/about" element={<Home />} />
      <Route path="/contact" element={<Home />} />
      <Route path="/visas" element={<Home />} />

      {/* Catch-all Wildcard Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
