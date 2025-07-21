import React, { useState, useEffect } from 'react';

export default function ListSiswaByKelas() {
  const [siswaList, setSiswaList] = useState([]);

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/siswa', {
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
      setSiswaList(data);
    } else {
      setSiswaList([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daftar Siswa</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Nama Siswa</th>
              <th>Kelas</th>
            </tr>
          </thead>
          <tbody>
            {siswaList.length > 0 ? (
              siswaList.map((siswa, index) => (
                <tr key={siswa.id} className="align-middle">
                  <td>{index + 1}</td>
                  <td>{siswa.nama}</td>
                  <td>{siswa.kelas ? siswa.kelas.nama : '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  Tidak ada data siswa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
