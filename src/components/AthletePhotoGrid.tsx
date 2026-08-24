'use client';

import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface AthletePhoto {
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

const ATHLETE_IMAGES: AthletePhoto[] = [
  { src: '/images/a13.jpeg', alt: 'Academy Athlete 1', title: 'Power Clean & Jerk', category: 'Training' },
  { src: '/images/a14.jpeg', alt: 'Academy Athlete 2', title: 'Barbell Snatch', category: 'Technique' },
  { src: '/images/a15.jpeg', alt: 'Academy Athlete 3', title: 'Strength Training', category: 'Discipline' },
  { src: '/images/a16.jpeg', alt: 'Academy Athlete 4', title: 'Youth Athlete', category: 'Academy' },
  { src: '/images/a17.jpeg', alt: 'Academy Athlete 5', title: 'Competition Prep', category: 'Focus' },
  { src: '/images/a18.jpeg', alt: 'Academy Athlete 6', title: 'Squat Mastery', category: 'Power' },
  { src: '/images/a19.jpeg', alt: 'Academy Athlete 7', title: 'State Championship', category: 'Tournament' },
  { src: '/images/a20.jpeg', alt: 'Academy Athlete 8', title: 'Medal Win', category: 'Podium' },
  { src: '/images/a21.jpeg', alt: 'Academy Athlete 9', title: 'Olympic Lift', category: 'Discipline' },
  { src: '/images/a22.jpeg', alt: 'Academy Athlete 10', title: 'Dedicated Session', category: 'Training' },
  { src: '/images/a23.jpeg', alt: 'Academy Athlete 11', title: 'National Level', category: 'Excellence' },
  { src: '/images/a24.jpeg', alt: 'Academy Athlete 12', title: 'Athlete Focus', category: 'Technique' },
  { src: '/images/a25.jpeg', alt: 'Academy Athlete 13', title: 'Trophy Ceremony', category: 'Victory' },
  { src: '/images/a26.jpeg', alt: 'Academy Athlete 14', title: 'Team Isha Gym', category: 'Academy' },
  { src: '/images/a27.jpeg', alt: 'Academy Athlete 15', title: 'Future Champion', category: 'Youth' },
];

export default function AthletePhotoGrid() {
  const [selectedPhoto, setSelectedPhoto] = useState<AthletePhoto | null>(null);

  return (
    <section className="athlete-section" style={{ padding: '60px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.9rem', letterSpacing: '0.2em' }}>
          ATHLETE SPOTLIGHT
        </span>
        <h2 style={{
          fontFamily: 'Oswald, sans-serif',
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          color: '#ffffff',
          marginTop: '8px'
        }}>
          Champions In <span style={{ color: 'var(--gold)' }}>Action</span>
        </h2>
        <p style={{ color: '#a7afc0', maxWidth: '700px', margin: '10px auto 0', fontSize: '1rem' }}>
          Real photos capturing daily training, lifting discipline, and state & national competition moments.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {ATHLETE_IMAGES.map((photo, index) => (
          <div
            key={index}
            onClick={() => setSelectedPhoto(photo)}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#0a1728',
              border: '1px solid #1e3350',
              aspectRatio: '4 / 5',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'var(--gold)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(234, 181, 44, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#1e3350';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease'
              }}
            />

            {/* Corner Badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(9, 22, 38, 0.85)',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              backdropFilter: 'blur(4px)'
            }}>
              {photo.category}
            </div>

            {/* Overlay Gradient with Title */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(4, 8, 16, 0.95) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '18px'
            }}>
              <h4 style={{
                color: '#ffffff',
                fontFamily: 'Oswald, sans-serif',
                fontSize: '1.2rem',
                margin: 0,
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>{photo.title}</span>
                <ZoomIn size={18} style={{ color: 'var(--gold)' }} />
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '24px',
            cursor: 'zoom-out'
          }}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'var(--gold)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}
          >
            <X size={24} />
          </button>
          <div style={{ maxWidth: '900px', maxHeight: '85vh', textAlign: 'center' }}>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '12px',
                objectFit: 'contain',
                boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
                border: '2px solid rgba(234, 181, 44, 0.4)'
              }}
            />
            <p style={{ color: '#fff', fontFamily: 'Oswald, sans-serif', fontSize: '1.3rem', marginTop: '12px', textTransform: 'uppercase' }}>
              {selectedPhoto.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
