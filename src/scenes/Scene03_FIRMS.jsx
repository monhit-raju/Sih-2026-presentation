import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

const FIRMS_FIELDS = [
  { label: 'LATITUDE', value: '37.2196° N' },
  { label: 'LONGITUDE', value: '121.9493° W' },
  { label: 'ACQ_DATE', value: '2024-03-15' },
  { label: 'ACQ_TIME', value: '0212 UTC' },
  { label: 'FRP (MW)', value: '42.8' },
  { label: 'CONFIDENCE', value: 'nominal' },
  { label: 'DAY/NIGHT', value: 'N — Night' },
  { label: 'SATELLITE', value: 'NOAA-21 (VIIRS)' },
];

const POSSIBLE_CAUSES = [
  { label: 'Wildfire', color: '#ef4444', icon: '🔥' },
  { label: 'Industrial Fire / Flare', color: '#f97316', icon: '🏭' },
  { label: 'Agricultural Burning', color: '#f59e0b', icon: '🌾' },
  { label: 'Mining Activity', color: '#a78bfa', icon: '⛏️' },
  { label: 'Unknown', color: '#6b7280', icon: '❓' },
];

export default function Scene03_FIRMS({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-right" style={{ gap: 40 }}>
      {/* Right side: FIRMS data card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 340 }}>
        <motion.div {...fadeUp(0.2)}>
          <div className="text-overline" style={{ marginBottom: 16 }}>Scene 03 · Thermal Detection</div>
        </motion.div>

        <GlassCard thermal delay={0.3} style={{ minWidth: 300 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444', animation: 'glow-pulse 1.5s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-thermal)' }}>
              FIRMS HOTSPOT DETECTION
            </span>
          </div>

          {FIRMS_FIELDS.map(({ label, value }) => (
            <div key={label} className="data-row">
              <span className="data-label">{label}</span>
              <span className="data-value">{value}</span>
            </div>
          ))}
        </GlassCard>

        {/* The problem */}
        <GlassCard delay={0.5}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--color-blue-glow)', marginBottom: 4 }}>
              RAW DETECTION
            </div>
            <div style={{ fontSize: '1.5rem', margin: '8px 0' }}>🔴</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '8px 0' }}>
              <div className="pipeline-line" style={{ height: 20, width: 2 }} />
            </div>
            <div style={{ fontSize: '1.5rem', opacity: 0.5 }}>❓</div>
            <p className="text-body" style={{ marginTop: 8, fontSize: '0.75rem' }}>
              FIRMS tells us <strong>where</strong> and <strong>when</strong>.<br />
              It does not tell us the <strong>cause</strong>.
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--color-white-muted)', marginBottom: 8 }}>
              POSSIBLE CAUSES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {POSSIBLE_CAUSES.map((c) => (
                <span key={c.label} className="tag" style={{ color: c.color, borderColor: c.color + '40', background: c.color + '10', fontSize: '0.58rem' }}>
                  {c.icon} {c.label}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Left side: explanation text */}
      <div className="scene-content" style={{ maxWidth: 380 }}>
        <motion.h2 className="text-title" style={{ marginBottom: 12 }} {...fadeUp(0.7)}>
          NASA FIRMS
        </motion.h2>
        <motion.p className="text-subtitle" style={{ marginBottom: 16, fontSize: '0.95rem' }} {...fadeUp(0.85)}>
          Fire Information for Resource Management System
        </motion.p>
        <motion.p className="text-body" {...fadeUp(1.0)}>
          NASA FIRMS aggregates near-real-time active fire detections from VIIRS (375m) sensors.
          Each hotspot record captures location, acquisition time, Fire Radiative Power (FRP), and
          detection confidence.
        </motion.p>
        <motion.p className="text-body" style={{ marginTop: 12 }} {...fadeUp(1.15)}>
          FRP — measured in megawatts — quantifies the rate of radiant energy release.
          High FRP means intense thermal activity. But intensity alone cannot differentiate
          an industrial flare from a wildfire.
        </motion.p>
        <motion.div {...fadeUp(1.3)} style={{ marginTop: 20 }}>
          <div style={{ padding: '14px 18px', borderRadius: 10, border: '1px solid rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.06)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: 'var(--color-blue-soft)', lineHeight: 1.5 }}>
              "A thermal signal without context<br />
              is just a coordinate and a number."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
