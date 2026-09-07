import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { TEMPORAL_EXAMPLE } from '../data/classificationData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

const MAX_FRP = 60;

export default function Scene06_Temporal({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-left">
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', width: '100%', maxWidth: 980 }}>
        {/* Left: explanation */}
        <div style={{ flex: 1, maxWidth: 360 }}>
          <motion.div {...fadeUp(0.15)}>
            <div className="text-overline" style={{ marginBottom: 12 }}>Scene 06 · Time Dimension</div>
            <h2 className="text-title" style={{ marginBottom: 12 }}>TEMPORAL ANALYSIS</h2>
          </motion.div>
          <motion.p className="text-body" style={{ marginBottom: 20 }} {...fadeUp(0.3)}>
            A single thermal detection and a persistent multi-day thermal signature carry fundamentally
            different scientific meanings. Temporal behavior is one of the strongest discriminating signals.
          </motion.p>

          {/* Key metrics */}
          <motion.div {...fadeUp(0.45)} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {[
              { label: 'PERSISTENCE', desc: 'Total unique detection days', color: '#f97316' },
              { label: 'CONSECUTIVE ACTIVE DAYS', desc: 'Longest unbroken detection streak', color: '#ef4444' },
              { label: 'TOTAL DETECTIONS', desc: 'All satellite overpass records', color: '#3b82f6' },
              { label: 'NIGHT RATIO', desc: 'Fraction of detections at night (DAY/NIGHT = N)', color: '#8b5cf6' },
              { label: 'MAX FRP', desc: 'Peak fire radiative power (MW)', color: '#f59e0b' },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.45 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 12px', borderRadius: 8, border: `1px solid ${m.color}25`, background: `${m.color}07` }}
              >
                <div style={{ width: 3, height: '100%', minHeight: 32, background: m.color, borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: m.color, marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-white-muted)' }}>{m.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Transient vs persistent comparison */}
          <motion.div {...fadeUp(1.15)}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ padding: '12px', borderRadius: 10, border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>⚡</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: '#60a5fa', marginBottom: 4 }}>TRANSIENT</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-white-muted)', lineHeight: 1.4 }}>Short-lived · 1–2 days · Often wildfire or agricultural</div>
              </div>
              <div style={{ padding: '12px', borderRadius: 10, border: '1px solid rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>🏭</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: '#f97316', marginBottom: 4 }}>PERSISTENT</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-white-muted)', lineHeight: 1.4 }}>Multi-day · Recurring · Industrial flare signature</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: timeline visualization */}
        <div style={{ flex: 1, maxWidth: 380 }}>
          <motion.div {...fadeUp(0.5)}>
            <GlassCard animate={false} thermal>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--color-thermal)', marginBottom: 16 }}>
                TEMPORAL DETECTION RECORD — EXAMPLE
              </div>

              {/* Column headers */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-white-muted)', width: 40 }}>DAY</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-white-muted)', width: 28 }}>DET</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-white-muted)', flex: 1 }}>FRP (MW)</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-white-muted)', width: 52, textAlign: 'right' }}>NIGHT</span>
              </div>

              {TEMPORAL_EXAMPLE.map((row, i) => (
                <motion.div
                  key={row.day}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.4 }}
                  className="temporal-row"
                >
                  <span className="temporal-day">DAY {row.day}</span>
                  <div className="temporal-dot" style={{ background: row.detected ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${row.detected ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}>
                    {row.detected ? '🔥' : '—'}
                  </div>
                  <div className="temporal-bar">
                    <motion.div
                      className="temporal-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: row.detected ? `${(row.frp / MAX_FRP) * 100}%` : '0%' }}
                      transition={{ delay: 0.9 + i * 0.12, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="temporal-meta">
                    {row.detected ? (
                      <>{row.frp} MW{row.night && <span style={{ color: '#8b5cf6', marginLeft: 4 }}>🌙</span>}</>
                    ) : '—'}
                  </span>
                </motion.div>
              ))}

              {/* Summary stats */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 14, paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'PERSISTENCE', value: '6 days' },
                  { label: 'CONSECUTIVE', value: '5 days' },
                  { label: 'NIGHT RATIO', value: '85.7%' },
                  { label: 'MAX FRP', value: '51.3 MW' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ textAlign: 'center', padding: '8px', borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--color-white-muted)', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-thermal)' }}>{value}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
