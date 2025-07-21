import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert('Logout gagal');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat logout');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Dashboard</h2>
        <button className="btn btn-outline-danger btn-sm px-4" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-4 col-lg-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Kelola Siswa</h5>
              <Link to="/siswa" className="btn btn-primary w-100">
                Akses
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Kelola Kelas</h5>
              <Link to="/kelas" className="btn btn-primary w-100">
                Akses
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Kelola Guru</h5>
              <Link to="/guru" className="btn btn-primary w-100">
                Akses
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Daftar Siswa</h5>
              <Link to="/list-siswa-by-kelas" className="btn btn-primary w-100">
                Akses
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Daftar Guru</h5>
              <Link to="/list-guru-by-kelas" className="btn btn-primary w-100">
                Akses
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Daftar Gabungan</h5>
              <Link to="/combined-list" className="btn btn-primary w-100">
                Akses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
