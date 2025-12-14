'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import type { RootState, AppDispatch } from '../../store/store';
import { signup } from '../../store/session';
// import './SignupForm.css'; // we'll add this file next

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const sessionUser = useSelector(
    (state: RootState) => state.session.user
  );

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (sessionUser) {
      router.replace('/');
    }
  }, [sessionUser, router]);

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

    dispatch(
      signup({
        email,
        username,
        firstName,
        lastName,
        password,
      }) as any
    ).catch(async (res: Response) => {
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
    <main className="signup-form-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="signup-error">{errors.email}</p>}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && (
          <p className="signup-error">{errors.username}</p>
        )}

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && (
          <p className="signup-error">{errors.firstName}</p>
        )}

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && (
          <p className="signup-error">{errors.lastName}</p>
        )}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && (
          <p className="signup-error">{errors.password}</p>
        )}

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="signup-error">{errors.confirmPassword}</p>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}
