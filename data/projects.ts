export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'automation' | 'software' | 'development';
  status: 'production' | 'development';
  statusText: string;
  links?: {
    live?: string;
    github?: string;
  };
  features: string[];
  images?: ProjectImage[];
}

export const projects: Project[] = [
  {
    title: 'Multi-Agent Orchestrator',
    description: 'AI agent coordination framework',
    longDescription:
      'Framework demonstrating AI agent coordination for complex engineering problems. A conductor agent analyzes problems, routes to specialized agents (Controls, Process, Systems, Pragmatist), and synthesizes responses. Includes token tracking and cost estimation.',
    tags: ['AI/ML', 'Multi-Agent', 'React', 'Architecture'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://multi-agent-orchestrator-framework.vercel.app/',
    },
    features: [
      'Multi-agent architecture design',
      'Specialized domain agents',
      'Token tracking & cost estimation',
      'Practical orchestration patterns',
    ],
    images: [
      { src: '/projects/multi-agent/Dashboard.png.png', alt: 'Multi-Agent Dashboard', caption: 'Agent orchestration interface' },
      { src: '/projects/multi-agent/ConductAna.png.png', alt: 'Conductor Analysis', caption: 'Problem analysis by conductor agent' },
      { src: '/projects/multi-agent/CondComp.png.png', alt: 'Component View', caption: 'Agent component architecture' },
      { src: '/projects/multi-agent/Synthesis.png.png', alt: 'Response Synthesis', caption: 'Synthesized multi-agent response' },
      { src: '/projects/multi-agent/Synthe.png.png', alt: 'Synthesis Details', caption: 'Response synthesis breakdown' },
      { src: '/projects/multi-agent/DI.png.png', alt: 'Domain Integration', caption: 'Domain-specific agent integration' },
    ],
  },
  {
    title: 'PlainSpeak Query Interface',
    description: 'Natural language to SQL for manufacturing',
    longDescription:
      'Natural language interface for manufacturing data. Ask questions in plain English, get answers with the generated SQL visible. Built on a simulated 30-day production database covering scrap rates, downtime, OEE, and quality metrics.',
    tags: ['NL-to-SQL', 'AI/ML', 'Manufacturing', 'React'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://plain-speak-query-interface.vercel.app/',
    },
    features: [
      'Natural language queries',
      'Transparent SQL generation',
      'Manufacturing KPI database',
      'Data democratization',
    ],
    images: [
      { src: '/projects/plainspeak/Dashboard.png.png', alt: 'PlainSpeak Dashboard', caption: 'Manufacturing data overview' },
      { src: '/projects/plainspeak/Query.png.png', alt: 'Query Interface', caption: 'Natural language query input' },
      { src: '/projects/plainspeak/OEE.png.png', alt: 'OEE Metrics', caption: 'Overall Equipment Effectiveness' },
      { src: '/projects/plainspeak/Scrap.png.png', alt: 'Scrap Analysis', caption: 'Scrap rate tracking' },
      { src: '/projects/plainspeak/Downtime.png.png', alt: 'Downtime Analysis', caption: 'Equipment downtime metrics' },
      { src: '/projects/plainspeak/ProdMetrics.png.png', alt: 'Production Metrics', caption: 'Production performance data' },
      { src: '/projects/plainspeak/Howitworks.png.png', alt: 'How It Works', caption: 'System architecture overview' },
    ],
  },
  {
    title: 'SensorSim Anomaly Detector',
    description: 'Predictive maintenance dashboard',
    longDescription:
      'Real-time predictive maintenance dashboard using simulated industrial sensor data. Detects equipment anomalies through statistical analysis (Z-score), predicts failure timelines, and allows fault injection for training scenarios.',
    tags: ['Predictive Maintenance', 'React', 'Analytics', 'HMI'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://sensor-sim-anomaly-detector.vercel.app/',
    },
    features: [
      'Real-time sensor simulation',
      'Z-score anomaly detection',
      'Failure prediction',
      'Industrial HMI design',
    ],
    images: [
      { src: '/projects/sensorsim/Dashboard.png.png', alt: 'Sensor Dashboard', caption: 'Real-time sensor monitoring' },
      { src: '/projects/sensorsim/AnomDetec.png.png', alt: 'Anomaly Detection', caption: 'Z-score anomaly detection' },
      { src: '/projects/sensorsim/BearingWear.png.png', alt: 'Bearing Wear', caption: 'Bearing wear prediction' },
      { src: '/projects/sensorsim/MotorOverload.png.png', alt: 'Motor Overload', caption: 'Motor overload detection' },
      { src: '/projects/sensorsim/HeaterFail.png.png', alt: 'Heater Failure', caption: 'Heater failure prediction' },
      { src: '/projects/sensorsim/HowItWorks.png.png', alt: 'How It Works', caption: 'System architecture' },
    ],
  },
  {
    title: 'ParameterPath Optimizer',
    description: 'Blown film extrusion expert system',
    longDescription:
      'Expert system for blown film extrusion parameter recommendations and defect diagnosis. Input material and targets, get processing parameters. Input a defect, get ranked probable causes with corrective actions. Rules-based for explainability and safety.',
    tags: ['Expert System', 'Manufacturing', 'React', 'Rules Engine'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://parameter-path-optimizer.vercel.app/',
    },
    features: [
      'Parameter recommendations',
      'Defect diagnosis',
      'Explainable rules-based AI',
      'Manufacturing safety focus',
    ],
    images: [
      { src: '/projects/parameterpath/Dashboard.png.png', alt: 'Parameter Dashboard', caption: 'Expert system dashboard' },
      { src: '/projects/parameterpath/ProInputs.png.png', alt: 'Process Inputs', caption: 'Material and target input' },
      { src: '/projects/parameterpath/OpParms.png.png', alt: 'Operating Parameters', caption: 'Recommended parameters' },
      { src: '/projects/parameterpath/DiagDef.png.png', alt: 'Defect Diagnosis', caption: 'Defect diagnosis interface' },
      { src: '/projects/parameterpath/ProbCause.png.png', alt: 'Probable Causes', caption: 'Ranked probable causes' },
      { src: '/projects/parameterpath/Howitworks.png.png', alt: 'How It Works', caption: 'Rules engine architecture' },
    ],
  },
  {
    title: 'CPM - Predictive Maintenance',
    description: 'High-credibility predictive maintenance platform',
    longDescription:
      'A high-credibility predictive maintenance platform with C++ signal processing, causal inference, and a premium React dashboard. Enterprise-grade architecture for industrial equipment monitoring.',
    tags: ['C++', 'React', 'Signal Processing', 'Causal Inference'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://cpm-git-main-scott198989s-projects.vercel.app/',
    },
    features: [
      'C++ signal processing engine',
      'Causal inference models',
      'Premium React dashboard',
      'Enterprise-grade architecture',
    ],
    images: [
      { src: '/projects/cpm/screenshot1.png', alt: 'CPM Dashboard', caption: 'Real-time equipment monitoring' },
      { src: '/projects/cpm/screenshot2.png', alt: 'Signal Analysis', caption: 'C++ signal processing engine' },
      { src: '/projects/cpm/screenshot3.png', alt: 'Causal Analysis', caption: 'Causal inference visualization' },
      { src: '/projects/cpm/screenshot4.png', alt: 'Predictive Analytics', caption: 'AI-powered failure prediction' },
      { src: '/projects/cpm/screenshot5.png', alt: '3D Visualization', caption: 'Equipment health visualization' },
      { src: '/projects/cpm/screenshot6.png', alt: 'Alert System', caption: 'Intelligent alert management' },
    ],
  },
  {
    title: 'AI Virtual Metrology',
    description: 'AI-powered coating quality prediction',
    longDescription:
      'AI-powered quality prediction for thermal spray coating processes. Predict coating thickness, porosity, and defects in real-time without physical inspection. Eliminates destructive testing.',
    tags: ['AI/ML', 'Manufacturing', 'Quality Prediction', 'React'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://ai-virtual-metrology-git-main-scott198989s-projects.vercel.app/',
    },
    features: [
      'Real-time quality prediction',
      'Thermal spray coating analysis',
      'Non-destructive testing',
      'Porosity & thickness prediction',
    ],
    images: [
      { src: '/projects/virtual-metrology/Dashboard.png.png', alt: 'Virtual Metrology Dashboard', caption: 'Quality prediction interface' },
      { src: '/projects/virtual-metrology/VM.png.png', alt: 'Virtual Metrology', caption: 'AI prediction engine' },
      { src: '/projects/virtual-metrology/3d.png.png', alt: '3D Visualization', caption: 'Coating thickness visualization' },
      { src: '/projects/virtual-metrology/Drift.png.png', alt: 'Drift Analysis', caption: 'Process drift monitoring' },
      { src: '/projects/virtual-metrology/ProductRuns.png.png', alt: 'Product Runs', caption: 'Production run tracking' },
      { src: '/projects/virtual-metrology/Reports.png.png', alt: 'Reports', caption: 'Quality reports generation' },
    ],
  },
  {
    title: 'NCM Analytics Dashboard',
    description: 'Production quality management system',
    longDescription:
      'Production-deployed quality management dashboard tracking non-conformance data from a live manufacturing environment. Syncs with SharePoint via Power Automate, stores in Cloudflare D1, serves through Workers backend. Built for actual daily use by quality and operations teams.',
    tags: ['React', 'Cloudflare Workers', 'D1 Database', 'Power Automate'],
    category: 'software',
    status: 'production',
    statusText: 'Production',
    links: {
      live: 'https://iso-flex-dashboard-git-main-scott198989s-projects.vercel.app/',
    },
    features: [
      'Live manufacturing data sync',
      'Real-time filtering & trends',
      'Defect distribution analysis',
      'Daily use by QA teams',
    ],
    images: [
      { src: '/projects/ncm/dashboard.png.png', alt: 'NCM Dashboard', caption: 'Quality management overview' },
      { src: '/projects/ncm/login.png.png', alt: 'Login Screen', caption: 'Secure authentication' },
      { src: '/projects/ncm/Cal.png.png', alt: 'Calendar View', caption: 'NCM calendar tracking' },
      { src: '/projects/ncm/silo.png.png', alt: 'Data Silos', caption: 'Data organization view' },
      { src: '/projects/ncm/shqron.png.png', alt: 'Chevron View', caption: 'Process flow visualization' },
      { src: '/projects/ncm/screens.ang.png', alt: 'Analytics', caption: 'Non-conformance analytics' },
    ],
  },
  {
    title: 'Production Assistant',
    description: 'Operator tool for blown film extrusion',
    longDescription:
      'A practical assistant for production operators at blown film extrusion plants. Provides guidance for line adjustments, change-over procedures, troubleshooting, and other daily operational tasks. Built to reduce downtime and support consistent quality.',
    tags: ['React', 'Manufacturing', 'Blown Film', 'Operator Tools'],
    category: 'automation',
    status: 'production',
    statusText: 'Live Demo',
    links: {
      live: 'https://production-assistant-gamma.vercel.app/',
    },
    features: [
      'Line adjustment guidance',
      'Change-over procedures',
      'Troubleshooting support',
      'Operator reference tools',
    ],
    images: [
      { src: '/projects/production-assistant/Screenshot 2025-12-29 112337.png', alt: 'Production Assistant Dashboard', caption: 'Main dashboard view' },
      { src: '/projects/production-assistant/Screenshot 2025-12-29 112426.png', alt: 'Production Metrics', caption: 'Production metrics overview' },
      { src: '/projects/production-assistant/Screenshot 2025-12-29 112443.png', alt: 'Workflow View', caption: 'Workflow management' },
      { src: '/projects/production-assistant/Screenshot 2025-12-29 112509.png', alt: 'Analytics', caption: 'Production analytics' },
      { src: '/projects/production-assistant/Screenshot 2025-12-29 112527.png', alt: 'Insights', caption: 'AI-powered insights' },
      { src: '/projects/production-assistant/Screenshot 2025-12-29 112547.png', alt: 'Reports', caption: 'Production reports' },
    ],
  },
  {
    title: 'ISOFlex Assistant',
    description: 'AI-powered assistant for manufacturers',
    longDescription:
      'An AI-powered assistant system designed for mid-size manufacturers who need custom AI solutions but lack dedicated technical teams. Integrates with existing manufacturing workflows to provide intelligent automation and decision support.',
    tags: ['Python', 'AI/ML', 'Manufacturing', 'Automation'],
    category: 'development',
    status: 'development',
    statusText: 'In Development (80%)',
    features: [
      'Custom AI for manufacturing workflows',
      'Integration with existing systems',
      'Intelligent decision support',
      'Automated process optimization',
    ],
  },
  {
    title: 'HAVOC',
    description: 'Custom 7B parameter language model',
    longDescription:
      'A custom 7B parameter language model built from scratch using novel reasoning architectures. Currently in active training with promising convergence metrics.',
    tags: ['Python', 'Machine Learning', 'LLM', 'PyTorch'],
    category: 'development',
    status: 'development',
    statusText: 'In Development',
    features: [
      'Novel reasoning architecture',
      '7B parameter scale',
      'Custom training pipeline',
      'Active convergence optimization',
    ],
  },
];

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'automation', label: 'AI & Automation' },
  { id: 'software', label: 'Software' },
  { id: 'development', label: 'In Development' },
] as const;
