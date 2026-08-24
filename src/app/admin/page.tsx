'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Image, Users, TrendingUp, CheckCircle, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export default function AdminOverviewPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPhotos, setTotalPhotos] = useState(12);

  useEffect(() => {
    async function loadData() {
      try {
        const inqSnap = await getDocs(query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'), limit(5)));
        const inqList = inqSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInquiries(inqList);

        const galSnap = await getDocs(collection(db, 'gallery_items'));
        setTotalPhotos(12 + galSnap.size);
      } catch (err) {
        // Mock fallback if Firestore not configured yet
        setInquiries([
          { id: '1', name: 'Karthik Raja', phone: '+91 9842109876', email: 'karthik@gmail.com', program: 'Olympic Weightlifting', status: 'new', createdAt: null },
          { id: '2', name: 'Priya Sundaram', phone: '+91 9789012345', email: 'priya@outlook.com', program: 'Youth Academy (Age 8+)', status: 'contacted', createdAt: null }
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-title">Dashboard Overview</h1>
          <p style={{ color: '#a7afc0', fontSize: '0.95rem' }}>Welcome to Isha Gym Management System</p>
        </div>
        <Link href="/admin/gallery" className="btn-solid" style={{ fontSize: '0.85rem', padding: '10px 18px' }}>
          <Image size={16} /> Upload New Photo
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-box">
          <div className="admin-stat-icon">
            <MessageSquare size={24} />
          </div>
          <div>
            <div className="admin-stat-val">{inquiries.length}</div>
            <div className="admin-stat-lbl">Total Inquiries Received</div>
          </div>
        </div>

        <div className="admin-stat-box">
          <div className="admin-stat-icon">
            <Users size={24} />
          </div>
          <div>
            <div className="admin-stat-val">500+</div>
            <div className="admin-stat-lbl">Active Students & Alumni</div>
          </div>
        </div>

        <div className="admin-stat-box">
          <div className="admin-stat-icon">
            <Image size={24} />
          </div>
          <div>
            <div className="admin-stat-val">{totalPhotos}</div>
            <div className="admin-stat-lbl">Gallery Photos Hosted</div>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.2rem', color: '#fff' }}>
            Recent Athlete Inquiries
          </h3>
          <Link href="/admin/inquiries" style={{ color: 'var(--gold)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            View All <ArrowUpRight size={14} />
          </Link>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Athlete</th>
              <th>Phone</th>
              <th>Program</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#a7afc0' }}>
                  No inquiries recorded yet.
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>
                    <strong>{inq.name}</strong>
                    {inq.email && <div style={{ fontSize: '0.8rem', color: '#888' }}>{inq.email}</div>}
                  </td>
                  <td>
                    <a href={`tel:${inq.phone}`} style={{ color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={13} /> {inq.phone}
                    </a>
                  </td>
                  <td>{inq.program || 'Olympic Weightlifting'}</td>
                  <td>
                    <span className={`badge ${inq.status === 'contacted' ? 'badge-contacted' : 'badge-new'}`}>
                      {inq.status || 'new'}
                    </span>
                  </td>
                  <td>
                    <a href={`tel:${inq.phone}`} className="action-btn">
                      Call
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
