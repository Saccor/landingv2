"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';


const AppSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // set on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

const containerStyle = {
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row' as 'column' | 'row',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: isMobile ? '2rem 2rem' : '2rem 1rem', // more edge space on mobile
};

const imageContainerStyle: React.CSSProperties = {
  flex: isMobile ? 'unset' : 0.9, // reduced from 1
  padding: isMobile ? '1rem' : '1rem 0 1rem 1rem',
  textAlign: isMobile ? 'center' : 'left',
};
const textContainerStyle = {
  flex: isMobile ? 'unset' : 2.4, // increased from 2
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '2.5rem',
  padding: '1.5rem',
};

const boxStyle = {
  flex: 1.2,
  backgroundColor: '#212121',
  padding: '2rem', // more horizontal padding
  color: '#fff',
  fontFamily: 'Inter, sans-serif',
  marginBottom: isMobile ? '1rem' : '0',
};



  return (
    <section style={containerStyle}>
      {/* Image container */}
      <div style={imageContainerStyle}>
        <Image
  src="/phone.png"
  alt="App preview"
  width={236} // width in pixels
  height={400} // estimated height to preserve aspect ratio
  style={{
    width: '100%',
    height: 'auto',
    maxWidth: isMobile ? '150px' : '236.86px',
    objectFit: 'contain',
    margin: isMobile ? '0 auto' : '0',
  }}
  priority // Optional: for better LCP
/>
      </div>

      {/* Text container */}
      <div style={textContainerStyle}>
        {/* Top Text */}
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#ffffff', fontWeight: 600,  }}>
            Smarter Control — Powered by AI and the Arfive App
          </h2>
          <p style={{ color: '#cccccc', marginTop: '0.5rem', fontSize: '1.1rem' }}>
            Behind every sound is a system that adapts in real time. <br />
            The Arfive App and on-device AI learn from you — and put you in control.
          </p>
        </div>

        {/* Bottom Boxes */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
        }}>
          {/* Box 1 */}
          <div style={boxStyle}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              AI That Moves With You
            </h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', margin: 0, lineHeight: '1.7', fontSize: '0.9rem' }}>
              <li>Real-time translation.</li>
              <li>Voice memos with xNotes.</li>
              <li>Gesture and voice commands — no taps needed.</li>
              <li>AI adapts noise control based on your environment.</li>
            </ul>
          </div>

          {/* Box 2 */}
          <div style={boxStyle}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              Your Sound, Your Rules
            </h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', margin: 0, lineHeight: '1.7', fontSize: '0.9rem' }}>
              <li>Bluetooth 5.4 + LE Audio</li>
              <li>Stay connected up to two devices at once</li>
              <li>Auracast ready: share audio with multiple listeners at once</li>
              <li>Voice assistant ready: Siri, Alexa and Google assistant</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
