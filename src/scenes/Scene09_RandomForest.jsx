import { motion } from 'framer-motion';
import { CLASSIFICATION_RESULTS } from '../data/classificationData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

// Simple tree node visual
function TreeNode({ x, y, color, delay, size = 8 }) {
  return (
    <motion.circle
      cx={x} cy={y} r={size / 2}
      fill={color}
      fillOpacity={0.8}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
    />
  );
}

// Simplified tree structure for visualization
function DecisionTree({ x, startY, color, delay, scale = 1 }) {
  const nodes = [
    { cx: x, cy: startY },
    { cx: x - 20 * scale, cy: startY + 24 },
    { cx: x + 20 * scale, cy: startY + 24 },
    { cx: x - 30 * scale, cy: startY + 48 },
    { cx: x - 10 * scale, cy: startY + 48 },
    { cx: x + 10 * scale, cy: startY + 48 },
    { cx: x + 30 * scale, cy: startY + 48 },
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6],
  ];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke={color} strokeWidth={1} strokeOpacity={0.3}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: delay + i * 0.05, duration: 0.4 }}
        />
      ))}
      {nodes.map((n, i) => (
        <TreeNode key={i} x={n.cx} y={n.cy} color={color} delay={delay + i * 0.04} size={6} />
      ))}
    </g>
  );
}

export default function Scene09_RandomForest({ active }) {
  if (!active) return null;
  return (
    <div className="scene scene-center">
      <div className="scene-content-full">
        <div style={{ display: 'flex', gap: 48, alignItems: 'center', justifyContent: 'center' }}>

          {/* Left: explanation */}
          <div style={{ flex: 1, maxWidth: 340 }}>
            <motion.div {...fadeUp(0.15)}>
              <div className="text-overline" style={{ marginBottom: 12 }}>Scene 09 · AI Classification</div>
              <h2 className="text-title" style={{ marginBottom: 12 }}>RANDOM FOREST</h2>
              <p className="text-subtitle" style={{ fontSize: '0.95rem', marginBottom: 16 }}>
                Weakly supervised machine learning on 65 features
              </p>
            </motion.div>
            <motion.p className="text-body" style={{ marginBottom: 16 }} {...fadeUp(0.3)}>
              A Random Forest ensemble processes the 65-feature vector through hundreds of decision trees,
              each voting on the most probable fire classification.
            </motion.p>
            <motion.div {...fadeUp(0.45)} style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)', marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#f59e0b', marginBottom: 5 }}>
                WEAKLY SUPERVISED / PSEUDO-LABELED ML
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.73rem', color: 'rgba(245,158,11,0.85)', lineHeight: 1.6 }}>
                Trained on rule-generated pseudo-labels. Validation metrics reflect pseudo-label agreement — not independently validated ground-truth accuracy.
              </p>
            </motion.div>

            {/* Input → RF → Output pipeline */}
            <motion.div {...fadeUp(0.6)} style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start' }}>
              {[
                { label: '65 FEATURES', color: '#f97316', desc: 'Multi-source feature vector' },
                { label: 'RANDOM FOREST', color: '#22c55e', desc: 'Ensemble of decision trees' },
                { label: 'MAJORITY VOTE', color: '#3b82f6', desc: 'Tree consensus' },
                { label: 'CLASSIFICATION', color: '#ef4444', desc: 'Final fire type output' },
              ].map((s, i) => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                  <div style={{ padding: '8px 14px', borderRadius: 8, border: `1px solid ${s.color}35`, background: `${s.color}08`, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: s.color }}>
                    {s.label}
                    <span style={{ color: 'var(--color-white-muted)', fontSize: '0.58rem', letterSpacing: '0.05em', marginLeft: 8 }}>· {s.desc}</span>
                  </div>
                  {i < 3 && <div className="pipeline-line" style={{ height: 16, marginLeft: 20 }} />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Center: forest visualization */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width={280} height={200} style={{ overflow: 'visible' }}>
              <DecisionTree x={60}  startY={20} color="#22c55e" delay={0.5} scale={0.85} />
              <DecisionTree x={140} startY={20} color="#3b82f6" delay={0.7} scale={0.85} />
              <DecisionTree x={220} startY={20} color="#22c55e" delay={0.9} scale={0.85} />

              {/* Convergence lines to output */}
              {[60, 140, 220].map((x, i) => (
                <motion.line key={x}
                  x1={x} y1={88} x2={140} y2={140}
                  stroke="#f97316" strokeWidth={1.5} strokeOpacity={0.4}
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.3 + i * 0.1, duration: 0.6 }}
                />
              ))}

              {/* Output node */}
              <motion.circle cx={140} cy={155} r={18}
                fill="rgba(249,115,22,0.25)"
                stroke="#f97316" strokeWidth={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5, type: 'spring' }}
              />
              <motion.text x={140} y={159} textAnchor="middle"
                fill="#f97316" fontSize={12} fontFamily="Space Mono"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.4 }}
              >🎯</motion.text>
            </svg>
          </div>

          {/* Right: classification outputs */}
          <div style={{ flex: 1, maxWidth: 280 }}>
            <motion.div {...fadeUp(0.4)} style={{ marginBottom: 12 }}>
              <div className="text-overline" style={{ fontSize: '0.6rem', opacity: 0.7, marginBottom: 10 }}>CLASSIFICATION OUTPUTS</div>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CLASSIFICATION_RESULTS.map((cls, i) => (
                <motion.div
                  key={cls.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: `1px solid ${cls.color}30`, background: `${cls.color}09` }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{cls.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600, color: cls.color }}>{cls.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--color-white-muted)', marginTop: 2, lineHeight: 1.4 }}>{cls.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
