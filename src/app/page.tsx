import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, PhoneCall, Medal, Star, Users, Dumbbell, Award, Flame, Target } from 'lucide-react';
import StatCounter from '@/components/StatCounter';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="award-tag">
              🏆 National Award Winning Coach
            </span>
            <h1>
              Providing <span className="acent">Power</span><br />
              Building <span className="acent">Champions</span><br />
              Creating <span className="acent">Legends.</span>
            </h1>
            <p className="lead">
              Weightlifting coaching to international standards. Built around athletes who want to compete — not just train.
            </p>
            <div className="hero-actions">
              <Link href="/achievements" className="btn-solid">
                <Trophy size={16} /> Our Achievements
              </Link>
              <Link href="/contact" className="btn-outline">
                <PhoneCall size={16} /> Contact Coach
              </Link>
            </div>
          </div>

          <div className="hero-img">
            <img
              src="/images/hero.jpeg"
              alt="Isha Gym Hero Training"
            />
          </div>
        </div>
      </section>

      {/* Stats Highlights */}
      <section className="stats-section" id="achievement">
        <div className="stats-head">
          <span className="eyebrow">Track Record</span>
          <h2>Achievement <span className="acent">Highlights</span></h2>
        </div>

        <div className="ach-stats-grid">
          <div className="stat-card">
            <div className="icon-box">
              <Medal size={24} />
            </div>
            <StatCounter target={10} suffix="+" />
            <span className="lbl">National Level Medals</span>
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
            <StatCounter target={50} suffix="+" />
            <span className="lbl">State & National Events Won</span>
          </div>

          <div className="stat-card">
            <div className="icon-box">
              <Users size={24} />
            </div>
            <StatCounter target={500} suffix="+" />
            <span className="lbl">Students Trained</span>
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

      {/* Why Choose Us Section */}
      <section className="why-panel" id="why-choose-us">
        <div className="why-head">
          <h2>Why Choose <span className="acent">Us?</span></h2>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-icon">
                <Flame size={36} />
              </div>
              <p>
                A proven track record of producing national level champions, year after year.
              </p>
            </div>

            <div className="why-item">
              <div className="why-icon">
                <Target size={36} />
              </div>
              <p>
                Personalised training program designed by experienced, certified coaches.
              </p>
            </div>

            <div className="why-item">
              <div className="why-icon">
                <Award size={36} />
              </div>
              <p>
                Proven results — measured in medals, records, and real competition wins.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
