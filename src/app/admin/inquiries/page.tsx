'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { MessageSquare, Phone, Mail, Check, Trash2, Loader2, RefreshCw } from 'lucide-react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setInquiries(list);
    } catch (e) {
      // Fallback sample data if Firebase keys not configured
      setInquiries([
        {
          id: 'demo-1',
          name: 'Karthik Raja',
          phone: '+91 9842109876',
          email: 'karthik@gmail.com',
          program: 'Olympic Weightlifting',
          message: 'Interested in joining morning batch 6 AM. Age 16.',
          status: 'new',
          date: 'Today'
        },
        {
          id: 'demo-2',
          name: 'Priya Sundaram',
          phone: '+91 9789012345',
          email: 'priya@outlook.com',
          program: 'Youth Academy (Age 8+)',
          message: 'Enquiring for my 12-year-old son for weightlifting foundation.',
          status: 'contacted',
          date: 'Yesterday'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'contacted' ? 'new' : 'contacted';
    try {
      await updateDoc(doc(db, 'inquiries', id), { status: nextStatus });
    } catch (e) {
      // Local fallback
    }
    setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status: nextStatus } : inq)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (e) {
      // Local fallback
    }
    setInquiries(inquiries.filter((inq) => inq.id !== id));
  };

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-title">Inquiries & Leads</h1>
          <p style={{ color: '#a7afc0', fontSize: '0.95rem' }}>
            Manage athlete queries and track contact status
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="btn-outline"
          style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Athlete Name</th>
              <th>Contact Details</th>
              <th>Program</th>
              <th>Message / Notes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 10px', color: 'var(--gold)' }} />
                  <p style={{ color: '#a7afc0' }}>Loading inquiries...</p>
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#a7afc0' }}>
                  No inquiries found. When visitors submit the contact form, they will appear here!
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>
                    <strong>{inq.name}</strong>
                  </td>
                  <td>
                    <div>
                      <a href={`tel:${inq.phone}`} style={{ color: 'var(--gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={13} /> {inq.phone}
                      </a>
                    </div>
                    {inq.email && (
                      <div style={{ fontSize: '0.8rem', color: '#a7afc0', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={12} /> {inq.email}
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{ background: '#132338', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem' }}>
                      {inq.program || 'Olympic Weightlifting'}
                    </span>
                  </td>
                  <td style={{ maxWidth: '300px', fontSize: '0.85rem', color: '#c7d2df' }}>
                    {inq.message || 'No specific queries mentioned.'}
                  </td>
                  <td>
                    <span className={`badge ${inq.status === 'contacted' ? 'badge-contacted' : 'badge-new'}`}>
                      {inq.status || 'new'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleToggleStatus(inq.id, inq.status)}
                        className="action-btn"
                        title="Toggle Contacted Status"
                      >
                        <Check size={14} /> {inq.status === 'contacted' ? 'Mark New' : 'Mark Contacted'}
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="action-btn delete"
                        title="Delete Enquiry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
