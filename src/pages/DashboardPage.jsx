import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Activity, 
  Satellite, 
  Flame, 
  Layers, 
  ShieldAlert, 
  Radio, 
  Server,
  ExternalLink
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { PROJECT_STATS, CLASSIFICATION_RESULTS } from '../data/classificationData';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 0%, #0c1a36 0%, #020817 100%)',
        color: '#f8fafc',
        padding: '32px 24px',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1300,
          margin: '0 auto',
          width: '100%',
          paddingBottom: 24,
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#93c5fd',
              borderRadius: 8,
              padding: '8px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <ArrowLeft size={16} />
            RETURN TO STORYTELLING TOUR
          </button>

          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.05em' }}>
              OPERATIONAL GEOSPATIAL MONITOR
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#60a5fa', letterSpacing: '0.12em' }}>
              VIIRS THERMAL ANOMALY CLASSIFICATION PIPELINE
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: 20,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#4ade80',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
            PIPELINE READY
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          maxWidth: 1300,
          margin: '32px auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          flex: 1,
        }}
      >
        {/* Notice Banner */}
        <div
          style={{
            padding: '20px 24px',
            borderRadius: 12,
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(30, 64, 175, 0.05))',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <Radio size={22} color="#60a5fa" style={{ marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#bfdbfe', marginBottom: 4 }}>
                Operational Dashboard Portal
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                This is the transition landing page connecting the presentation experience to your live GIS monitoring environment.
                You can hook your production dashboard iframe or component right here.
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          <GlassCard style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <Layers size={16} color="#60a5fa" />
              TOTAL OBSERVATIONS
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: 8, color: '#f8fafc', fontFamily: 'var(--font-display)' }}>
              {PROJECT_STATS.totalObservations}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 4 }}>
              Processed across North America
            </div>
          </GlassCard>

          <GlassCard style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <Satellite size={16} color="#38bdf8" />
              ACTIVE CONSTELLATIONS
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: 8, color: '#f8fafc', fontFamily: 'var(--font-display)' }}>
              3 SATELLITES
            </div>
            <div style={{ fontSize: '0.7rem', color: '#38bdf8', marginTop: 4 }}>
              NOAA-21 · NOAA-20 · Suomi-NPP
            </div>
          </GlassCard>

          <GlassCard style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <Flame size={16} color="#ef4444" />
              WILDFIRE DETECTIONS
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: 8, color: '#f8fafc', fontFamily: 'var(--font-display)' }}>
              {(CLASSIFICATION_RESULTS.find((r) => r.label === 'Wildfire')?.count || 27480).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#f87171', marginTop: 4 }}>
              63.4% of classified events
            </div>
          </GlassCard>

          <GlassCard style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <Server size={16} color="#f97316" />
              CONFIRMED INDUSTRIAL
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: 8, color: '#f8fafc', fontFamily: 'var(--font-display)' }}>
              {(CLASSIFICATION_RESULTS.find((r) => r.label === 'Industrial')?.count || 97).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#fb923c', marginTop: 4 }}>
              High persistence &amp; proximity index
            </div>
          </GlassCard>
        </div>

        {/* Mock GIS Map Placeholder View */}
        <div
          style={{
            flex: 1,
            minHeight: 400,
            borderRadius: 14,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'radial-gradient(circle at 60% 40%, rgba(15, 30, 60, 0.7), rgba(2, 8, 23, 0.95))',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 32,
            boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Subtle Grid overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: 540, zIndex: 2 }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#60a5fa',
              }}
            >
              <Activity size={32} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 12 }}>
              GIS Operational Monitoring View
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 24 }}>
              This route is reserved for your live interactive GIS dashboard.
              When ready, deploy your Mapbox, Leaflet, or Google Earth Engine viewer here.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
              <button
                onClick={() => navigate('/')}
                className="btn-primary"
                style={{ padding: '10px 22px', fontSize: '0.85rem' }}
              >
                ← Return to Presentation
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '0.72rem',
          color: '#64748b',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <div>SIHPS GEOSPATIAL INTELLIGENCE RESEARCH</div>
        <div>PROTOTYPE ENVIRONMENT</div>
      </footer>
    </div>
  );
}
