import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/about.css';
import '@/styles/achievement.css';
import '@/styles/contact.css';
import '@/styles/gallery.css';
import '@/styles/admin.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ISHA GYMS AND WEIGHT LIFTING | Salem Sports Academy',
  description: 'National award-winning weightlifting sports academy in Salem, Tamil Nadu. Professional Olympic weightlifting coaching for boys & girls.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
