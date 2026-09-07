import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Satellite, Radio } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { VIIRS_SATELLITES, MODIS_NOTE } from '../data/satelliteData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

function SatCard({ sat, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.35 }}
      style={{
        position: 'absolute',
        bottom: 120,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 340,
        zIndex: 20,
      }}
    >
      <GlassCard animate={false} style={{ borderColor: sat.color + '60' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: sat.color, marginBottom: 4 }}>
              {sat.status}
            </div>
            <div className="text-title" style={{ fontSize: '1.2rem' }}>{sat.name}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-white-muted)', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            ['Sensor', sat.sensor],
            ['Agency', sat.agency],
            ['Altitude', sat.altitude],
            ['Resolution', sat.resolution],
            ['Revisit', sat.revisit],
            ['Latency', sat.dataLatency],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="data-label">{k}</div>
              <div className="data-value" style={{ fontSize: '0.78rem', marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>
        <p className="text-body" style={{ marginTop: 12, fontSize: '0.75rem' }}>{sat.description}</p>
      </GlassCard>
    </motion.div>
  );
}

export default function Scene02_Satellites({ active }) {
  const [selectedSat, setSelectedSat] = useState(null);

  if (!active) return null;

  const selected = VIIRS_SATELLITES.find((s) => s.id === selectedSat);

  return (
    <div className="scene scene-left" style={{ alignItems: 'flex-start', paddingTop: 100 }}>
      <div className="scene-content">
        <motion.div {...fadeUp(0.2)}>
          <div className="text-overline" style={{ marginBottom: 16 }}>Scene 02 · Earth Observation</div>
        </motion.div>

        <motion.h2 className="text-title" style={{ marginBottom: 8 }} {...fadeUp(0.35)}>
          THE SATELLITE CONSTELLATION
        </motion.h2>
        <motion.p className="text-subtitle" style={{ marginBottom: 28, fontSize: '1rem' }} {...fadeUp(0.5)}>
          Near-real-time VIIRS fire detection network
        </motion.p>

        {/* VIIRS satellites */}
        <motion.div {...fadeUp(0.65)} style={{ marginBottom: 16 }}>
          <div className="text-overline" style={{ fontSize: '0.6rem', marginBottom: 10, opacity: 0.7 }}>
            ACTIVE PRODUCTION PIPELINE — VIIRS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {VIIRS_SATELLITES.map((sat, i) => (
              <motion.button
                key={sat.id}
                onClick={() => setSelectedSat(sat.id === selectedSat ? null : sat.id)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: `1px solid ${selectedSat === sat.id ? sat.color : sat.color + '30'}`,
                  background: selectedSat === sat.id ? `${sat.color}15` : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s',
                  width: '100%',
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: sat.color, boxShadow: `0 0 8px ${sat.color}` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>{sat.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: sat.color, letterSpacing: '0.1em', marginTop: 2 }}>{sat.sensor} · {sat.altitude} · {sat.resolution}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(34,197,94,0.8)', letterSpacing: '0.1em' }}>
                  LIVE
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* MODIS note */}
        <motion.div {...fadeUp(1.1)}>
          <div style={{
            padding: '12px 16px',
            borderRadius: 10,
            border: `1px solid ${MODIS_NOTE.color}25`,
            background: `${MODIS_NOTE.color}06`,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: MODIS_NOTE.color, marginBottom: 4 }}>
              NASA FIRMS ECOSYSTEM — MODIS
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-white-muted)', lineHeight: 1.5 }}>
              MODIS (Terra &amp; Aqua) is part of the NASA FIRMS ecosystem. Not currently ingested by this pipeline's near-real-time production stage.
            </div>
          </div>
        </motion.div>

        <motion.p className="text-body" style={{ marginTop: 20, fontSize: '0.82rem', fontStyle: 'italic' }} {...fadeUp(1.3)}>
          Click a satellite above to view technical details.
          The 3D scene shows live orbital paths.
        </motion.p>
      </div>

      {/* Satellite detail card */}
      <AnimatePresence>
        {selected && <SatCard sat={selected} onClose={() => setSelectedSat(null)} />}
      </AnimatePresence>

      {/* Flow hint */}
      <motion.div
        {...fadeUp(1.5)}
        style={{
          position: 'absolute',
          right: 80,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {['SATELLITE', 'THERMAL OBSERVATION', 'HOTSPOT RECORD'].map((label, i) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.07)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-blue-soft)', whiteSpace: 'nowrap' }}>
              {label}
            </div>
            {i < 2 && <div className="pipeline-line" style={{ height: 20 }} />}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
