import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] },
});

const FIRE_TYPES = [
  { label: 'WILDFIRE', color: '#ef4444', icon: '🔥' },
  { label: 'INDUSTRIAL FIRE / FLARE', color: '#f97316', icon: '🏭' },
  { label: 'AGRICULTURAL BURNING', color: '#f59e0b', icon: '🌾' },
  { label: 'MINING ACTIVITY', color: '#a78bfa', icon: '⛏️' },
];

export default function Scene01_Opening({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-left">
      <div className="scene-content">
        <motion.div {...fadeUp(0.2)}>
          <div className="text-overline" style={{ marginBottom: 16 }}>
            Scene 01 · The Question
          </div>
        </motion.div>

        <motion.h1 className="text-hero" style={{ marginBottom: 12 }} {...fadeUp(0.4)}>
          <span className="text-hero-gradient">FROM SPACE</span>
          <br />
          <span className="text-hero-gradient">TO INTELLIGENCE</span>
        </motion.h1>

        <motion.p className="text-subtitle" style={{ marginBottom: 20 }} {...fadeUp(0.6)}>
          AI-Enabled Geospatial System
          <br />
          for Industrial Fire Classification
        </motion.p>

        <motion.div {...fadeUp(0.8)} style={{ marginBottom: 32 }}>
          <GlassCard animate={false} style={{ borderLeft: '3px solid var(--color-blue-bright)' }}>
            <p className="text-question">
              "Satellites can detect heat.<br />
              But can we determine what caused it?"
            </p>
          </GlassCard>
        </motion.div>

        <motion.div {...fadeUp(1.0)}>
          <div
            className="text-overline"
            style={{ marginBottom: 12, fontSize: '0.65rem', opacity: 0.7 }}
          >
            Thermal Anomaly Types
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FIRE_TYPES.map((ft, i) => (
              <motion.div
                key={ft.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: `1px solid ${ft.color}30`,
                  background: `${ft.color}08`,
                }}
              >
                <span style={{ fontSize: '1rem' }}>{ft.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    color: ft.color,
                  }}
                >
                  {ft.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-body"
          style={{ marginTop: 24, fontSize: '0.85rem' }}
          {...fadeUp(1.9)}
        >
          Every day, Earth observation satellites detect thousands of thermal anomalies.
          The challenge is not detection — it is <em>interpretation</em>.
        </motion.p>
      </div>
    </div>
  );
}
