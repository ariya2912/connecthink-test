import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import SiswaManagement from './components/SiswaManagement.jsx';
import KelasManagement from './components/KelasManagement.jsx';
import GuruManagement from './components/GuruManagement.jsx';
import CombinedList from './components/CombinedList.jsx';
import ListSiswaByKelas from './components/ListSiswaByKelas';
import ListGuruByKelas from './components/ListGuruByKelas';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        {isAuthenticated && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/siswa" element={<SiswaManagement />} />
            <Route path="/kelas" element={<KelasManagement />} />
            <Route path="/guru" element={<GuruManagement />} />
            <Route path="/list-siswa-by-kelas" element={<ListSiswaByKelas />} />
            <Route path="/list-guru-by-kelas" element={<ListGuruByKelas />} />
            <Route path="/combined-list" element={<CombinedList />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
