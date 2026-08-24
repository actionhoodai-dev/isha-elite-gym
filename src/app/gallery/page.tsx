import React from 'react';
import GalleryGrid from '@/components/GalleryGrid';
import AthletePhotoGrid from '@/components/AthletePhotoGrid';

export const metadata = {
  title: 'Gallery | ISHA GYM Weightlifting Sports Academy',
  description: 'Moments of strength, discipline, championships, and achievements at Isha Gym Weightlifting Sports Academy.',
};

export default function GalleryPage() {
  return (
    <main>
      {/* Primary Curated Gallery */}
      <section className="gallery-section">
        <div className="gallery-header">
          <div className="gallery-header__left">
            <div className="gallery-eyebrow">Our Gallery</div>
            <h1 className="gallery-title">
              Strength in <span>Every</span> Moment
            </h1>
          </div>
          <p className="gallery-desc">
            From dawn training sessions to podium finishes — every frame captures
            the discipline of our athletes, the intensity of competition, and the
            milestones earned through relentless work in the gym and on the field.
          </p>
        </div>

        <GalleryGrid />
      </section>

      {/* Separated Athlete Showcase Grid */}
      <div style={{ background: '#040810', borderTop: '1px solid #1a2a40', padding: '20px 24px 80px' }}>
        <AthletePhotoGrid />
      </div>
    </main>
  );
}
