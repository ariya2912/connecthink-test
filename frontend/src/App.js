import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import SiswaManagement from './components/SiswaManagement.jsx';
import KelasManagement from './components/KelasManagement.jsx';
import GuruManagement from './components/GuruManagement.jsx';
import ListByKelas from './components/ListByKelas.jsx';
import CombinedList from './components/CombinedList.jsx';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/siswa" element={<SiswaManagement />} />
            <Route path="/kelas" element={<KelasManagement />} />
            <Route path="/guru" element={<GuruManagement />} />
            <Route path="/list-by-kelas" element={<ListByKelas />} />
            <Route path="/combined-list" element={<CombinedList />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
