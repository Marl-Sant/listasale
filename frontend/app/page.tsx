'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function HomePage() {
  const user = useSelector((state: RootState) => state.session.user);

  return (
    <main>
      <h1>Welcome{user ? <ul>
        
        {Object.values(user).map((attribute, i) => (
          <li key={i}>{`${attribute}`}</li>
        ))}
         
      </ul>
      : '!'}</h1>
    </main>
  );
}
