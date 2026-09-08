// Research sources and references for the Research Panel
// Add your actual URLs to the `url` fields below

export const RESEARCH_SOURCES = [
  {
    category: 'RESEARCH DOCUMENTS',
    icon: '📄',
    items: [
      {
        label: 'Google Docs Research Notes',
        description: 'Primary project research and methodology documentation',
        url: 'https://docs.google.com/document/d/1USacf4ONUiFgN-j-DE_meJYSDb14lsGoXbrPl5QZUMU/edit?usp=sharing',
        type: 'doc',
      },
      {
        label: 'Case Study & Project Drive',
        description: 'Comprehensive case study documentation, presentation assets, and references',
        url: 'https://drive.google.com/drive/folders/1wUalbwyz7dt1ZE1yd5j-azrV857FjWyL?usp=sharing',
        type: 'doc',
      },
      {
        label: 'Gemini AI Research Compilation',
        description: 'AI-assisted research and literature review',
        url: '#',
        type: 'doc',
      },
      {
        label: 'Claude Research Analysis',
        description: 'Supplementary AI-assisted analysis and documentation',
        url: '#',
        type: 'doc',
      },
      {
        label: 'Additional Claude Research',
        description: 'Extended research notes and technical deep-dives',
        url: '#',
        type: 'doc',
      },
      {
        label: 'Project Documentation',
        description: 'Full project technical documentation and architecture notes',
        url: 'https://drive.google.com/drive/folders/1wUalbwyz7dt1ZE1yd5j-azrV857FjWyL?usp=sharing',
        type: 'doc',
      },
    ],
  },
  {
    category: 'DATA SOURCES',
    icon: '🛰️',
    items: [
      {
        label: 'Nature Scientific Data — Global Industrial Heat Sources',
        description: 'Annual dynamics of global remote industrial heat sources dataset from 2012 to 2021 (Ma et al., 2024)',
        url: 'https://www.nature.com/articles/s41597-024-03461-3',
        type: 'data',
      },
      {
        label: 'NASA FIRMS — Active Fire Data',
        description: 'Fire Information for Resource Management System. Near-real-time VIIRS and MODIS active fire detections.',
        url: 'https://firms.modaps.eosdis.nasa.gov/',
        type: 'data',
      },
      {
        label: 'NASA FIRMS VIIRS 375m NRT',
        description: 'VIIRS 375m Near Real-Time active fire product documentation',
        url: 'https://firms.modaps.eosdis.nasa.gov/descriptions/FIRMS_VIIRS_375m_NRT.html',
        type: 'data',
      },
      {
        label: 'WRI Global Power Plant Database',
        description: 'World Resources Institute open-source global power plant database used for industrial proximity analysis',
        url: 'https://datasets.wri.org/dataset/globalpowerplantdatabase',
        type: 'data',
      },
      {
        label: 'ESA WorldCover 10m Land Cover',
        description: 'European Space Agency global land cover map at 10m resolution, accessed via Google Earth Engine',
        url: 'https://esa-worldcover.org/',
        type: 'data',
      },
      {
        label: 'Google Earth Engine',
        description: 'Cloud-based geospatial analysis platform used for ESA WorldCover data access',
        url: 'https://earthengine.google.com/',
        type: 'data',
      },
    ],
  },
  {
    category: 'TECHNICAL REFERENCES',
    icon: '🔬',
    items: [
      {
        label: 'ScienceDirect — Industrial Heat Source Identification',
        description: 'Remote Sensing of Environment: Identifying industrial heat sources using time-series of VIIRS Nightfire with an object-oriented approach (Liu et al., 2018)',
        url: 'https://www.sciencedirect.com/science/article/abs/pii/S0034425717304820',
        type: 'reference',
      },
      {
        label: 'OpenStreetMap / Overpass API',
        description: 'Open-source geographic data used for industrial infrastructure identification and spatial queries',
        url: 'https://overpass-api.de/',
        type: 'reference',
      },
      {
        label: 'VIIRS Active Fire Product — Algorithm Theoretical Basis',
        description: 'Scientific algorithm documentation for VIIRS 375m active fire detection',
        url: 'https://viirsland.gsfc.nasa.gov/PDF/VIIRS_activefire_375m_ATBD.pdf',
        type: 'reference',
      },
      {
        label: 'NASA LANCE — Near Real-Time Data',
        description: 'Land, Atmosphere Near real-time Capability for EOS — the system that provides FIRMS NRT data',
        url: 'https://earthdata.nasa.gov/earth-observation-data/near-real-time',
        type: 'reference',
      },
    ],
  },
];

export const ACCURACY_DISCLAIMER = `IMPORTANT: The Random Forest model reported in this project was trained using rule-generated pseudo-labels (Rule V2). Reported validation metrics reflect agreement between the ML model and the rule engine — not independently validated ground-truth accuracy. The rule engine itself is a contextual heuristic, not a scientifically measured ground-truth. Any risk score should be treated as a heuristic indicator, not a formally calibrated probability.`;
