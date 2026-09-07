import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import { RESEARCH_SOURCES, ACCURACY_DISCLAIMER } from '../../data/sourceLinks';

export default function ResearchPanel({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="research-panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="research-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="research-panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <BookOpen size={16} color="var(--color-blue-bright)" />
                <span className="text-overline" style={{ fontSize: '0.75rem' }}>
                  Research &amp; Sources
                </span>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-white-muted)',
                  cursor: 'pointer',
                  padding: 4,
                  borderRadius: 6,
                  display: 'flex',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'white')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-white-muted)')}
              >
                <X size={18} />
              </button>
            </div>

            {/* Project title context */}
            <p className="text-body" style={{ marginBottom: 28, fontSize: '0.8rem' }}>
              All sources referenced in the development of the{' '}
              <span style={{ color: 'var(--color-blue-bright)' }}>
                AI-Enabled Geospatial System for Industrial Fire Classification
              </span>{' '}
              prototype pipeline.
            </p>

            {/* Source categories */}
            {RESEARCH_SOURCES.map((cat) => (
              <div key={cat.category} className="research-category">
                <div className="research-category-title">
                  <span>{cat.icon}</span>
                  {cat.category}
                </div>
                {cat.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target={item.url !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="research-item"
                    style={{ cursor: item.url === '#' ? 'default' : 'pointer' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}
                    >
                      <div>
                        <div className="research-item-label">{item.label}</div>
                        <div className="research-item-desc">{item.description}</div>
                      </div>
                      {item.url !== '#' && (
                        <ExternalLink
                          size={12}
                          style={{ color: 'var(--color-blue-glow)', flexShrink: 0, marginTop: 2 }}
                        />
                      )}
                    </div>
                    {item.url === '#' && (
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-amber)',
                          opacity: 0.7,
                          letterSpacing: '0.08em',
                        }}
                      >
                        LINK TO BE ADDED
                      </div>
                    )}
                  </a>
                ))}
              </div>
            ))}

            {/* Accuracy disclaimer */}
            <div className="disclaimer-box">
              <div
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.12em',
                  color: 'rgba(245,158,11,0.7)',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                }}
              >
                ⚠ Accuracy Note
              </div>
              <p>{ACCURACY_DISCLAIMER}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
