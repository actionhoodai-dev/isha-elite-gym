'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: 'Olympic Weightlifting',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatus('error');
      setErrorMessage('Please enter your name and phone number.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          program: 'Olympic Weightlifting',
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try calling coach directly.');
    }
  };

  return (
    <div className="form-card">
      <h3>
        Send An <span className="acent">Enquiry</span>
      </h3>
      <p>Fill out the form below and our head coach will get in touch with you shortly.</p>

      {status === 'success' ? (
        <div style={{
          background: 'rgba(46, 204, 113, 0.12)',
          border: '1px solid #2ecc71',
          padding: '24px',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#2ecc71'
        }}>
          <CheckCircle size={40} style={{ margin: '0 auto 12px' }} />
          <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Enquiry Received!</h4>
          <p style={{ color: '#d1d9e6', fontSize: '0.95rem' }}>
            Thank you! Coach Shanmugam will reach out to you within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="btn-outline"
            style={{ marginTop: '16px', padding: '8px 20px', fontSize: '0.85rem' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {status === 'error' && (
            <div style={{
              background: 'rgba(231, 76, 60, 0.15)',
              border: '1px solid #e74c3c',
              padding: '12px 16px',
              borderRadius: '6px',
              color: '#ff6b6b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}>
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email (Optional)</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="athlete@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="program">Training Program</label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
              >
                <option value="Olympic Weightlifting">Olympic Weightlifting (Boys & Girls)</option>
                <option value="Strength & Powerlifting">Strength & Powerlifting</option>
                <option value="Youth Academy (Age 8+)">Youth Academy (School/College)</option>
                <option value="Competition Preparation">State/National Competition Prep</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message / Queries</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your fitness background, age, or any questions..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-solid"
            disabled={status === 'loading'}
            style={{ width: '100%', cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting Enquiry...
              </>
            ) : (
              <>
                <Send size={16} /> Submit Enquiry
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
