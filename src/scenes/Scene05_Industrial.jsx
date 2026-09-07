import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

const FACILITY_TYPES = [
  { icon: '⚡', label: 'Power Plant', db: 'WRI Global Power Plant DB', color: '#f97316' },
  { icon: '🛢️', label: 'Storage Tank / Refinery', db: 'OpenStreetMap / Overpass', color: '#fb923c' },
  { icon: '🏗️', label: 'Industrial Building', db: 'OpenStreetMap / Overpass', color: '#fdba74' },
  { icon: '🔩', label: 'Processing Facility', db: 'OpenStreetMap / Overpass', color: '#fed7aa' },
];

export default function Scene05_Industrial({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-right">
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', width: '100%', maxWidth: 1000, justifyContent: 'flex-end' }}>

        {/* Left: Proximity visualization */}
        <div style={{ flex: 1, maxWidth: 360 }}>
          <motion.div {...fadeUp(0.6)}>
            <GlassCard animate={false} thermal>
              {/* Hotspot → facility diagram */}
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: 'rgba(239,68,68,0.2)', border: '2px solid rgba(239,68,68,0.6)', fontSize: '1.2rem', boxShadow: '0 0 16px rgba(239,68,68,0.4)', animation: 'glow-pulse 2s infinite' }}>
                  🔴
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#ef4444', marginTop: 6 }}>THERMAL HOTSPOT</div>

                {/* Distance line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '12px 0', gap: 0 }}>
                  <div style={{ width: 2, height: 20, background: 'linear-gradient(to bottom, #ef4444, #f97316)' }} />
                  <div style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#f97316', letterSpacing: '0.1em' }}>
                    198 m
                  </div>
                  <div style={{ width: 2, height: 20, background: 'linear-gradient(to bottom, #f97316, #3b82f6)' }} />
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: 'rgba(59,130,246,0.2)', border: '2px solid rgba(59,130,246,0.5)', fontSize: '1.2rem', boxShadow: '0 0 16px rgba(59,130,246,0.3)' }}>
                  🏭
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#60a5fa', marginTop: 6 }}>INDUSTRIAL FACILITY</div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 16, paddingTop: 16 }}>
                {[
                  ['Facility Type', 'Industrial Processing'],
                  ['Distance', '~198 m'],
                  ['Facility Count (1km)', '3'],
                  ['Power Capacity', 'N/A (OSM)'],
                ].map(([k, v]) => (
                  <div key={k} className="data-row">
                    <span className="data-label">{k}</span>
                    <span className="data-value">{v}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div {...fadeUp(0.85)} style={{ marginTop: 14 }}>
            <div style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.05)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(245,158,11,0.85)', lineHeight: 1.6 }}>
                ⚠ Proximity is evidence, not proof. Spatial closeness to a facility raises the probability of industrial origin — it does not confirm it.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Explanation */}
        <div style={{ flex: 1, maxWidth: 400 }}>
          <motion.div {...fadeUp(0.15)}>
            <div className="text-overline" style={{ marginBottom: 12 }}>Scene 05 · Infrastructure</div>
            <div className="text-overline" style={{ color: 'var(--color-white-muted)', fontSize: '0.6rem', marginBottom: 6 }}>
              CONTEXT LAYER 02
            </div>
            <h2 className="text-title" style={{ marginBottom: 12 }}>INDUSTRIAL INFRASTRUCTURE</h2>
          </motion.div>

          <motion.p className="text-body" style={{ marginBottom: 20 }} {...fadeUp(0.3)}>
            We compare the exact coordinates of each thermal hotspot against known industrial infrastructure.
            Two global databases provide this coverage:
          </motion.p>

          {/* Database sources */}
          <motion.div {...fadeUp(0.45)} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            <div style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.06)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#f97316', marginBottom: 4 }}>PRIMARY</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem' }}>WRI Global Power Plant Database</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-white-muted)', marginTop: 4 }}>Open-source global power generation facilities</div>
            </div>
            <div style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(59,130,246,0.25)', background: 'rgba(59,130,246,0.05)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#60a5fa', marginBottom: 4 }}>SECONDARY</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem' }}>OpenStreetMap / Overpass API</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-white-muted)', marginTop: 4 }}>Industrial zones, refineries, storage infrastructure</div>
            </div>
          </motion.div>

          {/* Facility types */}
          <motion.div {...fadeUp(0.6)}>
            <div className="text-overline" style={{ fontSize: '0.6rem', marginBottom: 10, opacity: 0.7 }}>MONITORED FACILITY TYPES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {FACILITY_TYPES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.45 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, border: `1px solid ${f.color}25`, background: `${f.color}07` }}
                >
                  <span style={{ fontSize: '1rem' }}>{f.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 500, color: f.color }}>{f.label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'var(--color-white-muted)' }}>{f.db}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(1.1)} style={{ marginTop: 20 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: 'var(--color-blue-soft)', lineHeight: 1.5 }}>
              "Spatial proximity becomes evidence.<br />
              Not certainty — evidence."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
