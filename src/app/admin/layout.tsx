'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    // Check Firebase Auth state & Session fallback
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setAuthorized(true);
        sessionStorage.setItem('admin_authenticated', 'true');
      } else {
        const isSessionAuth = sessionStorage.getItem('admin_authenticated');
        if (isSessionAuth) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
          router.push('/admin/login');
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!authorized) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#040810',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(234, 181, 44, 0.2)',
            borderTopColor: 'var(--gold)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#a7afc0', fontSize: '0.9rem' }}>Verifying Firebase Authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <AdminSidebar currentUserEmail={currentUser?.email || null} />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
