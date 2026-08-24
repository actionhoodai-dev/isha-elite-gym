'use client';

import React from 'react';
import { Award, Trophy, Medal, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ACHIEVEMENTS_DATA = [
  {
    icon: Trophy,
    title: 'School Games Federation of India (SGFI)',
    description: 'Our athletes have achieved remarkable success at the National Level in Inter-School Weightlifting Competitions.',
    badge: 'National Level'
  },
  {
    icon: Medal,
    title: "Tamil Nadu Chief Minister's Trophy",
    description: 'Our athletes have secured outstanding achievements at Zonal, District, and State Levels in competitions conducted under SDAT.',
    badge: 'State Level'
  },
  {
    icon: Award,
    title: 'Tamil Nadu State Championships',
    description: 'We have achieved outstanding podium results in Tamil Nadu State-level Weightlifting Championships.',
    badge: 'Championship'
  },
  {
    icon: Star,
    title: 'Salem District Dominance',
    description: 'For several consecutive years, our athletes have continued to represent and achieve success for Salem District.',
    badge: 'District Record'
  },
  {
    icon: ShieldCheck,
    title: 'Youth & Senior Athlete Pathways',
    description: 'We provide professional weightlifting and strength training from school level to senior athlete level, helping young talents build a strong competitive career.',
    badge: 'Career Training'
  }
];

export default function AchievementList() {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #07162b 0%, #040810 100%)',
      padding: '80px 24px',
      borderTop: '1px solid #1a2a40'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 50px' }}>
          <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
            OUR ACHIEVEMENTS
          </span>
          <h2 style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            color: '#ffffff',
            marginTop: '8px',
            marginBottom: '16px'
          }}>
            Excellence in Youth Welfare & <span style={{ color: 'var(--gold)' }}>Sports Development</span>
          </h2>
          <p style={{ color: '#c7d2df', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Isha Weightlifting Training Centre has been providing dedicated training and opportunities for young athletes, helping them achieve success at District, State, National, and International levels.
          </p>
        </div>

        {/* Achievement Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {ACHIEVEMENTS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  background: '#0a1728',
                  border: '1px solid #1e3350',
                  borderRadius: '12px',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#1e3350';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      background: 'rgba(234, 181, 44, 0.15)',
                      color: 'var(--gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} />
                    </div>
                    <span style={{
                      background: 'rgba(234, 181, 44, 0.1)',
                      border: '1px solid rgba(234, 181, 44, 0.3)',
                      color: 'var(--gold)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase'
                    }}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 style={{
                    color: '#ffffff',
                    fontFamily: 'Oswald, sans-serif',
                    fontSize: '1.25rem',
                    marginBottom: '10px',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    color: '#a7afc0',
                    fontSize: '0.92rem',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    {item.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--gold)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '12px'
                }}>
                  <CheckCircle2 size={14} /> Verified Track Record
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Card */}
        <div style={{
          marginTop: '40px',
          background: 'linear-gradient(135deg, #0d1e34 0%, #081220 100%)',
          border: '1px solid rgba(234, 181, 44, 0.3)',
          borderRadius: '12px',
          padding: '36px 30px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '1.6rem',
            color: 'var(--gold)',
            marginBottom: '10px'
          }}>
            Building Champions Through Training & Dedication
          </h3>
          <p style={{
            color: '#c7d2df',
            maxWidth: '850px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontSize: '1rem'
          }}>
            From young beginners to competitive athletes, we focus on strength, technique, discipline, and consistent performance. Our goal is to identify talent, develop athletes, and guide them towards the highest levels of national & international competition.
          </p>
        </div>
      </div>
    </section>
  );
}
