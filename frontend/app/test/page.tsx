'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import type {User} from '../../store/session'
import StripeTestButton from '@/components/StripeTestButton/StripeTestButton';
import StripeSubTestButton from '@/components/StripeSubTestButton/StripeSubTestButton';

export default function TestPage() {
  const user = useSelector((state: RootState) => state.session.user);
  const hasSub = useSelector((state: RootState) => state.session.user?.subscriptionStatus === 'active' || state.session.user?.subscriptionStatus === 'trialing')
  console.log(user?.subscriptionStatus, hasSub, user?.subscriptionStatus === 'active', typeof user?.subscriptionStatus)

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl card shadow-lg border-0 rounded-2xl bg-white">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
            {user
              ? `Welcome, ${user.firstName ?? user.username ?? ''}`.trim()
              : 'Welcome!'}
          </h1>

          {user ? (
            <>
              <p className="text-sm text-slate-500 mb-3">
                Here’s the info we currently have for your account:
              </p>

              <ul className="mb-6 divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
                {Object.entries(user).map(([key, value]) => (
                  <li
                    key={key}
                    className="flex items-center justify-between px-3 py-2 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-medium text-slate-700 capitalize">
                      {key}
                    </span>
                    <span className="ml-4 text-right text-slate-600 truncate max-w-[60%]">
                      {String(value)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <StripeTestButton />
                {`${user}`}
                {hasSub ? (
                  <p>Congratz you are currently subbed!</p>
                ) : (
                <StripeSubTestButton />
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-600">
              You’re not signed in yet. Log in to see your account details and
              try the Stripe test flows.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
