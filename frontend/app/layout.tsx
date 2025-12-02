import type { Metadata } from 'next';
import './globals.css';
import Providers from './Providers';
import Navigation from '../components/Navigation/Navigation';
import { CsrfBootstrapper } from './CsrfBootstrapper';

export const metadata: Metadata = {
  title: 'Authenticate Me',
  description: 'Authentication demo with Next.js, Redux, and CSRF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CsrfBootstrapper />
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
