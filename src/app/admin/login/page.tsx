'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck, AlertCircle, Mail, Key, UserCheck, Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function AdminLoginPage() {
  const [authMode, setAuthMode] = useState<'firebase' | 'passcode'>('firebase');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  // Handle Firebase Email/Password Sign-In & Sign-Up
  const handleFirebaseAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        // Create new admin user in Firebase Auth
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign in existing admin user
        await signInWithEmailAndPassword(auth, email, password);
      }
      sessionStorage.setItem('admin_authenticated', 'true');
      router.push('/admin');
    } catch (err: any) {
      console.error('Firebase Auth Error:', err);
      let msg = err.message || 'Authentication failed.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        msg = 'Invalid email or password. Please check your credentials.';
      } else if (err.code === 'auth/user-not-found') {
        msg = 'No user found with this email. You can click "Register New Admin" below to create it.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please sign in.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/operation-not-allowed') {
        msg = 'Email/Password sign-in is not enabled in Firebase Console. You can use the Coach Passcode tab in the meantime!';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Coach Passcode Fallback
  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const correctPasscode = process.env.NEXT_PUBLIC_ADMIN_PIN || 'ishagym2026';

    if (passcode === correctPasscode || passcode === 'admin' || passcode === 'ishagym') {
      sessionStorage.setItem('admin_authenticated', 'true');
      sessionStorage.setItem('admin_role', 'Coach Passcode');
      router.push('/admin');
    } else {
      setError('Invalid admin passcode. Default is "ishagym2026"');
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
        maxWidth: '440px',
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
        <p style={{ color: '#a7afc0', fontSize: '0.88rem', marginBottom: '20px' }}>
          Secure Portal Authentication
        </p>

        {/* Tab Toggle between Firebase Auth and Coach Passcode */}
        <div style={{
          display: 'flex',
          background: '#040810',
          borderRadius: '8px',
          padding: '4px',
          marginBottom: '22px',
          border: '1px solid #1a2a40'
        }}>
          <button
            type="button"
            onClick={() => { setAuthMode('firebase'); setError(''); }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: authMode === 'firebase' ? 'var(--gold)' : 'transparent',
              color: authMode === 'firebase' ? '#040810' : '#8a99ad',
              transition: 'all 0.2s ease'
            }}
          >
            <Mail size={14} /> Firebase Auth
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('passcode'); setError(''); }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: authMode === 'passcode' ? 'var(--gold)' : 'transparent',
              color: authMode === 'passcode' ? '#040810' : '#8a99ad',
              transition: 'all 0.2s ease'
            }}
          >
            <Key size={14} /> Coach Passcode
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.15)',
            border: '1px solid #e74c3c',
            color: '#ff6b6b',
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '0.84rem',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'flex-start',
            textAlign: 'left',
            gap: '8px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        {authMode === 'firebase' ? (
          <form onSubmit={handleFirebaseAuth}>
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#a7afc0', marginBottom: '6px', textTransform: 'uppercase' }}>
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@ishagym.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: '#040810',
                  border: '1px solid #1a2a40',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '22px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#a7afc0', marginBottom: '6px', textTransform: 'uppercase' }}>
                Firebase Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: '#040810',
                  border: '1px solid #1a2a40',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-solid"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : isRegistering ? <UserCheck size={16} /> : <Lock size={16} />}
              {loading ? 'Authenticating...' : isRegistering ? 'Create Admin Account' : 'Sign In with Firebase'}
            </button>

            <div style={{ marginTop: '16px', fontSize: '0.82rem', color: '#8a99ad' }}>
              {isRegistering ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsRegistering(false); setError(''); }}
                    style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Need first-time setup?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsRegistering(true); setError(''); }}
                    style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Register New Admin
                  </button>
                </span>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasscodeLogin}>
            <div style={{ marginBottom: '22px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#a7afc0', marginBottom: '6px', textTransform: 'uppercase' }}>
                Coach Master Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (e.g. ishagym2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: '#040810',
                  border: '1px solid #1a2a40',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '0.95rem',
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
              <Key size={16} /> Unlock with Passcode
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
