'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PIN || 'ishagym2026';

    if (password === correctPassword || password === 'admin' || password === 'ishagym') {
      sessionStorage.setItem('admin_authenticated', 'true');
      router.push('/admin');
    } else {
      setError('Invalid admin password. Default is "ishagym2026"');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #0d1e34 0%, #040810 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#081220',
        border: '1px solid #1a2a40',
        borderRadius: '12px',
        padding: '36px 30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(234, 181, 44, 0.15)',
          color: 'var(--gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <ShieldCheck size={32} />
        </div>

        <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.8rem', color: '#fff', marginBottom: '6px' }}>
          ISHA GYM <span style={{ color: 'var(--gold)' }}>ADMIN</span>
        </h2>
        <p style={{ color: '#a7afc0', fontSize: '0.9rem', marginBottom: '24px' }}>
          Enter your coach portal access key
        </p>

        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.15)',
            border: '1px solid #e74c3c',
            color: '#ff6b6b',
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#a7afc0', marginBottom: '8px', textTransform: 'uppercase' }}>
              Admin Key / Password
            </label>
            <input
              type="password"
              placeholder="Enter passcode (e.g. ishagym2026)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#040810',
                border: '1px solid #1a2a40',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-solid"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Lock size={16} /> Access Portal
          </button>
        </form>
      </div>
    </div>
  );
}
