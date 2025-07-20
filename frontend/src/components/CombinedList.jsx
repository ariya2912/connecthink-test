import React, { useState, useEffect } from 'react';

export default function CombinedList() {
  const [siswaList, setSiswaList] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [guruList, setGuruList] = useState([]);

  useEffect(() => {
    fetchSiswa();
    fetchKelas();
    fetchGuru();
  }, []);

  const fetchSiswa = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/siswa', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSiswaList(Array.isArray(data) ? data : []);
  };

  const fetchKelas = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/kelas', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setKelasList(Array.isArray(data) ? data : []);
  };

  const fetchGuru = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/guru', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setGuruList(Array.isArray(data) ? data : []);
  };

  const SectionCard = ({ title, children }) => (
    <div className="card mb-4 shadow-sm border-0">
      <div className="card-header bg-primary text-white fw-semibold">
        {title}
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold text-primary">Data Siswa, Kelas, dan Guru</h2>

      <SectionCard title="List Siswa">
        <table className="table table-striped align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kelas</th>
            </tr>
          </thead>
          <tbody>
            {siswaList.length > 0 ? (
              siswaList.map((siswa, index) => (
                <tr key={siswa.id}>
                  <td>{index + 1}</td>
                  <td>{siswa.nama}</td>
                  <td>{siswa.kelas?.nama || '-'}</td>
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
      </SectionCard>

      <SectionCard title="List Kelas">
        <table className="table table-striped align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Nama Kelas</th>
            </tr>
          </thead>
          <tbody>
            {kelasList.length > 0 ? (
              kelasList.map((kelas, index) => (
                <tr key={kelas.id}>
                  <td>{index + 1}</td>
                  <td>{kelas.nama}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center text-muted">
                  Tidak ada data kelas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="List Guru">
        <table className="table table-striped align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kelas</th>
            </tr>
          </thead>
          <tbody>
            {guruList.length > 0 ? (
              guruList.map((guru, index) => (
                <tr key={guru.id}>
                  <td>{index + 1}</td>
                  <td>{guru.nama}</td>
                  <td>{guru.kelas?.nama || '-'}</td>
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
      </SectionCard>
    </div>
  );
}