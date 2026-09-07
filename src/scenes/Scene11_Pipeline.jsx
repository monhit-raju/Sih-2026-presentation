import { motion } from 'framer-motion';
import { PIPELINE_STEPS } from '../data/classificationData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function Scene11_Pipeline({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-center">
      <div className="scene-content-full">
        <motion.div {...fadeUp(0.15)} style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="text-overline" style={{ marginBottom: 10 }}>Scene 11 · Complete System</div>
          <h2 className="text-title" style={{ marginBottom: 8 }}>FROM SIGNAL TO INTELLIGENCE</h2>
          <p className="text-subtitle" style={{ fontSize: '0.95rem' }}>
            The complete geospatial AI pipeline — every classification travels this path
          </p>
        </motion.div>

        {/* Horizontal pipeline */}
        <div style={{ position: 'relative', overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            minWidth: 'max-content',
            margin: '0 auto',
            padding: '0 20px',
          }}>
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                {/* Step node */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    padding: '14px 12px',
                    borderRadius: 12,
                    border: `1px solid ${step.color}35`,
                    background: `${step.color}0c`,
                    minWidth: 85,
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{step.icon}</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.08em', color: step.color, lineHeight: 1.3 }}>
                    {step.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', color: 'var(--color-white-muted)', lineHeight: 1.3 }}>
                    {step.sublabel}
                  </div>

                  {/* Animated glowing dot */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: -6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: step.color,
                      boxShadow: `0 0 8px ${step.color}`,
                    }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                  />
                </motion.div>

                {/* Connector arrow */}
                {i < PIPELINE_STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4, transformOrigin: 'left' }}
                    style={{ display: 'flex', alignItems: 'center', gap: 0, margin: '0 2px' }}
                  >
                    <div style={{ width: 20, height: 1.5, background: `linear-gradient(90deg, ${PIPELINE_STEPS[i].color}60, ${PIPELINE_STEPS[i+1].color}60)`, position: 'relative' }}>
                      {/* Moving signal particle */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'white',
                          boxShadow: '0 0 6px white',
                          transform: 'translateY(-50%)',
                        }}
                        animate={{ left: ['-10%', '110%'] }}
                        transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                    <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `6px solid ${PIPELINE_STEPS[i+1].color}60` }} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <motion.div {...fadeUp(1.6)} style={{ textAlign: 'center', marginTop: 36 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.8vw, 1.5rem)', fontStyle: 'italic', color: 'var(--color-blue-soft)', lineHeight: 1.5 }}>
            "FROM RAW THERMAL SIGNAL<br />
            TO CONTEXTUAL INTELLIGENCE"
          </p>
          <p className="text-body" style={{ marginTop: 12, fontSize: '0.82rem', maxWidth: 500, margin: '12px auto 0' }}>
            Every data point on the live dashboard has traveled through this complete pipeline —
            from satellite detection to AI-supported classification.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
