'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Image, ExternalLink, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    router.push('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <img
          src="/images/logo.jpeg"
          alt="Logo"
          style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid var(--gold)' }}
        />
        <h2>ISHA GYM <span>ADMIN</span></h2>
      </div>

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
