'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import StripeTestButton from '@/components/StripeTestButton/StripeTestButton';

export default function SuccessPage() {
  const user = useSelector((state: RootState) => state.session.user);
  
  return (
    <main>
      <h1>Payments Failed!</h1>
    </main>
  );
}
