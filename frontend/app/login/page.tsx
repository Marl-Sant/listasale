'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import type { RootState, AppDispatch } from '../../store/store';
import { login } from '../../store/session';
// import './LoginForm.css'; // optional, see next section

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const sessionUser = useSelector(
    (state: RootState) => state.session.user
  );

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ credential?: string }>({});

  // If already logged in, redirect to '/'
  useEffect(() => {
    if (sessionUser) {
      router.replace('/');
    }
  }, [sessionUser, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    dispatch(login({ credential, password }) as any).catch(
      async (res: Response) => {
        try {
          const data = await res.json();
          if (data?.errors) setErrors(data.errors);
        } catch {
          // swallow parse errors
        }
      }
    );
  };

  return (
    <main className="login-form-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errors.credential && (
          <p className="login-error">{errors.credential}</p>
        )}

        <button type="submit">Log In</button>
      </form>
    </main>
  );
}
