'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Award } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide main navbar on /admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="main-nav">
          <Link href="/" className="brand" onClick={closeNav}>
            <div className="logo-badge">
              <img
                src="/images/logo.jpeg"
                alt="Isha Gym Logo"
              />
            </div>
            <div className="brand-text">
              <h1>ISHA GYM</h1>
              <p className="tagline">WEIGHTLIFTING SPORTS ACADEMY</p>
              <p className="location">SALEM</p>
            </div>
          </Link>

          <nav className={`links ${isOpen ? 'open' : ''}`} id="navLinks">
            <Link
              href="/"
              className={pathname === '/' ? 'active' : ''}
              onClick={closeNav}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className={pathname === '/about' ? 'active' : ''}
              onClick={closeNav}
            >
              ABOUT US
            </Link>
            <Link
              href="/achievements"
              className={pathname === '/achievements' ? 'active' : ''}
              onClick={closeNav}
            >
              ACHIEVEMENTS
            </Link>
            <Link
              href="/gallery"
              className={pathname === '/gallery' ? 'active' : ''}
              onClick={closeNav}
            >
              GALLERY
            </Link>
            <Link
              href="/contact"
              className={pathname === '/contact' ? 'active' : ''}
              onClick={closeNav}
            >
              CONTACT US
            </Link>
          </nav>

          <Link href="/contact" className="join-btn">
            JOIN NOW
          </Link>

          <button
            className={`hamburger ${isOpen ? 'open' : ''}`}
            onClick={toggleNav}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
}
