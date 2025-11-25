'use client';

import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { signup } from '../../store/session';
import { useModal } from '../../context/Modal';

export default function SignupFormModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { closeModal } = useModal();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors({
        confirmPassword:
          'Confirm Password field must be the same as the Password field',
      });
      return;
    }

    setErrors({});

    (dispatch(
      signup({
        email,
        username,
        firstName,
        lastName,
        password,
      }) as any
    ) as Promise<Response>)
      .then(() => closeModal())
      .catch(async (res: Response) => {
        try {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        } catch {
          // ignore parse errors
        }
      });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
