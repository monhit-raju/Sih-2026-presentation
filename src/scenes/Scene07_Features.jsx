import { motion } from 'framer-motion';
import { FEATURE_GROUPS, TOTAL_FEATURES } from '../data/classificationData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

// Streams entering the central node
const STREAMS = [
  { label: 'FRP', angle: -90, color: '#ef4444', delay: 0.5 },
  { label: 'LAND COVER', angle: -30, color: '#22c55e', delay: 0.65 },
  { label: 'FACILITY DIST', angle: 30, color: '#f97316', delay: 0.8 },
  { label: 'PERSISTENCE', angle: 90, color: '#3b82f6', delay: 0.95 },
  { label: 'NIGHT RATIO', angle: 150, color: '#8b5cf6', delay: 1.1 },
  { label: 'CONFIDENCE', angle: 210, color: '#06b6d4', delay: 1.25 },
];

function toCartesian(angle, radius) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

export default function Scene07_Features({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-center">
      <div className="scene-content-full">
        <div style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center' }}>

          {/* Left: feature groups list */}
          <div style={{ flex: 1, maxWidth: 300 }}>
            <motion.div {...fadeUp(0.15)}>
              <div className="text-overline" style={{ marginBottom: 12 }}>Scene 07 · Data Extraction</div>
              <h2 className="text-title" style={{ marginBottom: 12 }}>FEATURE ENGINEERING</h2>
              <p className="text-body" style={{ marginBottom: 20 }}>
                Multi-source geospatial data is processed into a structured 65-dimensional feature vector for machine learning.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FEATURE_GROUPS.map((grp, i) => (
                <motion.div
                  key={grp.group}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  style={{ padding: '10px 14px', borderRadius: 10, border: `1px solid ${grp.color}30`, background: `${grp.color}08` }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: grp.color, marginBottom: 5 }}>
                    {grp.group}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {grp.features.map((f) => (
                      <span key={f} style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--color-white-muted)', background: 'rgba(255,255,255,0.04)', padding: '2px 7px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.06)' }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center: radial diagram */}
          <div style={{ position: 'relative', width: 260, height: 260, flexShrink: 0 }}>
            <svg width="260" height="260" style={{ position: 'absolute', inset: 0 }}>
              {STREAMS.map((s) => {
                const outer = toCartesian(s.angle, 110);
                const inner = toCartesian(s.angle, 46);
                return (
                  <motion.line
                    key={s.label}
                    x1={130 + outer.x} y1={130 + outer.y}
                    x2={130 + inner.x} y2={130 + inner.y}
                    stroke={s.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: s.delay, duration: 0.7 }}
                  />
                );
              })}
            </svg>

            {/* Stream labels */}
            {STREAMS.map((s) => {
              const pos = toCartesian(s.angle, 128);
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: s.delay + 0.3, duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    left: 130 + pos.x,
                    top: 130 + pos.y,
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.08em',
                    color: s.color,
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  {s.label}
                </motion.div>
              );
            })}

            {/* Center node */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 80, height: 80,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249,115,22,0.4), rgba(239,68,68,0.15))',
                border: '2px solid rgba(249,115,22,0.7)',
                boxShadow: '0 0 30px rgba(249,115,22,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>🔴</span>
            </motion.div>
          </div>

          {/* Right: pipeline output */}
          <div style={{ flex: 1, maxWidth: 260 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {/* Big number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.7, type: 'spring' }}
                style={{ textAlign: 'center', marginBottom: 16, padding: '24px 32px', borderRadius: 16, border: '1px solid rgba(249,115,22,0.4)', background: 'rgba(249,115,22,0.07)', boxShadow: '0 0 40px rgba(249,115,22,0.15)' }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 900, color: '#f97316', lineHeight: 1, textShadow: '0 0 30px rgba(249,115,22,0.7)' }}>
                  {TOTAL_FEATURES}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--color-white-muted)', marginTop: 8 }}>
                  ENGINEERED FEATURES
                </div>
              </motion.div>

              <div className="pipeline-line" style={{ height: 30 }} />

              <motion.div {...fadeUp(1.8)} style={{ textAlign: 'center', padding: '16px 24px', borderRadius: 12, border: '1px solid rgba(59,130,246,0.35)', background: 'rgba(59,130,246,0.07)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: '#60a5fa' }}>AI MODEL INPUT</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-white-muted)', marginTop: 4 }}>Random Forest Classifier</div>
              </motion.div>

              <motion.p className="text-body" style={{ marginTop: 20, fontSize: '0.78rem', textAlign: 'center' }} {...fadeUp(2.0)}>
                Each dimension adds interpretive signal: thermal intensity, geographic context, infrastructure proximity, and temporal behavior.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
