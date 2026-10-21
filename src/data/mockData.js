/**
 * Central mock data file for CET Sathi
 * All records are fictional demo data for prototype interface demonstration only.
 * No real institution or cutoff is officially represented.
 */

export const SAMPLE_PROFILE = {
  percentile: 92.40,
  category: 'Open',
  candidature: 'Maharashtra',
  homeUniversity: 'Mumbai University (MU)',
  preferredBranches: ['Computer Engineering', 'Information Technology', 'AI & Data Science'],
  priorityMode: 'Branch first', // 'Branch first' | 'Balanced' | 'College first'
  preferredRegions: ['Mumbai', 'Navi Mumbai'],
  feeComfort: '₹75,000–₹1.5 lakh', // 'Under ₹75,000' | '₹75,000–₹1.5 lakh' | '₹1.5–₹2.5 lakh' | 'Flexible'
  commutePreference: 'Local commute preferred', // 'Local commute preferred' | 'Hostel acceptable' | 'Flexible'
  collegeTypes: ['Autonomous', 'Private', 'Government-aided']
};

export const BRANCH_LIST = [
  'Computer Engineering',
  'Information Technology',
  'AI & Data Science',
  'Electronics & Telecommunication',
  'Electrical Engineering',
  'Mechanical Engineering'
];

export const REGION_LIST = [
  'Mumbai',
  'Navi Mumbai',
  'Thane',
  'Pune',
  'Other Maharashtra'
];

export const COLLEGE_TYPES = [
  'Government',
  'Government-aided',
  'Private'
];

export const FEE_RANGES = [
  { label: 'Under ₹75,000', max: 75000 },
  { label: '₹75,000–₹1.5 lakh', max: 150000 },
  { label: '₹1.5–₹2.5 lakh', max: 250000 },
  { label: 'Flexible', max: 999999 }
];

