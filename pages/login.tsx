import { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { login } from '../lib/cognito';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
  console.log('Login button clicked'); // ✅ Add this line

  try {
    const token = await login(email, password);
    console.log('Token received:', token);

    setCookie(null, 'token', token, {
      path: '/',
      maxAge: 3600,
    });

    console.log('Cookie set');
    router.push('/dashboard');
  } catch (err: any) {
    console.error('Login error:', err);
    setMessage(err.message || 'Login failed');
  }
};

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}