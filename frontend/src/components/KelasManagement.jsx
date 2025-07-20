import React, { useState, useEffect } from 'react';

function KelasManagement() {
  const [kelas, setKelas] = useState([]);
  const [nama, setNama] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadKelas();
  }, []);

  const loadKelas = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/api/kelas', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setKelas(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setNama('');
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editId
      ? `http://localhost:8000/api/kelas/${editId}`
      : 'http://localhost:8000/api/kelas';
    const method = editId ? 'PUT' : 'POST';

    try {
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ nama }),
      });

      resetForm();
      loadKelas();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setNama(item.nama);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetch(`http://localhost:8000/api/kelas/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      loadKelas();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-3">Data Kelas</h4>
      <form onSubmit={handleSubmit} className="mb-4 d-flex gap-2">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="form-control"
          placeholder="Nama kelas"
          required
        />
        <button type="submit" className="btn btn-primary">
          {editId ? 'Update' : 'Tambah'}
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nama Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>
                <button onClick={() => handleEdit(item)} className="btn btn-warning btn-sm me-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
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

export default KelasManagement;
