'use client';

import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { login } from '../../store/session';
import { useModal } from '../../context/Modal';

export default function LoginFormModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { closeModal } = useModal();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ credential?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    (dispatch(
      login({ credential, password }) as any
    ) as Promise<Response>)
      .then(() => closeModal())
      .catch(async (res: Response) => {
        try {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        } catch {
        }
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
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

        {errors.credential && <p>{errors.credential}</p>}

        <button type="submit">Log In</button>
      </form>
    </>
  );
}
