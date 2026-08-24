'use client';

import React, { useState, useEffect } from 'react';
import { UploadCloud, Trash2, CheckCircle, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';

export default function GalleryManagerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('gym-training');
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (e) {
      // Ignored
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: 'error', text: 'Please select an image file.' });
      return;
    }

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title || 'Academy Highlight');
    formData.append('category', category);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Photo uploaded to Cloudinary & added to Gallery!' });
        setFile(null);
        setPreview(null);
        setTitle('');
        fetchGallery();
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed. Check Cloudinary credentials.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Network error occurred during upload.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, publicId?: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    try {
      await fetch('/api/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, publicId }),
      });
      setItems(items.filter((it) => it.id !== id));
    } catch (e) {
      // Local fallback
    }
  };

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-title">Gallery Manager</h1>
          <p style={{ color: '#a7afc0', fontSize: '0.95rem' }}>
            Upload new photos to Cloudinary and organize gallery categories
          </p>
        </div>
      </div>

      {message && (
        <div style={{
          background: message.type === 'success' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
          border: `1px solid ${message.type === 'success' ? '#2ecc71' : '#e74c3c'}`,
          color: message.type === 'success' ? '#2ecc71' : '#ff6b6b',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Upload Box */}
      <form onSubmit={handleUpload} className="upload-card">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <UploadCloud size={48} style={{ color: 'var(--gold)', marginBottom: '12px' }} />
          <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
            Upload New Photo to Cloudinary
          </h3>
          <p style={{ color: '#a7afc0', fontSize: '0.9rem', marginBottom: '20px' }}>
            Supports PNG, JPEG, WEBP files
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: '18px', color: '#a7afc0' }}
          />

          {preview && (
            <div style={{ margin: '16px auto', width: '200px', height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--gold)' }}>
              <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#a7afc0', marginBottom: '6px', fontWeight: 600 }}>
                Photo Title
              </label>
              <input
                type="text"
                placeholder="e.g. State Championship Gold"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#040810', border: '1px solid #1a2a40', borderRadius: '6px', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#a7afc0', marginBottom: '6px', fontWeight: 600 }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#040810', border: '1px solid #1a2a40', borderRadius: '6px', color: '#fff' }}
              >
                <option value="gym-training">Gym Training</option>
                <option value="competitions">Competitions</option>
                <option value="achievements">Achievements</option>
                <option value="athletes">Athletes</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn-solid"
            disabled={uploading}
            style={{ width: '100%', cursor: uploading ? 'not-allowed' : 'pointer' }}
          >
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Uploading to Cloudinary...
              </>
            ) : (
              <>
                <UploadCloud size={16} /> Save & Publish Photo
              </>
            )}
          </button>
        </div>
      </form>

      {/* Uploaded Photos Grid */}
      <div>
        <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.4rem', color: '#fff', marginBottom: '16px' }}>
          Uploaded Media ({items.length})
        </h3>

        {items.length === 0 ? (
          <p style={{ color: '#a7afc0', fontSize: '0.9rem' }}>
            No Cloudinary uploaded photos yet. Default static assets are currently active on the public gallery.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {items.map((it) => (
              <div
                key={it.id}
                style={{
                  background: '#0a1728',
                  border: '1px solid #1e3350',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img src={it.url} alt={it.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {it.category}
                  </span>
                  <h4 style={{ fontSize: '0.95rem', color: '#fff', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {it.title}
                  </h4>
                  <button
                    onClick={() => handleDelete(it.id, it.publicId)}
                    className="action-btn delete"
                    style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}
                  >
                    <Trash2 size={14} /> Remove Photo
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