export const COLLEGES = [
  {
    id: 'c01',
    name: 'Harbor Institute of Technology (Demo)',
    shortName: 'Harbor Tech',
    location: 'Navi Mumbai',
    region: 'Navi Mumbai',
    type: 'Private',
    autonomy: 'Autonomous',
    indicativeFee: 135000,
    established: 2002,
    campusSize: '12 acres',
    hostelAvailable: true,
    transportConnectivity: 'Near suburban rail corridor & highway',
    overview: 'Harbor Institute of Technology is an autonomous engineering institution in Navi Mumbai known for modern computing labs and curriculum revisions updated with industry boards.',
    branches: [
      {
        id: 'c01-ce',
        name: 'Computer Engineering',
        sampleCutoff: 93.10,
        intake: 120,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Systems programming, Cloud architecture, Data structures'
      },
      {
        id: 'c01-it',
        name: 'Information Technology',
        sampleCutoff: 91.20,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Network security, Enterprise web systems, DevOps'
      },
      {
        id: 'c01-aids',
        name: 'AI & Data Science',
        sampleCutoff: 90.50,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Machine learning fundamentals, Data pipelines, AI ethics'
      }
    ]
  },
  {
    id: 'c02',
    name: 'Western Metro Engineering College (Demo)',
    shortName: 'Western Metro',
    location: 'Mumbai',
    region: 'Mumbai',
    type: 'Private',
    autonomy: 'Non-autonomous',
    indicativeFee: 110000,
    established: 1998,
    campusSize: '8 acres',
    hostelAvailable: false,
    transportConnectivity: 'Walking distance from metro station',
    overview: 'Centrally located college with high accessibility across the western suburbs. Focuses on university curriculum rigor with active student tech chapters.',
    branches: [
      {
        id: 'c02-it',
        name: 'Information Technology',
        sampleCutoff: 91.60,
        intake: 120,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Software development life cycle, Database management'
      },
      {
        id: 'c02-ce',
        name: 'Computer Engineering',
        sampleCutoff: 92.80,
        intake: 120,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Operating systems, Algorithms, Distributed computing'
      },
      {
        id: 'c02-extc',
        name: 'Electronics & Telecommunication',
        sampleCutoff: 84.50,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Signal processing, Embedded IoT, Wireless communications'
      }
    ]
  },
  {
    id: 'c03',
    name: 'Konkan School of Engineering (Demo)',
    shortName: 'Konkan School',
    location: 'Thane',
    region: 'Thane',
    type: 'Private',
    autonomy: 'Autonomous',
    indicativeFee: 145000,
    established: 2007,
    campusSize: '15 acres',
    hostelAvailable: true,
    transportConnectivity: 'Frequent bus feeder connectivity from Thane junction',
    overview: 'Autonomous campus featuring interdisciplinary design projects, maker spaces, and student incubation support.',
    branches: [
      {
        id: 'c03-aids',
        name: 'AI & Data Science',
        sampleCutoff: 90.90,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Applied deep learning, Big data analytics, Computer vision'
      },
      {
        id: 'c03-ce',
        name: 'Computer Engineering',
        sampleCutoff: 92.10,
        intake: 120,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Compiler design, Full-stack software, Cryptography'
      },
      {
        id: 'c03-mech',
        name: 'Mechanical Engineering',
        sampleCutoff: 78.40,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Robotics automation, CAD/CAM, Thermal systems'
      }
    ]
  },
  {
    id: 'c04',
    name: 'Maharashtra Technical Institute (Demo)',
    shortName: 'Maha Tech Institute',
    location: 'Pune',
    region: 'Pune',
    type: 'Government-aided',
    autonomy: 'Autonomous',
    indicativeFee: 78000,
    established: 1985,
    campusSize: '24 acres',
    hostelAvailable: true,
    transportConnectivity: 'Well connected to Pune municipal transport & highway',
    overview: 'A historic government-aided institution with affordable fees, experienced core faculty, and extensive technical library facilities.',
    branches: [
      {
        id: 'c04-it',
        name: 'Information Technology',
        sampleCutoff: 94.20,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'High-performance computing, Network design, Information security'
      },
      {
        id: 'c04-extc',
        name: 'Electronics & Telecommunication',
        sampleCutoff: 89.10,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'VLSI design, RF engineering, Satellite communication'
      },
      {
        id: 'c04-ee',
        name: 'Electrical Engineering',
        sampleCutoff: 86.30,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Power grids, Renewable microgrids, Control systems'
      }
    ]
  },
  {
    id: 'c05',
    name: 'City Centre College of Engineering (Demo)',
    shortName: 'City Centre Engg',
    location: 'Mumbai',
    region: 'Mumbai',
    type: 'Private',
    autonomy: 'Non-autonomous',
    indicativeFee: 125000,
    established: 1995,
    campusSize: '7 acres',
    hostelAvailable: false,
    transportConnectivity: 'Direct connection to local railway line and bus terminal',
    overview: 'Established Mumbai college with active industry partnerships, strong alumni network across financial services and IT firms.',
    branches: [
      {
        id: 'c05-ce',
        name: 'Computer Engineering',
        sampleCutoff: 89.80,
        intake: 120,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Database systems, Object oriented design, Cloud computing'
      },
      {
        id: 'c05-it',
        name: 'Information Technology',
        sampleCutoff: 88.50,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Web services, Cyber laws, Mobile app architecture'
      },
      {
        id: 'c05-mech',
        name: 'Mechanical Engineering',
        sampleCutoff: 76.20,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Fluid mechanics, Manufacturing automation, Thermodynamics'
      }
    ]
  },
  {
    id: 'c06',
    name: 'Lakeside College of Technology (Demo)',
    shortName: 'Lakeside Tech',
    location: 'Navi Mumbai',
    region: 'Navi Mumbai',
    type: 'Private',
    autonomy: 'Non-autonomous',
    indicativeFee: 95000,
    established: 2011,
    campusSize: '10 acres',
    hostelAvailable: true,
    transportConnectivity: 'Direct bus service from CBD Belapur & Kharghar',
    overview: 'A suburban college offering steady fee value, expanding computing departments, and collaborative student project spaces.',
    branches: [
      {
        id: 'c06-it',
        name: 'Information Technology',
        sampleCutoff: 87.40,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Software testing, Cloud infrastructure, Python for data'
      },
      {
        id: 'c06-aids',
        name: 'AI & Data Science',
        sampleCutoff: 86.80,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Exploratory data analysis, Machine learning tools, Visualization'
      },
      {
        id: 'c06-extc',
        name: 'Electronics & Telecommunication',
        sampleCutoff: 81.20,
        intake: 60,
        sampleRound: 'Round 1 (2025 sample)',
        keyFocus: 'Microcontrollers, Sensor networks, Basic signal analysis'
      }
    ]
  }
];

