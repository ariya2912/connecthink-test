import React, { useState, useEffect } from 'react';

export default function ListGuruByKelas() {
  const [guruList, setGuruList] = useState([]);

  useEffect(() => {
    fetchGuru();
  }, []);

  const fetchGuru = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/guru', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (Array.isArray(data)) {
      data.sort((a, b) => {
        if (a.kelas && b.kelas) {
          return a.kelas.nama.localeCompare(b.kelas.nama);
        }
        return 0;
      });
      setGuruList(data);
    } else {
      setGuruList([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daftar Guru</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Nama Guru</th>
              <th>Kelas</th>
            </tr>
          </thead>
          <tbody>
            {guruList.length > 0 ? (
              guruList.map((guru, index) => (
                <tr key={guru.id} className="align-middle">
                  <td>{index + 1}</td>
                  <td>{guru.nama}</td>
                  <td>{guru.kelas ? guru.kelas.nama : '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  Tidak ada data guru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
