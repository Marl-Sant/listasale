'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { restoreCSRF, csrfFetch } from '../store/csrf';
import { sessionActions, restoreUser } from '../store/session';
import { ModalProvider, Modal } from '../context/Modal';
import { CsrfBootstrapper } from './CsrfBootstrapper';

export default function Providers({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (process.env.NODE_ENV !== 'production') {
        await restoreCSRF();
        (window as any).csrfFetch = csrfFetch;
        (window as any).store = store;
        (window as any).sessionActions = sessionActions;
      }

      await (store.dispatch as any)(restoreUser());
      setIsLoaded(true);
    };

    run();
  }, []);

  return (
    <Provider store={store}>
      <ModalProvider>
        <CsrfBootstrapper />
        {isLoaded && children}
        <Modal />
      </ModalProvider>
    </Provider>
  );
}
