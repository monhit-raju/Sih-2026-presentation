import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { PROJECT_STATS, CLASSIFICATION_RESULTS, INDUSTRIAL_EXAMPLE } from '../data/classificationData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

const TOTAL = PROJECT_STATS.totalObservations;

export default function Scene10_Results({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-center">
      <div className="scene-content-full">

        {/* Header */}
        <motion.div {...fadeUp(0.15)} style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="text-overline" style={{ marginBottom: 10 }}>Scene 10 · Project Output</div>
          <h2 className="text-title" style={{ marginBottom: 8 }}>PROJECT RESULTS</h2>
          <p className="text-body" style={{ fontSize: '0.82rem', maxWidth: 520, margin: '0 auto' }}>
            {PROJECT_STATS.datasetNote}
          </p>
        </motion.div>

        {/* Total observations hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--color-blue-glow)', marginBottom: 8 }}>
            TOTAL THERMAL OBSERVATIONS PROCESSED
          </div>
          <AnimatedCounter
            target={TOTAL}
            suffix="+"
            duration={2500}
            active={true}
            className=""
            style={{ fontSize: '5rem', fontWeight: 900, color: '#f97316', textShadow: '0 0 40px rgba(249,115,22,0.5)' }}
          />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 900, color: '#f97316', textShadow: '0 0 40px rgba(249,115,22,0.5)', lineHeight: 1 }}>
            43,346+
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--color-white-muted)', marginTop: 6 }}>
            THERMAL OBSERVATIONS
          </div>
        </motion.div>

        {/* Classification breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
          {CLASSIFICATION_RESULTS.map((cls, i) => (
            <motion.div
              key={cls.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.55 }}
              style={{ padding: '20px 16px', borderRadius: 14, border: `1px solid ${cls.color}35`, background: `${cls.color}0a`, textAlign: 'center' }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{cls.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: cls.color, lineHeight: 1, marginBottom: 6 }}>
                {cls.count.toLocaleString()}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: cls.color, marginBottom: 4 }}>
                {cls.label.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--color-white-muted)', lineHeight: 1.4 }}>
                {((cls.count / TOTAL) * 100).toFixed(1)}% of total
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industrial example */}
        <motion.div {...fadeUp(1.1)}>
          <GlassCard animate={false} thermal style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#f97316', marginBottom: 14 }}>
              🏭 EXAMPLE: INDUSTRIAL FIRE / FLARE CLASSIFICATION
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {[
                { label: 'DISTANCE', value: '~198 m', sub: 'to nearest facility' },
                { label: 'PERSISTENCE', value: '5 days', sub: 'consecutive detections' },
                { label: 'NIGHT RATIO', value: '82%', sub: 'of detections at night' },
                { label: 'ML CONFIDENCE', value: 'HIGH', sub: 'classification confidence' },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ textAlign: 'center', padding: '12px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--color-white-muted)', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#f97316', marginBottom: 4 }}>{value}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--color-white-muted)', lineHeight: 1.3 }}>{sub}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
