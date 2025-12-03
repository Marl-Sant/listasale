import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Providers from './Providers';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';

// Configure Rig Sans with all weights
const rigSans = localFont({
  src: [
    {
      path: '../public/fonts/Rig Sans Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Rig Sans Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Rig Sans Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Rig Sans Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-rig-sans',
  display: 'swap',
});

// Configure Darkmode font
const darkmode = localFont({
  src: [
    {
      path: '../public/fonts/Darkmode DarkmodeOn Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-darkmode',
  display: 'swap',
});

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
    <html lang="en" className={`${rigSans.variable} ${darkmode.variable}`}>
      <body>
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}