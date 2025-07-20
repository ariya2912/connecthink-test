import React, { useState, useEffect } from 'react';

export default function GuruManagement() {
  const [guru, setGuru] = useState([]);
  const [nama, setNama] = useState('');
  const [kelasId, setKelasId] = useState('');
  const [kelasList, setKelasList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGuru();
    fetchKelas();
  }, []);

  const fetchGuru = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/guru', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });
    const data = await res.json();
    setGuru(Array.isArray(data) ? data : []);
  };

  const fetchKelas = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/kelas', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setKelasList(Array.isArray(data) ? data : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = { nama, kelas_id: kelasId };
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8000/api/guru/${editingId}`
      : 'http://localhost:8000/api/guru';
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    setNama('');
    setKelasId('');
    setEditingId(null);
    fetchGuru();
  };

  const handleEdit = (item) => {
    setNama(item.nama);
    setKelasId(item.kelas_id);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    await fetch(`http://localhost:8000/api/guru/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });
    fetchGuru();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manajemen Guru</h2>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Nama Guru"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={kelasId}
            onChange={(e) => setKelasId(e.target.value)}
            required
          >
            <option value="">Pilih Kelas</option>
            {kelasList.map((kelas) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary w-100">
            {editingId ? 'Update' : 'Tambah'}
          </button>
        </div>
      </form>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guru.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>{item.kelas ? item.kelas.nama : ''}</td>
              <td>
                <button
                  onClick={() => handleEdit(item)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
