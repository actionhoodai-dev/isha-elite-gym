import React from 'react';
import Link from 'next/link';
import AchievementList from '@/components/AchievementList';

export const metadata = {
  title: 'About Us | ISHA GYM Weightlifting Sports Academy',
  description: 'Learn about Isha Gym, Head Coach S. Shanmugam, and our youth sports training philosophy in Salem.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero / About Introduction */}
      <section className="about" id="about">
        <div className="about-container">
          <div className="about-content">
            <span className="section-tag">ISHA SPORTS ACADEMY</span>

            <h2>Building Strength.<br />Creating Champions.</h2>

            <p>
              Isha Gym Weightlifting Sports Academy provides professional{' '}
              <strong>Olympic Weightlifting coaching for boys and girls.</strong>{' '}
              We offer strength training, fitness programs, athlete development,
              and competition coaching for District, State, National, Khelo India,
              and School Games.
            </p>

            <p>
              Our training is guided by <strong>experienced coaches</strong> in a
              disciplined, supportive, and performance-focused environment—helping
              athletes build strength, confidence, and the mindset to compete at
              higher levels.
            </p>

            <h3>Train Hard. Lift Strong. Become a Champion.</h3>
          </div>

          <div className="about-img">
            <img src="/images/about.jpeg" alt="Isha Gym Training" />
          </div>
        </div>
      </section>

      {/* 6 Key Training Features */}
      <section>
        <div className="training-features">
          <div className="feature">
            <span>01</span>
            <h3>Olympic Weightlifting</h3>
          </div>

          <div className="feature">
            <span>02</span>
            <h3>Strength & Fitness Training</h3>
          </div>

          <div className="feature">
            <span>03</span>
            <h3>Athlete Development</h3>
          </div>

          <div className="feature">
            <span>04</span>
            <h3>Competition Coaching</h3>
          </div>

          <div className="feature">
            <span>05</span>
            <h3>District → State → National</h3>
          </div>

          <div className="feature">
            <span>06</span>
            <h3>Khelo India & School Games</h3>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="who">
        <h1>WHO WE ARE</h1>
        <h3>ISHA Gym Weightlifting Sports Academy</h3>
        <h2>Coaching starts at the age of 8 for school to college students</h2>
        <p>
          Isha Gym Weightlifting Sports Academy is dedicated to developing strong,
          disciplined, and confident athletes through professional Olympic Weightlifting
          and strength training. We provide quality coaching for boys and girls, focusing
          on strength development, fitness, technique, athlete development, and competition
          preparation. Our athletes are trained to compete at District, State, National,
          Khelo India, and School Games levels.
        </p>
      </section>

      {/* Head Coach Profile */}
      <section className="coach">
        <img src="/images/coaches.jpeg" alt="Coach S. Shanmugam" />
        <div className="content-ab">
          <h1>Name: <span>S. Shanmugam</span></h1>
          <h4>Weightlifter & Powerlifter</h4>
          <h3>Head Coach of Isha Gym Weightlifting Sports Academy</h3>
          <h4>Secretary, Salem District Weightlifting Association</h4>
        </div>
      </section>

      {/* Separated & Structured Achievements Section */}
      <AchievementList />
    </main>
  );
}
