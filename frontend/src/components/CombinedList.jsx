import React, { useState, useEffect } from 'react';

export default function CombinedList() {
  const [combinedList, setCombinedList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const [siswaRes, guruRes] = await Promise.all([
      fetch('http://localhost:8000/api/siswa', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('http://localhost:8000/api/guru', { headers: { Authorization: `Bearer ${token}` } }),
    ]);
    const siswaData = await siswaRes.json();
    const guruData = await guruRes.json();

    const siswaList = Array.isArray(siswaData) ? siswaData.map(s => ({ ...s, role: 'Siswa' })) : [];
    const guruList = Array.isArray(guruData) ? guruData.map(g => ({ ...g, role: 'Guru' })) : [];

    const combined = [...siswaList, ...guruList];
    combined.sort((a, b) => {
      if (a.kelas && b.kelas) {
        return a.kelas.nama.localeCompare(b.kelas.nama);
      }
      return 0;
    });

    setCombinedList(combined);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daftar Gabungan</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Role</th>
              <th>Kelas</th>
            </tr>
          </thead>
          <tbody>
            {combinedList.length > 0 ? (
              combinedList.map((item, index) => (
                <tr key={item.id} className="align-middle">
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.role}</td>
                  <td>{item.kelas ? item.kelas.nama : '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
