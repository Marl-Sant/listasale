'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function HomePage() {
  const user = useSelector((state: RootState) => state.session.user);

  return (
    <main>
      <h1>Welcome{user ? `, ${user.email}!` : '!'}</h1>
    </main>
  );
}
