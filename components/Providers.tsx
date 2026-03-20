'use client';

import { UserProvider } from '@/context/UserContext';
import { ErrorBoundary } from './ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <UserProvider>{children}</UserProvider>
    </ErrorBoundary>
  );
}
