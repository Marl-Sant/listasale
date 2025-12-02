'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { createCheckoutSession } from '@/store/stripe';

export default function HomePage() {
  const user = useSelector((state: RootState) => state.session.user);
  const handleStripeRedirect = async () => {
    const response = await createCheckoutSession()
    window.location.href = response
  } 
  return (
    <main>
      <h1>Welcome{user ? <ul>
        
        {Object.values(user).map((attribute, i) => (
          <li key={i}>{`${attribute}`}</li>
        ))}
         
      </ul>
      : '!'}</h1>

      {user ? <button onClick={handleStripeRedirect}>Buy a Listing</button> : <></>}
    </main>
  );
}
