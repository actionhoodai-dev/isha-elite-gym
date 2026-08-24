import React from 'react';
import { Phone, Mail, MapPin, PhoneCall } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | ISHA GYM Weightlifting Sports Academy',
  description: 'Get in touch with Coach S. Shanmugam at Isha Gym Salem. Inquire about youth and Olympic weightlifting training.',
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="page-hero">
        <div className="inner">
          <span className="eyebrow">Let's Talk</span>
          <h1>Get In <span className="acent">Touch</span></h1>
          <p className="sub">Start Your Journey To The Next Level.</p>
        </div>
      </section>

      <div className="contact-layout-grid">
        {/* Contact Info & Timings */}
        <div className="info-list">
          <div className="info-card">
            <div className="icon-box">
              <Phone size={22} />
            </div>
            <div>
              <span className="k">Phone</span>
              <span className="v">
                <a href="tel:+919944301212" style={{ color: '#ffffff' }}>+91 9944301212</a>
                <small>Mon – Sat, 6 AM – 8 PM</small>
              </span>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <Mail size={22} />
            </div>
            <div>
              <span className="k">Email</span>
              <span className="v">
                <a href="mailto:shanmugam01212@gmail.com" style={{ color: '#ffffff' }}>shanmugam01212@gmail.com</a>
                <small>We reply within 24 hours</small>
              </span>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <MapPin size={22} />
            </div>
            <div>
              <span className="k">Location</span>
              <span className="v">
                ISHA GYM Weightlifting Sports Academy
                <small>Salem, Tamil Nadu, India</small>
              </span>
            </div>
          </div>

          <div className="hours-card">
            <h4>Training Hours</h4>
            <div className="hours-row">
              <span>Monday – Saturday (Morning)</span>
              <span>5:00 AM – 10:00 AM</span>
            </div>
            <div className="hours-row">
              <span>Monday – Saturday (Evening)</span>
              <span>5:00 PM – 10:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Sunday</span>
              <span>5:00 AM – 10:00 AM</span>
            </div>
          </div>
        </div>

        {/* Live Contact Form */}
        <div>
          <ContactForm />
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.9051396433265!2d78.13892857481835!3d11.630109488575373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babefd6fceb62a3%3A0xf3581da1e2038658!2sISHA%20GYM%20Weightlifting%20sports%20academy!5e0!3m2!1sen!2sin!4v1786730829320!5m2!1sen!2sin"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Isha Gym Location Map"
        ></iframe>
      </div>

      {/* Final Call To Action */}
      <section className="contact-final">
        <span className="eyebrow" style={{ color: 'var(--gold)' }}>Ready When You Are</span>
        <h2>Ready To Train Like A Champion?</h2>
        <a href="tel:+919944301212" className="btn-solid">
          <PhoneCall size={18} /> Contact Coach Directly (+91 9944301212)
        </a>
      </section>
    </main>
  );
}
