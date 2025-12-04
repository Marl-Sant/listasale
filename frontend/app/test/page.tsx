'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import StripeTestButton from '@/components/StripeTestButton/StripeTestButton';
import StripeSubTestButton from '@/components/StripeSubTestButton/StripeSubTestButton';

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

      {user ? <><StripeTestButton /> <StripeSubTestButton /></> : <></>}
    </main>
  );
}
