'use client';

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import type { AppDispatch } from '../../store/store';
import { logout } from '../../store/session';
import type { User } from '../../store/session';
import styles from './Navigation.module.css';

interface ProfileButtonProps {
  user: User;
}

export default function ProfileButton({ user }: ProfileButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // prevent the document click handler from firing
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e: MouseEvent | MouseEventInit | any) => {
      if (ulRef.current && !ulRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout() as any);
  };

  const ulClassName = `${styles.profileDropdown} ${
    showMenu ? '' : styles.hidden
  }`;

  return (
    <>
      <button
        type="button"
        className={styles.profileButton}
        onClick={toggleMenu}
      >
        <span className={styles.profileButtonIcon}>
          <FaUserCircle />
        </span>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user.username}</li>
        <li>
          {user.firstName} {user.lastName}
        </li>
        <li>{user.email}</li>
        <li>
          <button type="button" onClick={handleLogout}>
            Log Out
          </button>
        </li>
      </ul>
    </>
  );
}
