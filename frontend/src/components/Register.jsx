import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    if (password !== passwordConfirmation) {
      setMessage('Password dan konfirmasi password tidak cocok');
      return;
    }

    const payload = { name, email, password, password_confirmation: passwordConfirmation };

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setMessage('Registrasi berhasil, mengalihkan ke halaman login...');
        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          setMessage(errorMessages);
        } else {
          setMessage(data.message || 'Registrasi gagal');
        }
      }
    } catch (error) {
      setMessage('Terjadi kesalahan jaringan');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Register</h2>
      {message && (
        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nama</label>
          <input
            id="name"
            type="text"
            placeholder="Nama"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirmation" className="form-label">Konfirmasi Password</label>
          <input id="passwordConfirmation" type="password" placeholder="Konfirmasi Password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} className="form-control" required/>
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <p className="mt-3 text-center">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-primary">
          Login di sini
        </Link>
      </p>
    </div>
  );
}