export const MOCK_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    collegeId: 'c01',
    collegeName: 'Harbor Institute of Technology (Demo)',
    branch: 'Computer Engineering',
    location: 'Navi Mumbai',
    region: 'Navi Mumbai',
    type: 'Private',
    autonomy: 'Autonomous',
    indicativeFee: 135000,
    sampleCutoff: 93.10,
    sampleRound: 'Round 1 (2025 sample)',
    fitLabel: 'Ambitious', // 'Ambitious' | 'Target' | 'Safer option'
    whyAppears: 'Matches your top branch priority (Computer Engineering) and preferred area (Navi Mumbai). Cutoff is 0.70 percentile above your score, making it a viable aspirational choice.',
    preferenceMatchScore: 88,
    breakdown: {
      branchMatch: 95,
      cutoffContext: 78,
      feeFit: 88,
      locationFit: 94,
      collegeFit: 90
    },
    tradeOffs: 'Higher cutoff requires treating as an aspirational choice. Slightly higher tuition than government-aided alternatives.'
  },
  {
    id: 'rec-2',
    collegeId: 'c02',
    collegeName: 'Western Metro Engineering College (Demo)',
    branch: 'Information Technology',
    location: 'Mumbai',
    region: 'Mumbai',
    type: 'Private',
    autonomy: 'Non-autonomous',
    indicativeFee: 110000,
    sampleCutoff: 91.60,
    sampleRound: 'Round 1 (2025 sample)',
    fitLabel: 'Target',
    whyAppears: 'Strong fit for your preferred branch list. Historical cutoff is 0.80 percentile below your score, offering realistic alignment with moderate fee comfort.',
    preferenceMatchScore: 92,
    breakdown: {
      branchMatch: 92,
      cutoffContext: 90,
      feeFit: 92,
      locationFit: 90,
      collegeFit: 84
    },
    tradeOffs: 'Non-autonomous curriculum structure; no on-campus hostel facility (daily commute required).'
  },
  {
    id: 'rec-3',
    collegeId: 'c03',
    collegeName: 'Konkan School of Engineering (Demo)',
    branch: 'AI & Data Science',
    location: 'Thane',
    region: 'Thane',
    type: 'Private',
    autonomy: 'Autonomous',
    indicativeFee: 145000,
    sampleCutoff: 90.90,
    sampleRound: 'Round 1 (2025 sample)',
    fitLabel: 'Target',
    whyAppears: 'Aligned with your interest in emerging computing disciplines. Sample cutoff is 1.50 percentile below your score with autonomous project flexibility.',
    preferenceMatchScore: 86,
    breakdown: {
      branchMatch: 88,
      cutoffContext: 89,
      feeFit: 78,
      locationFit: 82,
      collegeFit: 92
    },
    tradeOffs: 'Higher annual fee close to upper budget threshold; Thane location may involve longer transit if traveling from south/central Mumbai.'
  },
  {
    id: 'rec-4',
    collegeId: 'c05',
    collegeName: 'City Centre College of Engineering (Demo)',
    branch: 'Computer Engineering',
    location: 'Mumbai',
    region: 'Mumbai',
    type: 'Private',
    autonomy: 'Non-autonomous',
    indicativeFee: 125000,
    sampleCutoff: 89.80,
    sampleRound: 'Round 1 (2025 sample)',
    fitLabel: 'Target',
    whyAppears: 'Directly delivers Computer Engineering within core Mumbai transit network with a healthy 2.60 percentile buffer below your score.',
    preferenceMatchScore: 85,
    breakdown: {
      branchMatch: 95,
      cutoffContext: 92,
      feeFit: 84,
      locationFit: 95,
      collegeFit: 78
    },
    tradeOffs: 'Older campus infrastructure and non-autonomous university examination timetable.'
  },
  {
    id: 'rec-5',
    collegeId: 'c06',
    collegeName: 'Lakeside College of Technology (Demo)',
    branch: 'Information Technology',
    location: 'Navi Mumbai',
    region: 'Navi Mumbai',
    type: 'Private',
    autonomy: 'Non-autonomous',
    indicativeFee: 95000,
    sampleCutoff: 87.40,
    sampleRound: 'Round 1 (2025 sample)',
    fitLabel: 'Safer option',
    whyAppears: 'Provides a dependable backup with a 5.00 percentile margin below your score and an attractive fee under ₹1.0 lakh.',
    preferenceMatchScore: 83,
    breakdown: {
      branchMatch: 90,
      cutoffContext: 96,
      feeFit: 95,
      locationFit: 90,
      collegeFit: 74
    },
    tradeOffs: 'Newer department profile compared to established institutions, but provides solid cushion in round allotment.'
  },
  {
    id: 'rec-6',
    collegeId: 'c04',
    collegeName: 'Maharashtra Technical Institute (Demo)',
    branch: 'Information Technology',
    location: 'Pune',
    region: 'Pune',
    type: 'Government-aided',
    autonomy: 'Autonomous',
    indicativeFee: 78000,
    sampleCutoff: 94.20,
    sampleRound: 'Round 1 (2025 sample)',
    fitLabel: 'Ambitious',
    whyAppears: 'High-reputation aided institution with very economical fees (₹78,000/yr). Requires relocation to Pune or hostel stay.',
    preferenceMatchScore: 81,
    breakdown: {
      branchMatch: 90,
      cutoffContext: 72,
      feeFit: 98,
      locationFit: 60,
      collegeFit: 94
    },
    tradeOffs: 'Located in Pune (outside preferred Mumbai/Navi Mumbai zone); higher cutoff requires bold round positioning.'
  }
];

