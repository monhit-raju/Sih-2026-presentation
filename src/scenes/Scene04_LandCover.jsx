import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { LAND_COVER_CATEGORIES } from '../data/classificationData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

const IMPLICATIONS = [
  {
    cover: '🌲 FOREST',
    coverColor: '#22c55e',
    hotspot: '🔴',
    arrow: '→',
    result: 'WILDFIRE EVIDENCE',
    resultColor: '#ef4444',
  },
  {
    cover: '🌾 CROPLAND',
    coverColor: '#f59e0b',
    hotspot: '🔴',
    arrow: '→',
    result: 'AGRICULTURAL BURNING',
    resultColor: '#f59e0b',
  },
  {
    cover: '🏗️ BUILT-UP',
    coverColor: '#6b7280',
    hotspot: '🔴',
    arrow: '→',
    result: 'REQUIRES INDUSTRIAL CONTEXT',
    resultColor: '#f97316',
  },
];

export default function Scene04_LandCover({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-left">
      <div className="scene-content-wide" style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        {/* Left */}
        <div style={{ flex: 1, maxWidth: 420 }}>
          <motion.div {...fadeUp(0.15)}>
            <div className="text-overline" style={{ marginBottom: 12 }}>Scene 04 · Geographic Context</div>
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <div className="text-overline" style={{ color: 'var(--color-white-muted)', fontSize: '0.6rem', marginBottom: 6 }}>
              CONTEXT LAYER 01
            </div>
            <h2 className="text-title" style={{ marginBottom: 12 }}>LAND COVER</h2>
          </motion.div>
          <motion.p className="text-body" style={{ marginBottom: 20 }} {...fadeUp(0.35)}>
            A thermal anomaly means something completely different depending on where it occurs.
            ESA WorldCover provides 10m resolution land surface classification, accessed via Google Earth Engine.
          </motion.p>

          {/* Source stack */}
          <motion.div {...fadeUp(0.5)} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
            {['GOOGLE EARTH ENGINE', 'ESA WORLDCOVER (10m)', 'LAND COVER CLASSIFICATION'].map((step, i) => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <div style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(59,130,246,0.25)', background: 'rgba(59,130,246,0.06)', fontFamily: 'var(--font-mono)', fontSize: '0.63rem', letterSpacing: '0.12em', color: 'var(--color-blue-soft)' }}>
                  {step}
                </div>
                {i < 2 && <div className="pipeline-line" style={{ height: 16, marginLeft: 20 }} />}
              </div>
            ))}
          </motion.div>

          {/* Implication examples */}
          <motion.div {...fadeUp(0.7)}>
            <div className="text-overline" style={{ fontSize: '0.6rem', marginBottom: 10, opacity: 0.7 }}>
              CONTEXTUAL IMPLICATION
            </div>
            {IMPLICATIONS.map((imp, i) => (
              <motion.div
                key={imp.cover}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: imp.coverColor, whiteSpace: 'nowrap' }}>{imp.cover}</span>
                <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{imp.hotspot}</span>
                <span style={{ color: 'var(--color-white-muted)', fontSize: '0.7rem' }}>{imp.arrow}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: imp.resultColor }}>{imp.result}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Land cover legend */}
        <div style={{ flex: 1, maxWidth: 320 }}>
          <motion.div {...fadeUp(0.45)}>
            <GlassCard animate={false}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--color-blue-glow)', marginBottom: 14 }}>
                ESA WORLDCOVER CLASSES
              </div>
              <div className="land-cover-grid">
                {LAND_COVER_CATEGORIES.map((cat, i) => (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                    className="land-cover-item"
                    style={{
                      borderColor: cat.color + '40',
                      background: cat.color + '0d',
                    }}
                  >
                    <div className="land-cover-dot" style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}60` }} />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.06em', color: cat.color, marginBottom: 2 }}>{cat.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: 'var(--color-white-muted)', lineHeight: 1.3 }}>{cat.implication}</div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div {...fadeUp(1.1)} style={{ marginTop: 16 }}>
            <div style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.05)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-blue-soft)', lineHeight: 1.5 }}>
                "Location transforms a coordinate into a geographic hypothesis."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
