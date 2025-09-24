import { useState } from 'react';
import { signUp } from '../lib/cognito';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      setMessage('Signup successful! Please check your email to confirm.');
    } catch (err: any) {
      setMessage(err.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
      <p>{message}</p>
    </div>
  );
}