export const INITIAL_PREFERENCE_LIST = [
  {
    id: 'pref-1',
    recId: 'rec-1',
    collegeId: 'c01',
    collegeName: 'Harbor Institute of Technology (Demo)',
    branch: 'Computer Engineering',
    location: 'Navi Mumbai',
    sampleCutoff: 93.10,
    indicativeFee: 135000,
    fitLabel: 'Ambitious',
    autonomy: 'Autonomous',
    type: 'Private'
  },
  {
    id: 'pref-2',
    recId: 'rec-2',
    collegeId: 'c02',
    collegeName: 'Western Metro Engineering College (Demo)',
    branch: 'Information Technology',
    location: 'Mumbai',
    sampleCutoff: 91.60,
    indicativeFee: 110000,
    fitLabel: 'Target',
    autonomy: 'Non-autonomous',
    type: 'Private'
  },
  {
    id: 'pref-3',
    recId: 'rec-3',
    collegeId: 'c03',
    collegeName: 'Konkan School of Engineering (Demo)',
    branch: 'AI & Data Science',
    location: 'Thane',
    sampleCutoff: 90.90,
    indicativeFee: 145000,
    fitLabel: 'Target',
    autonomy: 'Autonomous',
    type: 'Private'
  },
  {
    id: 'pref-4',
    recId: 'rec-4',
    collegeId: 'c05',
    collegeName: 'City Centre College of Engineering (Demo)',
    branch: 'Computer Engineering',
    location: 'Mumbai',
    sampleCutoff: 89.80,
    indicativeFee: 125000,
    fitLabel: 'Target',
    autonomy: 'Non-autonomous',
    type: 'Private'
  },
  {
    id: 'pref-5',
    recId: 'rec-5',
    collegeId: 'c06',
    collegeName: 'Lakeside College of Technology (Demo)',
    branch: 'Information Technology',
    location: 'Navi Mumbai',
    sampleCutoff: 87.40,
    indicativeFee: 95000,
    fitLabel: 'Safer option',
    autonomy: 'Non-autonomous',
    type: 'Private'
  }
];

