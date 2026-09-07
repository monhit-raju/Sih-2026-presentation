import { motion } from 'framer-motion';

// ── Glassmorphism card component ─────────────────────────────────────────────
export default function GlassCard({
  children,
  className = '',
  thermal = false,
  delay = 0,
  animate = true,
  style = {},
}) {
  const cardClass = `glass-card ${thermal ? 'glass-card-thermal' : ''} ${className}`;

  if (!animate) {
    return <div className={cardClass} style={style}>{children}</div>;
  }

  return (
    <motion.div
      className={cardClass}
      style={style}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
