// Classification results and project metrics
export const PROJECT_STATS = {
  totalObservations: 43346,
  datasetNote: 'Current prototype dataset — rule/ML classification pipeline',
};

export const CLASSIFICATION_RESULTS = [
  {
    label: 'Wildfire',
    count: 27480,
    color: '#ef4444',
    icon: '🔥',
    description: 'Detected in forested and vegetated areas with high FRP and transient-to-persistent behavior',
  },
  {
    label: 'Unknown',
    count: 14443,
    color: '#6b7280',
    icon: '❓',
    description: 'Insufficient contextual evidence for confident classification — requires additional data',
  },
  {
    label: 'Agricultural',
    count: 1326,
    color: '#f59e0b',
    icon: '🌾',
    description: 'Detected in cropland areas with short persistence and seasonal patterns',
  },
  {
    label: 'Industrial',
    count: 97,
    color: '#f97316',
    icon: '🏭',
    description: 'Detected near industrial infrastructure with persistent night-time thermal activity',
  },
];

export const INDUSTRIAL_EXAMPLE = {
  lat: 37.2196,
  lon: -121.9493,
  date: '2024-03-15',
  time: '0212',
  frp: 42.8,
  confidence: 'nominal',
  dayNight: 'N',
  facilityType: 'Industrial Facility',
  facilityDistance: 198,
  facilityDistanceUnit: 'm',
  persistence: 'Multi-day (5 consecutive detections)',
  nightRatio: 0.82,
  mlConfidence: 'HIGH',
  classification: 'INDUSTRIAL FIRE / FLARE',
  features: {
    landCover: 'Built-up / Industrial Area',
    nearestFacility: 'Industrial Processing Facility',
    distanceToFacility: '198 m',
    persistenceDays: 5,
    consecutiveDays: 4,
    totalDetections: 7,
    nightDetections: 6,
    maxFRP: 58.3,
    avgFRP: 41.2,
  },
};

export const FEATURE_GROUPS = [
  {
    group: 'Thermal Signal',
    color: '#ef4444',
    features: ['FRP', 'Confidence', 'Day/Night Flag', 'Satellite Source', 'Scan/Track Angles'],
  },
  {
    group: 'Land Cover',
    color: '#22c55e',
    features: ['Primary Land Cover Class', 'Secondary Class', 'Cover Entropy', 'Impervious Surface Ratio', 'Vegetation Index'],
  },
  {
    group: 'Industrial Proximity',
    color: '#f97316',
    features: ['Nearest Facility Distance', 'Facility Type', 'Facility Count (1km)', 'Facility Count (5km)', 'Power Plant Capacity'],
  },
  {
    group: 'Temporal',
    color: '#3b82f6',
    features: ['Total Detections', 'Consecutive Days', 'Night Ratio', 'Max FRP', 'FRP Trend', 'Detection Gaps', 'First/Last Seen'],
  },
  {
    group: 'Spatial Context',
    color: '#a855f7',
    features: ['Distance to Forest Edge', 'Distance to Urban', 'Elevation', 'Slope', 'Road Distance', 'Population Density'],
  },
  {
    group: 'Engineered',
    color: '#06b6d4',
    features: ['FRP × Night Ratio', 'Distance × Persistence', 'Cover × Facility Score', 'Temporal Variance', 'Spatial Cluster ID'],
  },
];

export const TOTAL_FEATURES = 65;

export const LAND_COVER_CATEGORIES = [
  { label: 'Forest', color: '#22c55e', code: 10, implication: 'Wildfire evidence' },
  { label: 'Cropland', color: '#f59e0b', code: 40, implication: 'Agricultural burning evidence' },
  { label: 'Built-up', color: '#6b7280', code: 50, implication: 'Requires industrial context' },
  { label: 'Bare / Quarry', color: '#92400e', code: 60, implication: 'Mining activity evidence' },
  { label: 'Shrubland', color: '#84cc16', code: 20, implication: 'Wildfire / Grassfire evidence' },
  { label: 'Water', color: '#0ea5e9', code: 80, implication: 'Low fire probability' },
];

export const TEMPORAL_EXAMPLE = [
  { day: 1, frp: 38.2, night: true, detected: true },
  { day: 2, frp: 44.7, night: true, detected: true },
  { day: 3, frp: 51.3, night: true, detected: true },
  { day: 4, frp: 42.8, night: true, detected: true },
  { day: 5, frp: 39.1, night: false, detected: true },
  { day: 6, frp: 0, night: false, detected: false },
  { day: 7, frp: 41.5, night: true, detected: true },
];

export const RULE_EXAMPLES = [
  {
    condition: 'FOREST + Far from Industrial',
    evidence: ['Land Cover: Forest', 'Nearest Facility: >5km', 'Vegetation Index: High'],
    classification: 'Wildfire',
    color: '#ef4444',
    icon: '🔥',
  },
  {
    condition: 'CROPLAND + Short Persistence',
    evidence: ['Land Cover: Cropland', 'Persistence: 1–2 days', 'Seasonal Pattern: Match'],
    classification: 'Agricultural Burning',
    color: '#f59e0b',
    icon: '🌾',
  },
  {
    condition: 'INDUSTRIAL AREA + Night Activity + Persistence',
    evidence: ['Near Facility: <500m', 'Night Ratio: >0.7', 'Consecutive Days: ≥3'],
    classification: 'Industrial Fire / Flare',
    color: '#f97316',
    icon: '🏭',
  },
  {
    condition: 'WEAK or CONFLICTING CONTEXT',
    evidence: ['No dominant land cover', 'No nearby facilities', 'Isolated detection'],
    classification: 'Unknown',
    color: '#6b7280',
    icon: '❓',
  },
];

export const PIPELINE_STEPS = [
  { id: 'satellite', label: 'SATELLITE', sublabel: 'VIIRS Observation', icon: '🛰️', color: '#3b82f6' },
  { id: 'firms', label: 'FIRMS', sublabel: 'Near-Real-Time Ingestion', icon: '📡', color: '#60a5fa' },
  { id: 'hotspot', label: 'HOTSPOT', sublabel: 'Thermal Detection Record', icon: '🔴', color: '#ef4444' },
  { id: 'landcover', label: 'LAND COVER', sublabel: 'ESA WorldCover / GEE', icon: '🗺️', color: '#22c55e' },
  { id: 'industrial', label: 'INDUSTRIAL DB', sublabel: 'WRI + OpenStreetMap', icon: '🏭', color: '#f97316' },
  { id: 'spatial', label: 'SPATIAL ANALYSIS', sublabel: 'Proximity & Context', icon: '📍', color: '#a855f7' },
  { id: 'temporal', label: 'TEMPORAL ANALYSIS', sublabel: 'Persistence & Behavior', icon: '📅', color: '#06b6d4' },
  { id: 'features', label: 'FEATURE ENGINEERING', sublabel: '65 Features Extracted', icon: '⚙️', color: '#fbbf24' },
  { id: 'rules', label: 'RULE ENGINE', sublabel: 'Explainable Pseudo-Labels', icon: '📋', color: '#8b5cf6' },
  { id: 'rf', label: 'RANDOM FOREST', sublabel: 'Weakly Supervised ML', icon: '🌲', color: '#10b981' },
  { id: 'classification', label: 'CLASSIFICATION', sublabel: 'Fire Type Decision', icon: '🎯', color: '#f97316' },
  { id: 'gis', label: 'GIS VISUALIZATION', sublabel: 'Live Dashboard', icon: '🌍', color: '#3b82f6' },
];
