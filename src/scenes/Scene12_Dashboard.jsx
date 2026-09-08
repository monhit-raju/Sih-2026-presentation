import { motion } from 'framer-motion';
import { Globe, Activity, Map } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] },
});

const DASHBOARD_FEATURES = [
  { icon: <Globe size={16} />, label: 'Global thermal hotspot map' },
  { icon: <Activity size={16} />, label: 'Near-real-time FIRMS ingestion' },
  { icon: <Map size={16} />, label: 'Classified fire events with context' },
];

export default function Scene12_Dashboard({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-center">
      <div style={{ textAlign: 'center', maxWidth: 640 }}>
        <motion.div {...fadeUp(0.15)}>
          <div className="text-overline" style={{ marginBottom: 16 }}>Scene 12 · Operational System</div>
        </motion.div>

        <motion.h2
          className="text-hero"
          style={{ marginBottom: 12, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          {...fadeUp(0.3)}
        >
          <span className="text-hero-gradient">NOW LET'S SEE IT</span>
          <br />
          <span className="text-hero-gradient">IN ACTION</span>
        </motion.h2>

        <motion.p className="text-subtitle" style={{ marginBottom: 24, fontSize: '1rem' }} {...fadeUp(0.45)}>
          The complete pipeline powers a live GIS dashboard
        </motion.p>

        <motion.p className="text-body" style={{ marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }} {...fadeUp(0.6)}>
          Every data point on the live dashboard has traveled through the complete pipeline you just witnessed —
          from satellite detection in near-real-time, through geospatial context enrichment,
          to AI-supported fire classification.
        </motion.p>

        {/* Dashboard feature list */}
        <motion.div {...fadeUp(0.75)} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 380, margin: '0 auto 40px', textAlign: 'left' }}>
          {DASHBOARD_FEATURES.map((f) => (
            <div
              key={f.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 16px',
                borderRadius: 10,
                border: '1px solid rgba(59,130,246,0.2)',
                background: 'rgba(59,130,246,0.06)',
              }}
            >
              <span style={{ color: 'var(--color-blue-bright)' }}>{f.icon}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-white-muted)' }}>{f.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Earth visualization area */}
        <motion.div
          {...fadeUp(0.9)}
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            margin: '0 auto 40px',
            background: 'radial-gradient(circle at 35% 35%, #1e40af, #020817)',
            border: '2px solid rgba(59,130,246,0.3)',
            boxShadow: '0 0 60px rgba(59,130,246,0.25), inset 0 0 40px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: '4rem' }}
          >
            🌍
          </motion.div>
          {/* Orbiting dot */}
          <motion.div
            style={{
              position: 'absolute',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#60a5fa',
              boxShadow: '0 0 10px #60a5fa',
              top: 10,
              left: '50%',
              transformOrigin: '0px 90px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