export const CAP_UPDATES = [
  {
    id: 'up-1',
    dateLabel: 'Sample date — Stage 1',
    category: 'CAP process',
    title: 'Review category and candidature details before option form entry',
    summary: 'Ensure your verified candidate category matches the uploaded certificates on the state portal. Home university vs other-than-home-university quotas are assigned at registration.',
    source: 'Illustrative advisory notice',
    details: 'During CAP registration, minor discrepancies in name or category codes can lead to automatic classification under the General category. Verify the scrutiny acknowledgment slip (FC receipt) thoroughly prior to filling options.'
  },
  {
    id: 'up-2',
    dateLabel: 'Sample date — Stage 2',
    category: 'Documents',
    title: 'Keep required certificates organized before Round 1 allotment',
    summary: 'Category candidates (OBC, SC, ST, VJ/NT, EWS) should confirm validity certificates and Non-Creamy Layer endorsements are dated as required by current government resolutions.',
    source: 'Demonstration checklist',
    details: 'Institutions strictly require original document verification during reporting. Provisio receipts are subject to time-bound submission rules; check the latest handbook for exact annexures.'
  },
  {
    id: 'up-3',
    dateLabel: 'Sample date — Stage 3',
    category: 'Allotment',
    title: 'Understand Auto-Freeze vs Self-Freeze vs Float choices',
    summary: 'If allotted your 1st preference, the seat is auto-frozen. For preferences 2 and below, you can choose Self-Freeze or Float to stay eligible for betterment in subsequent rounds.',
    source: 'Sample procedural guide',
    details: 'Auto-freeze means you must report to the allotted institute to accept the seat; failure to do so will disqualify you from subsequent centralized CAP rounds. Float allows accepting the current seat while seeking a higher-numbered choice.'
  },
  {
    id: 'up-4',
    dateLabel: 'Sample date — Stage 4',
    category: 'Institute-level',
    title: 'Understanding institutional round vacancies and reporting protocols',
    summary: 'After the completion of CAP rounds, remaining vacant seats are filled at the institutional level based strictly on merit and official seat matrix notifications.',
    source: 'Illustrative reference',
    details: 'Institutional level rounds are governed by individual college application windows, but merit lists must follow centralized MHT-CET criteria without private capitation.'
  }
];

export const CAP_CHECKLIST = [
  {
    id: 'chk-1',
    title: 'Cross-verify official scrutiny acknowledgment (FC receipt)',
    description: 'Ensure candidate type, category, and gender reservations are accurately captured in your verified profile.'
  },
  {
    id: 'chk-2',
    title: 'Confirm branch code against exact institute choice code',
    description: 'Every branch has a distinct 9-digit choice code. Do not confuse Shift 1, Shift 2, or TFWS (Tuition Fee Waiver) codes.'
  },
  {
    id: 'chk-3',
    title: 'Arrange a balanced 3-tier preference sequence',
    description: 'Include ambitious colleges at the top, a solid cluster of target choices in the middle, and reliable safety options towards the bottom.'
  },
  {
    id: 'chk-4',
    title: 'Check MahaDBT scholarship eligibility criteria',
    description: 'Students applying through reserved categories or EBC / EWS schemes must verify eligibility criteria for fee concessions directly.'
  },
  {
    id: 'chk-5',
    title: 'Confirm option form submission before the deadline',
    description: 'Saving a draft is not enough; the form must be confirmed using your OTP password on the official portal.'
  }
];
