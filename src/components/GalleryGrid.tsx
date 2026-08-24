'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  category: string;
  title: string;
  catLabel?: string;
  spanClass?: string;
}

const DEFAULT_ITEMS: GalleryItem[] = [
  { id: '1', src: '/images/g1.jpeg', category: 'gym-training', catLabel: 'Weightlifting Training', title: 'Training Starts at Age 13', spanClass: 'w2 h2' },
  { id: '2', src: '/images/g2.jpeg', category: 'gym-training', catLabel: 'Weightlifting', title: 'Barbell Power Clean' },
  { id: '3', src: '/images/g3.jpeg', category: 'competitions', catLabel: 'Asian Championship', title: 'Championship in Weightlifting', spanClass: 'w2' },
  { id: '4', src: '/images/g4.jpeg', category: 'competitions', catLabel: 'Competitions', title: 'Regional Championship', spanClass: 'h2' },
  { id: '5', src: '/images/g5.jpeg', category: 'achievements', catLabel: 'Achievements', title: 'Podium Finish' },
  { id: '6', src: '/images/g6.jpeg', category: 'gym-training', catLabel: 'Athletes', title: 'Focused & Ready' },
  { id: '7', src: '/images/g7.jpeg', category: 'achievements', catLabel: 'Gold Medals', title: 'Weightlifting in State Level' },
  { id: '8', src: '/images/g8.jpeg', category: 'achievements', catLabel: 'Weightlifting', title: 'Max Effort Session', spanClass: 'w2 h2' },
  { id: '9', src: '/images/g9.jpeg', category: 'competitions', catLabel: 'National Tournament', title: 'Asian Cup Tournament' },
  { id: '10', src: '/images/g10.jpeg', category: 'competitions', catLabel: 'Competitions', title: 'Finals Night' },
  { id: '11', src: '/images/g11.jpeg', category: 'achievements', catLabel: 'Achievements', title: 'National Title Win', spanClass: 'w2' },
  { id: '12', src: '/images/g12.jpeg', category: 'gym-training', catLabel: 'Athletes', title: 'Built Through Discipline', spanClass: 'h2' },
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_ITEMS);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    async function loadDynamicGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            const dynamicFormatted: GalleryItem[] = data.items.map((it: any) => ({
              id: it.id,
              src: it.url,
              category: it.category || 'gym-training',
              catLabel: it.category?.replace('-', ' ').toUpperCase() || 'GALLERY',
              title: it.title || 'Academy Moment',
              spanClass: '',
            }));
            setItems([...dynamicFormatted, ...DEFAULT_ITEMS]);
          }
        }
      } catch (e) {
        // Fallback to default static items
      }
    }
    loadDynamicGallery();
  }, []);

  const filteredItems = items.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="gallery-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'gym-training' ? 'active' : ''}`}
          onClick={() => setFilter('gym-training')}
        >
          Gym Training
        </button>
        <button
          className={`filter-btn ${filter === 'competitions' ? 'active' : ''}`}
          onClick={() => setFilter('competitions')}
        >
          Competitions
        </button>
        <button
          className={`filter-btn ${filter === 'achievements' ? 'active' : ''}`}
          onClick={() => setFilter('achievements')}
        >
          Achievements
        </button>
      </div>

      {/* Main Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`gallery-item ${item.spanClass || ''}`}
            onClick={() => setSelectedImg(item.src)}
          >
            <img src={item.src} alt={item.title} loading="lazy" />
            <div className="gallery-corner"></div>
            <div className="gallery-overlay">
              <div className="gallery-overlay__inner">
                <span className="gallery-cat">{item.catLabel}</span>
                <div className="gallery-item-title">{item.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            cursor: 'zoom-out'
          }}
        >
          <button
            onClick={() => setSelectedImg(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'var(--gold)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#000'
            }}
          >
            <X size={24} />
          </button>
          <img
            src={selectedImg}
            alt="Enlarged gallery view"
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              borderRadius: '8px',
              objectFit: 'contain',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
            }}
          />
        </div>
      )}
    </>
  );
}
