import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { RULE_EXAMPLES } from '../data/classificationData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function Scene08_Rules({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-left">
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', width: '100%', maxWidth: 980 }}>

        {/* Left: explanation */}
        <div style={{ flex: 1, maxWidth: 360 }}>
          <motion.div {...fadeUp(0.15)}>
            <div className="text-overline" style={{ marginBottom: 12 }}>Scene 08 · Reasoning Layer</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--color-blue-bright)', marginBottom: 6 }}>
              FIRST: EXPLAINABLE RULES
            </div>
            <h2 className="text-title" style={{ marginBottom: 12 }}>RULE-BASED INTELLIGENCE</h2>
          </motion.div>

          <motion.p className="text-body" style={{ marginBottom: 16 }} {...fadeUp(0.3)}>
            Before the ML model runs, an explainable rule engine generates contextual classifications.
            These encode domain knowledge about fire-type behavior across geographic and temporal contexts.
          </motion.p>

          <motion.div {...fadeUp(0.45)} style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#f59e0b', marginBottom: 6 }}>⚠ IMPORTANT</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(245,158,11,0.85)', lineHeight: 1.6 }}>
              These rules are explainable contextual heuristics used to generate pseudo-labels. They are NOT scientifically proven ground-truth classifications.
            </p>
          </motion.div>

          {/* Pipeline flow */}
          <motion.div {...fadeUp(0.6)} style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start' }}>
            {[
              { label: 'FEATURE VECTOR (65)', color: '#f97316' },
              { label: 'RULE ENGINE', color: '#8b5cf6' },
              { label: 'PSEUDO-LABELS', color: '#60a5fa' },
              { label: 'MACHINE LEARNING TRAINING', color: '#22c55e' },
            ].map((step, i) => (
              <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                <div style={{ padding: '9px 16px', borderRadius: 8, border: `1px solid ${step.color}35`, background: `${step.color}08`, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: step.color }}>
                  {step.label}
                </div>
                {i < 3 && <div className="pipeline-line" style={{ height: 18, marginLeft: 20 }} />}
              </div>
            ))}
          </motion.div>

          <motion.p className="text-body" style={{ marginTop: 20, fontSize: '0.78rem', fontStyle: 'italic' }} {...fadeUp(1.1)}>
            "The rule engine labels what the ML model will learn from — making the training process weakly supervised but explainable."
          </motion.p>
        </div>

        {/* Right: rule cards */}
        <div style={{ flex: 1, maxWidth: 420 }}>
          <motion.div {...fadeUp(0.3)} style={{ marginBottom: 10 }}>
            <div className="text-overline" style={{ fontSize: '0.6rem', opacity: 0.7 }}>EXAMPLE CONTEXTUAL RULES</div>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {RULE_EXAMPLES.map((rule, i) => (
              <motion.div
                key={rule.classification}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.18, duration: 0.55 }}
                style={{ padding: '16px', borderRadius: 12, border: `1px solid ${rule.color}30`, background: `${rule.color}08` }}
              >
                {/* Condition */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--color-white-muted)', marginBottom: 10 }}>
                  IF: <span style={{ color: rule.color }}>{rule.condition}</span>
                </div>

                {/* Evidence pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                  {rule.evidence.map((ev) => (
                    <span key={ev} style={{ fontFamily: 'var(--font-body)', fontSize: '0.63rem', color: 'var(--color-white-muted)', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)' }}>
                      {ev}
                    </span>
                  ))}
                </div>

                {/* Output */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ height: 1, flex: 1, background: `${rule.color}30` }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: `${rule.color}15`, border: `1px solid ${rule.color}40` }}>
                    <span style={{ fontSize: '0.85rem' }}>{rule.icon}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: rule.color }}>
                      {rule.classification}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
