import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { SCENES } from '../../data/sceneConfig';

// ── Progress bar at top ──────────────────────────────────────────────────────
export function ProgressIndicator({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return <div className="progress-bar" style={{ width: `${pct}%` }} />;
}

// ── Top navigation bar ───────────────────────────────────────────────────────
export function TopNav({ current, total, onResearch }) {
  return (
    <div className="nav-top">
      <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 800, letterSpacing: '0.18em', color: 'var(--color-blue-bright)' }}>SIHPS</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--color-white-muted)' }}>
          AI GEOSPATIAL FIRE CLASSIFICATION
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {onResearch && (
          <button
            onClick={onResearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              color: 'var(--color-blue-glow)',
              borderRadius: 6,
              padding: '5px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.25)';
            }}
          >
            <BookOpen size={13} />
            <span>RESEARCH SOURCES</span>
          </button>
        )}

        <div className="nav-counter">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

// ── Bottom scene navigation ──────────────────────────────────────────────────
export default function SceneNavigation({ current, total, onPrev, onNext, onSelect }) {
  return (
    <div className="nav-bottom">
      {/* Prev button */}
      <motion.button
        className="nav-btn"
        onClick={onPrev}
        disabled={current === 0}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={14} />
        PREV
      </motion.button>

      {/* Scene dots */}
      <div className="nav-dots">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className={`nav-dot ${i === current ? 'active' : ''}`}
            title={`${String(i + 1).padStart(2, '0')}: ${SCENES[i]?.shortLabel || `Scene ${i + 1}`}`}
            aria-label={`Go to scene ${i + 1}`}
            onClick={() => onSelect && onSelect(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Next button */}
      <motion.button
        className="nav-btn"
        onClick={onNext}
        disabled={current === total - 1}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        NEXT
        <ChevronRight size={14} />
      </motion.button>
    </div>
  );
}
