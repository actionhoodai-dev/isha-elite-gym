import React from 'react';
import Link from 'next/link';
import { Trophy, Medal, Star, Users, Dumbbell, Landmark, Crown, Image as ImageIcon } from 'lucide-react';
import StatCounter from '@/components/StatCounter';

export const metadata = {
  title: 'Achievements | ISHA GYM Weightlifting Sports Academy',
  description: 'Major state, national, and international weightlifting championship achievements produced by Isha Gym.',
};

export default function AchievementsPage() {
  return (
    <main>
      <section className="achievement-hero">
        <div className="achievement-hero-grid">
          <div className="ach-content">
            <h2>Our Achievements</h2>
            <h1>Proud <span className="acent">Moments.</span></h1>
            <h1>Stronger <span className="acent">Together.</span></h1>
            <p>
              Every medal, milestone, and champion represents our athletes' hard
              work and coaches' dedication.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#stats" className="btn-solid">
                <Trophy size={16} /> View Stats
              </a>
              <Link href="/gallery" className="btn-outline">
                <ImageIcon size={16} /> View Gallery
              </Link>
            </div>
          </div>

          <div className="ach-left">
            <img src="/images/achievement.jpeg" alt="Isha Gym Medals" />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="stats-section" id="stats">
        <div className="ach-stats-grid">
          <div className="stat-card">
            <div className="icon-box">
              <Medal size={24} />
            </div>
            <StatCounter target={100} suffix="+" />
            <span className="lbl">State Level Medals</span>
          </div>

          <div className="stat-card">
            <div className="icon-box">
              <Star size={24} />
            </div>
            <StatCounter target={50} suffix="+" />
            <span className="lbl">Champions Produced</span>
          </div>

          <div className="stat-card">
            <div className="icon-box">
              <Trophy size={24} />
            </div>
            <StatCounter target={10} suffix="+" />
            <span className="lbl">State & National Events Won</span>
          </div>

          <div className="stat-card">
            <div className="icon-box">
              <Users size={24} />
            </div>
            <StatCounter target={500} suffix="+" />
            <span className="lbl">Happy Students</span>
          </div>

          <div className="stat-card">
            <div className="icon-box">
              <Dumbbell size={24} />
            </div>
            <StatCounter target={8} suffix="+" />
            <span className="lbl">Years of Excellence</span>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="section-alt">
        <div className="section-head">
          <span className="eyebrow">By Category</span>
          <h2>Competition <span className="acent">Highlights</span></h2>
          <p>
            Podium positions reached by our dedicated athletes across state and national stages.
          </p>
        </div>

        <div className="ach-grid">
          <div className="ach-card">
            <div className="top-row">
              <Trophy size={28} color="var(--gold)" />
              <span className="year-tag">2025</span>
            </div>
            <h4>National Championships</h4>
            <p>
              Multiple gold and silver finishes at the National Powerlifting Championship across sub-junior, junior, and senior categories.
            </p>
          </div>

          <div className="ach-card">
            <div className="top-row">
              <Landmark size={28} color="var(--gold)" />
              <span className="year-tag">2024–25</span>
            </div>
            <h4>State Championships</h4>
            <p>
              Consistent podium finishes at the Tamil Nadu State Powerlifting Championship, year on year.
            </p>
          </div>

          <div className="ach-card">
            <div className="top-row">
              <Medal size={28} color="var(--gold)" />
              <span className="year-tag">100+</span>
            </div>
            <h4>Medal Winners</h4>
            <p>
              Over a hundred national-level medals earned by academy athletes across weight classes.
            </p>
          </div>

          <div className="ach-card">
            <div className="top-row">
              <Crown size={28} color="var(--gold)" />
              <span className="year-tag">50+</span>
            </div>
            <h4>Championship Victories</h4>
            <p>
              Outright championship titles won across state and national level competitions.
            </p>
          </div>
        </div>
      </section>

      {/* Victory Glimpse Photos */}
      <section className="victory-section">
        <h3>Glimpse of Our Victory</h3>
        <div className="card-img">
          <div className="card-a">
            <img src="/images/a.jpeg" alt="Victory moment 1" />
          </div>
          <div className="card-a">
            <img src="/images/a1.jpeg" alt="Victory moment 2" />
          </div>
          <div className="card-a">
            <img src="/images/a2.jpeg" alt="Victory moment 3" />
          </div>
          <div className="card-a">
            <img src="/images/a3.jpeg" alt="Victory moment 4" />
          </div>
        </div>
      </section>

      {/* Major Achievements & Vision */}
      <section className="achievement-section">
        <div className="achievement-container">
          <div className="achievement-header">
            <span className="achievement-label">Our Achievements</span>
            <h2 className="achievement-heading">Excellence in Youth Development & Weightlifting</h2>
            <p className="achievement-description">
              Isha Gym Weightlifting Sports Academy is committed to developing young athletes through professional training, discipline, and dedicated coaching.
            </p>
          </div>

          <h3 className="achievement-subheading">
            🏆 Major Achievements
          </h3>

          <div className="achievement-grid">
            <div className="achievement-card">
              <div className="achievement-card-icon">🏆</div>
              <h4 className="achievement-card-title">School Games Federation of India (SGFI)</h4>
              <p className="achievement-card-text">
                Athletes achieved success at the National Level in Inter-School Weightlifting Competitions.
              </p>
            </div>

            <div className="achievement-card">
              <div className="achievement-card-icon">🥇</div>
              <h4 className="achievement-card-title">Tamil Nadu Chief Minister’s Trophy</h4>
              <p className="achievement-card-text">
                Secured achievements at Zonal, District, and State Levels conducted under SDAT.
              </p>
            </div>

            <div className="achievement-card">
              <div className="achievement-card-icon">🏅</div>
              <h4 className="achievement-card-title">Tamil Nadu State Championships</h4>
              <p className="achievement-card-text">
                Won medals at the Tamil Nadu State Level Weightlifting Championships.
              </p>
            </div>

            <div className="achievement-card">
              <div className="achievement-card-icon">💪</div>
              <h4 className="achievement-card-title">Salem District Champions</h4>
              <p className="achievement-card-text">
                Consistently maintained position as Salem District powerlifting Champions.
              </p>
            </div>

            <div className="achievement-card">
              <div className="achievement-card-icon">🌏</div>
              <h4 className="achievement-card-title">Asian Level Competitions</h4>
              <p className="achievement-card-text">
                Represented and achieved success in Asian Level powerlifting Competitions.
              </p>
            </div>

            <div className="achievement-card">
              <div className="achievement-card-icon">🌎</div>
              <h4 className="achievement-card-title">National Level Competitions</h4>
              <p className="achievement-card-text">
                Participated and achieved notable results in National Level Weightlifting Competitions.
              </p>
            </div>
          </div>

          <div className="mission-card">
            <h3 style={{ color: 'var(--gold)', marginBottom: '10px' }}>🎯 Our Training Mission</h3>
            <p style={{ color: '#c7d2df', lineHeight: '1.8' }}>
              We provide systematic and professional Weightlifting and Strength Training for school students from 6th Standard onwards, with special focus on developing young talent for district, state, national, and international-level competitions.
            </p>
          </div>

          <div className="vision-card">
            <h3 style={{ color: 'var(--gold)' }}>💪 Our Vision</h3>
            <ul className="vision-pill-list">
              <li className="vision-pill">Discipline</li>
              <li className="vision-pill">Training</li>
              <li className="vision-pill">Effort</li>
              <li className="vision-pill">Success</li>
            </ul>
            <p style={{ color: '#c7d2df', lineHeight: '1.8' }}>
              Our goal is to identify talented young athletes, provide them with quality coaching and scientific training, and help them progress to State, National, and International Championships.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
