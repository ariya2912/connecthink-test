import React, { useState, useEffect } from 'react';

export default function ListByKelas() {
  const [kelasList, setKelasList] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState('');
  const [siswaList, setSiswaList] = useState([]);
  const [guruList, setGuruList] = useState([]);

  useEffect(() => {
    fetchKelas();
  }, []);

  useEffect(() => {
    if (selectedKelas) {
      fetchSiswaByKelas(selectedKelas);
      fetchGuruByKelas(selectedKelas);
    } else {
      setSiswaList([]);
      setGuruList([]);
    }
  }, [selectedKelas]);

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

  const fetchSiswaByKelas = async (kelasId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8000/api/siswa/kelas/${kelasId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setSiswaList(Array.isArray(data) ? data : []);
  };

  const fetchGuruByKelas = async (kelasId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8000/api/guru/kelas/${kelasId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setGuruList(Array.isArray(data) ? data : []);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">List Siswa dan Guru Berdasarkan Kelas</h3>
          
          <div className="mb-4">
            <label className="form-label">Pilih Kelas</label>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="form-select"
            >
              <option value="">-- Pilih Kelas --</option>
              {kelasList.map((kelas) => (
                <option key={kelas.id} value={kelas.id}>
                  {kelas.nama}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Siswa</h5>
                  <ul className="list-group list-group-flush">
                    {siswaList.length > 0 ? (
                      siswaList.map((siswa) => (
                        <li key={siswa.id} className="list-group-item">{siswa.nama}</li>
                      ))
                    ) : (
                      <li className="list-group-item text-muted">Tidak ada data siswa</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Guru</h5>
                  <ul className="list-group list-group-flush">
                    {guruList.length > 0 ? (
                      guruList.map((guru) => (
                        <li key={guru.id} className="list-group-item">{guru.nama}</li>
                      ))
                    ) : (
                      <li className="list-group-item text-muted">Tidak ada data guru</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}