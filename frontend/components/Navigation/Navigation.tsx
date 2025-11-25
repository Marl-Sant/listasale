'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import styles from './Navigation.module.css';

export default function Navigation() {
  const sessionUser = useSelector(
    (state: RootState) => state.session.user
  );

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    </>
  );

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}
