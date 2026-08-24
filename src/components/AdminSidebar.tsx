'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Image, ExternalLink, LogOut, User as UserIcon } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

interface AdminSidebarProps {
  currentUserEmail?: string | null;
}

export default function AdminSidebar({ currentUserEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // Ignore
    }
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_role');
    router.push('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          border: '2px solid var(--gold)',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '2px',
          flexShrink: 0
        }}>
          <img
            src="/images/logo.jpeg"
            alt="Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div>
          <h2>ISHA GYM <span>ADMIN</span></h2>
          <p style={{ margin: 0, fontSize: '0.7rem', color: '#6d7f99' }}>Sports Academy Portal</p>
        </div>
      </div>

      {currentUserEmail && (
        <div style={{
          margin: '12px 16px 6px',
          padding: '8px 12px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <UserIcon size={14} color="var(--gold)" />
          <span style={{ fontSize: '0.78rem', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentUserEmail}
          </span>
        </div>
      )}

      <ul className="admin-nav-links">
        <li className="admin-nav-item">
          <Link
            href="/admin"
            className={pathname === '/admin' ? 'active' : ''}
          >
            <LayoutDashboard size={18} /> Overview
          </Link>
        </li>
        <li className="admin-nav-item">
          <Link
            href="/admin/inquiries"
            className={pathname === '/admin/inquiries' ? 'active' : ''}
          >
            <MessageSquare size={18} /> Inquiries & Leads
          </Link>
        </li>
        <li className="admin-nav-item">
          <Link
            href="/admin/gallery"
            className={pathname === '/admin/gallery' ? 'active' : ''}
          >
            <Image size={18} /> Gallery Manager
          </Link>
        </li>
      </ul>

      <div className="admin-sidebar-footer">
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: '#a7afc0',
            marginBottom: '14px',
            textDecoration: 'none'
          }}
        >
          <ExternalLink size={16} /> View Live Website
        </Link>
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(231, 76, 60, 0.15)',
            border: '1px solid #e74c3c',
            color: '#ff6b6b',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
