/**
 * Campus Mock Data for AccessAble Campus
 * All coordinates represent a realistic demo campus layout centered at Stanford-like demo coordinates
 * Note: Clearly labeled as sample demo data.
 */

export const DEMO_CAMPUS_CENTER = [37.4275, -122.1697]; // Demo campus coordinates

export const DEMO_BUILDINGS = [
  { id: 'bld-main-library', name: 'Green Main Library', code: 'LIB', floors: 4, hasElevator: true, entrances: 3 },
  { id: 'bld-engineering', name: 'Terman Engineering Center', code: 'ENG', floors: 3, hasElevator: true, entrances: 4 },
  { id: 'bld-student-union', name: 'Tressider Student Union', code: 'STU', floors: 2, hasElevator: true, entrances: 4 },
  { id: 'bld-science-complex', name: 'Science & Bio-X Complex', code: 'SCI', floors: 5, hasElevator: true, entrances: 3 },
  { id: 'bld-humanities', name: 'Humanities & Arts Hall', code: 'HUM', floors: 3, hasElevator: false, entrances: 2 },
  { id: 'bld-medical-center', name: 'Campus Health & Medical Center', code: 'MED', floors: 2, hasElevator: true, entrances: 2 },
  { id: 'bld-sports-center', name: 'Arrillaga Sports & Rec Center', code: 'REC', floors: 2, hasElevator: true, entrances: 3 },
  { id: 'bld-dining-hall', name: 'Lakeside Dining Pavilion', code: 'DIN', floors: 1, hasElevator: false, entrances: 2 },
];

export const FACILITY_CATEGORIES = [
  'All',
  'Ramp',
  'Elevator',
  'Accessible Washroom',
  'Wheelchair Accessible Entrance',
  'Parking',
  'Medical Center',
  'Library',
  'Cafeteria'
];

export const DEMO_FACILITIES = [
  {
    id: 'fac-1',
    name: 'North Atrium Dual Ramps',
    category: 'Ramp',
    building: 'Green Main Library',
    buildingId: 'bld-main-library',
    coordinates: [37.4282, -122.1691],
    floor: 'Ground Level',
    status: 'Operational', // Operational, Limited Access, Under Maintenance
    rating: 96,
    scores: {
      rampQuality: 98,
      elevatorAccess: 95,
      accessibleEntrance: 95,
      washroomAccess: 92,
      signageQuality: 98
    },
    features: ['Gentle 1:12 incline', 'Continuous double handrails', 'Non-slip rubberized textured surface', 'Well-lit path with LED fixtures', 'Automatic sliding door at entrance'],
    description: 'Wide, dual-switchback ramp leading straight to the main automated library entrance.',
    lastChecked: '2026-10-24'
  },
  {
    id: 'fac-2',
    name: 'East Wing Glass Elevator',
    category: 'Elevator',
    building: 'Green Main Library',
    buildingId: 'bld-main-library',
    coordinates: [37.4279, -122.1688],
    floor: 'Floors 1-4',
    status: 'Operational',
    rating: 94,
    scores: {
      rampQuality: 92,
      elevatorAccess: 98,
      accessibleEntrance: 95,
      washroomAccess: 90,
      signageQuality: 95
    },
    features: ['Braille & embossed buttons', 'Audio floor announcement voice chime', 'Low-height horizontal control panel', 'Door sensor with obstruction safety retract', 'Interior mirror and safety rail'],
    description: 'High-capacity elevator providing step-free transit across all research stacks and study zones.',
    lastChecked: '2026-11-02'
  },
  {
    id: 'fac-3',
    name: 'Universal Accessible Restroom (L1)',
    category: 'Accessible Washroom',
    building: 'Green Main Library',
    buildingId: 'bld-main-library',
    coordinates: [37.4276, -122.1694],
    floor: '1st Floor, Near Circulation Desk',
    status: 'Operational',
    rating: 91,
    scores: {
      rampQuality: 90,
      elevatorAccess: 92,
      accessibleEntrance: 94,
      washroomAccess: 96,
      signageQuality: 88
    },
    features: ['Automatic motion-sensor door', 'Emergency pull cord with audio alarm', 'Low-reach sink & sensor faucet', 'Foldable safety support grab bars', 'Full adult changing station'],
    description: 'Spacious gender-neutral accessible restroom equipped with modern emergency alert chords.',
    lastChecked: '2026-10-30'
  },
  {
    id: 'fac-4',
    name: 'West Courtyard Main Barrier-Free Entrance',
    category: 'Wheelchair Accessible Entrance',
    building: 'Terman Engineering Center',
    buildingId: 'bld-engineering',
    coordinates: [37.4289, -122.1712],
    floor: 'Level 1',
    status: 'Operational',
    rating: 95,
    scores: {
      rampQuality: 94,
      elevatorAccess: 90,
      accessibleEntrance: 98,
      washroomAccess: 92,
      signageQuality: 95
    },
    features: ['Push-plate automated activation', 'Zero-threshold flat entry', 'Wide 42-inch doorway', 'Motion safety presence sensor', 'Covered weather awning'],
    description: 'Primary accessible entrance facing the computer science quad with level motorized door access.',
    lastChecked: '2026-11-05'
  },
  {
    id: 'fac-5',
    name: 'Robotics Wing Service Elevator',
    category: 'Elevator',
    building: 'Terman Engineering Center',
    buildingId: 'bld-engineering',
    coordinates: [37.4292, -122.1706],
    floor: 'Floors B1 - 3',
    status: 'Under Maintenance',
    rating: 68,
    scores: {
      rampQuality: 70,
      elevatorAccess: 60,
      accessibleEntrance: 75,
      washroomAccess: 70,
      signageQuality: 65
    },
    features: ['Extra wide freight door', 'Tactile button indicators', 'Emergency inter-com'],
    description: 'Hydraulic lift connecting underground fabrication labs to upper lecture theatres. Temporary inspection ongoing.',
    lastChecked: '2026-11-09'
  },
  {
    id: 'fac-6',
    name: 'Student Plaza Blue Access Ramp',
    category: 'Ramp',
    building: 'Tressider Student Union',
    buildingId: 'bld-student-union',
    coordinates: [37.4262, -122.1705],
    floor: 'Plaza Connection',
    status: 'Operational',
    rating: 89,
    scores: {
      rampQuality: 92,
      elevatorAccess: 85,
      accessibleEntrance: 90,
      washroomAccess: 88,
      signageQuality: 90
    },
    features: ['Gradual slope with mid-rest platform', 'Integrated solar LED pathway lights', 'Protective curbs', 'Smooth brushed concrete finish'],
    description: 'Connects the lower bus loop and bike pavilion with the student food court and counseling services.',
    lastChecked: '2026-10-28'
  },
  {
    id: 'fac-7',
    name: 'Accessible Dining Commons Food Court',
    category: 'Cafeteria',
    building: 'Tressider Student Union',
    buildingId: 'bld-student-union',
    coordinates: [37.4265, -122.1699],
    floor: '1st Floor Food Hall',
    status: 'Operational',
    rating: 92,
    scores: {
      rampQuality: 94,
      elevatorAccess: 90,
      accessibleEntrance: 95,
      washroomAccess: 90,
      signageQuality: 92
    },
    features: ['Lowered ordering counter (32")', 'Wide aisles between tables (>40")', 'Moveable wheelchair-accessible seating', 'Digital screen menus with high-contrast text', 'Staff assistance ordering lane'],
    description: 'Spacious food hall featuring step-free access, dedicated order stations, and adaptable dining tables.',
    lastChecked: '2026-11-01'
  },
  {
    id: 'fac-8',
    name: 'Bio-Science South Research Elevator',
    category: 'Elevator',
    building: 'Science & Bio-X Complex',
    buildingId: 'bld-science-complex',
    coordinates: [37.4301, -122.1685],
    floor: 'Floors 1-5',
    status: 'Operational',
    rating: 97,
    scores: {
      rampQuality: 95,
      elevatorAccess: 99,
      accessibleEntrance: 96,
      washroomAccess: 95,
      signageQuality: 98
    },
    features: ['High-speed smooth acceleration', 'Spoken floor annunciator', 'Wheelchair turn radius space', 'Emergency video and audio dispatch link', 'Continuous antibacterial handrails'],
    description: 'Modern smart elevator servicing all 5 levels of chemistry, biological sciences, and lecture arenas.',
    lastChecked: '2026-11-04'
  },
  {
    id: 'fac-9',
    name: 'Accessible Health Clinic & Urgent Care',
    category: 'Medical Center',
    building: 'Campus Health & Medical Center',
    buildingId: 'bld-medical-center',
    coordinates: [37.4255, -122.1668],
    floor: 'Level 1',
    status: 'Operational',
    rating: 99,
    scores: {
      rampQuality: 99,
      elevatorAccess: 98,
      accessibleEntrance: 100,
      washroomAccess: 99,
      signageQuality: 99
    },
    features: ['Fully ADA/Accessibility certified', 'Automated bi-parting slider doors', 'Height-adjustable examination tables', 'Wheelchair weight scales', 'Bilingual tactile wayfinding maps'],
    description: 'Comprehensive student and staff medical clinic designed from inception for total barrier-free patient care.',
    lastChecked: '2026-11-08'
  },
  {
    id: 'fac-10',
    name: 'Designated Accessible Mobility Parking Stalls',
    category: 'Parking',
    building: 'Science & Bio-X Complex',
    buildingId: 'bld-science-complex',
    coordinates: [37.4308, -122.1678],
    floor: 'Lot 4A (Adjacent to Entrance)',
    status: 'Operational',
    rating: 93,
    scores: {
      rampQuality: 95,
      elevatorAccess: 85,
      accessibleEntrance: 95,
      washroomAccess: 88,
      signageQuality: 96
    },
    features: ['8 van-accessible spaces with 8ft access aisles', 'Level surface with zero cross-slopes', 'Direct curb ramp cut connected to main sidewalk', 'High visibility reflective blue striping', '24/7 security intercom pole'],
    description: 'Reserved parking stalls closest to the engineering and medical campus northern spine.',
    lastChecked: '2026-10-19'
  },
  {
    id: 'fac-11',
    name: 'Humanities Archway Gradual Ramp',
    category: 'Ramp',
    building: 'Humanities & Arts Hall',
    buildingId: 'bld-humanities',
    coordinates: [37.4267, -122.1724],
    floor: 'South Quad Entry',
    status: 'Limited Access',
    rating: 74,
    scores: {
      rampQuality: 75,
      elevatorAccess: 65,
      accessibleEntrance: 78,
      washroomAccess: 70,
      signageQuality: 80
    },
    features: ['Brick paved transition', 'Handrails on one side only', 'Tactile paving warning at base'],
    description: 'Historic building entry ramp. Notice: Slightly bumpy historic brick pavement; slower navigation recommended.',
    lastChecked: '2026-11-06'
  },
  {
    id: 'fac-12',
    name: 'Aquatics & Gymnasium Accessible Locker Rooms',
    category: 'Accessible Washroom',
    building: 'Arrillaga Sports & Rec Center',
    buildingId: 'bld-sports-center',
    coordinates: [37.4295, -122.1652],
    floor: 'Ground Floor, Poolside',
    status: 'Operational',
    rating: 95,
    scores: {
      rampQuality: 95,
      elevatorAccess: 92,
      accessibleEntrance: 96,
      washroomAccess: 98,
      signageQuality: 94
    },
    features: ['Roll-in shower with fold-down bench', 'Dual lever anti-scald mixing valves', 'Motorized hoist / transfer sling availability', 'Panic pull line connected to lifeguard tower', 'Wheelchair secure locker storage'],
    description: 'State of the art adaptive athletics restroom and changing complex.',
    lastChecked: '2026-11-03'
  },
  {
    id: 'fac-13',
    name: 'Lakeside Pavilion Zero-Step Entry',
    category: 'Wheelchair Accessible Entrance',
    building: 'Lakeside Dining Pavilion',
    buildingId: 'bld-dining-hall',
    coordinates: [37.4248, -122.1718],
    floor: 'Ground Patio',
    status: 'Operational',
    rating: 90,
    scores: {
      rampQuality: 92,
      elevatorAccess: 80,
      accessibleEntrance: 95,
      washroomAccess: 90,
      signageQuality: 90
    },
    features: ['Level flagstone pathway', 'Sensor opened wide doors', 'Sheltered drop-off zone'],
    description: 'Convenient ground-floor dining entrance offering seamless wheelchair access directly to dining terrace.',
    lastChecked: '2026-10-29'
  },
  {
    id: 'fac-14',
    name: 'Quiet Study & Digital Media Accessibility Lab',
    category: 'Library',
    building: 'Green Main Library',
    buildingId: 'bld-main-library',
    coordinates: [37.4273, -122.1690],
    floor: '2nd Floor, Room 210',
    status: 'Operational',
    rating: 98,
    scores: {
      rampQuality: 96,
      elevatorAccess: 98,
      accessibleEntrance: 98,
      washroomAccess: 95,
      signageQuality: 99
    },
    features: ['Screen readers (JAWS & NVDA)', 'Adjustable motorized standing desks', 'Braille embosser and refreshable displays', 'Ergonomic trackballs & joystick inputs', 'High-contrast keyboard stations'],
    description: 'Dedicated assistive tech station with soundproofing and trained accessibility proctors available.',
    lastChecked: '2026-11-07'
  },
  {
    id: 'fac-15',
    name: 'Medical Center Emergency Drop-off & Parking',
    category: 'Parking',
    building: 'Campus Health & Medical Center',
    buildingId: 'bld-medical-center',
    coordinates: [37.4251, -122.1662],
    floor: 'Ground Level Driveway',
    status: 'Operational',
    rating: 96,
    scores: {
      rampQuality: 98,
      elevatorAccess: 95,
      accessibleEntrance: 98,
      washroomAccess: 94,
      signageQuality: 97
    },
    features: ['Direct ambulance & wheelchair taxi bay', 'Completely sheltered from rain/wind', 'Complimentary wheelchair loans at booth', 'Automatic sliding door right beside bay'],
    description: 'Direct accessible vehicle drop-off and emergency response patient transfer.',
    lastChecked: '2026-11-01'
  },
  {
    id: 'fac-16',
    name: 'Engineering Computer Lab Accessible Stations',
    category: 'Wheelchair Accessible Entrance',
    building: 'Terman Engineering Center',
    buildingId: 'bld-engineering',
    coordinates: [37.4285, -122.1704],
    floor: 'Ground Floor, Room 104',
    status: 'Operational',
    rating: 91,
    scores: {
      rampQuality: 90,
      elevatorAccess: 90,
      accessibleEntrance: 94,
      washroomAccess: 88,
      signageQuality: 92
    },
    features: ['4 motorized height adjustable desks', 'Accessible double-width doors', 'Eye-tracking peripherals available', 'Quiet ambient lighting'],
    description: 'Engineering computer workstations custom configured for wheelchair clearance and adaptive peripherals.',
    lastChecked: '2026-10-22'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-1',
    title: 'North Elevator Hydraulic Fluid Leak / Out of Service',
    category: 'Broken elevator',
    building: 'Terman Engineering Center',
    locationDetail: 'North Wing passenger elevator between floors 1 and 2',
    description: 'The elevator display is flashing an error code and the door is locked open. Students using mobility aids cannot reach 2nd floor labs.',
    severity: 'High',
    status: 'Under Review',
    date: '2026-11-08',
    image: null,
    reporter: 'Campus Community Member'
  },
  {
    id: 'rep-2',
    title: 'Construction Scaffolding Blocking Library West Ramp',
    category: 'Blocked ramp',
    building: 'Green Main Library',
    locationDetail: 'West exterior courtyard approach',
    description: 'Temporary painting scaffolding pipes have been placed partially obstructing the turning radius of the ramp.',
    severity: 'Medium',
    status: 'Submitted',
    date: '2026-11-09',
    image: null,
    reporter: 'Student Visitor'
  },
  {
    id: 'rep-3',
    title: 'Push-Button Automatic Door Sensor Unresponsive',
    category: 'Inaccessible entrance',
    building: 'Tressider Student Union',
    locationDetail: 'Main South cafeteria glass doors',
    description: 'The blue accessibility push-pad does not activate the motorized opener. Door requires heavy manual pull force (>15 lbs).',
    severity: 'High',
    status: 'Submitted',
    date: '2026-11-07',
    image: null,
    reporter: 'Faculty Member'
  },
  {
    id: 'rep-4',
    title: 'Uneven Brick Pavers & Tree Root Uplift',
    category: 'Damaged pathway',
    building: 'Humanities & Arts Hall',
    locationDetail: 'Walkway connecting Humanities to Oval green',
    description: 'Large tree roots have lifted brick paving tiles by nearly 2.5 inches, posing a tipping hazard for manual wheelchairs.',
    severity: 'High',
    status: 'Under Review',
    date: '2026-11-04',
    image: null,
    reporter: 'Campus Visitor'
  },
  {
    id: 'rep-5',
    title: 'Missing Tactile Braille Signage on Restroom L3',
    category: 'Missing accessibility signage',
    building: 'Science & Bio-X Complex',
    locationDetail: '3rd Floor South Corridor near Room 312',
    description: 'The door plaque only has printed font with no raised tactile Braille lettering or high-contrast pictogram.',
    severity: 'Low',
    status: 'Resolved',
    date: '2026-10-25',
    image: null,
    reporter: 'Graduate Researcher'
  },
  {
    id: 'rep-6',
    title: 'Restroom Automatic Lock Cylinder Faulty',
    category: 'Accessible Washroom',
    building: 'Green Main Library',
    locationDetail: '2nd Floor Universal Washroom',
    description: 'Electronic occupancy switch fails to show red occupied indicator when locked from the inside.',
    severity: 'Medium',
    status: 'Resolved',
    date: '2026-10-20',
    image: null,
    reporter: 'Library Assistant'
  },
  {
    id: 'rep-7',
    title: 'Bicycle Rack Obstructing Curb Cut',
    category: 'Blocked ramp',
    building: 'Arrillaga Sports & Rec Center',
    locationDetail: 'Sidewalk curb directly opposite accessible parking',
    description: 'Improperly locked scooter and bike chain encroaching over the wheelchair transition ramp slope.',
    severity: 'Medium',
    status: 'Resolved',
    date: '2026-10-18',
    image: null,
    reporter: 'Student'
  },
  {
    id: 'rep-8',
    title: 'Outdoor Ramp Handrail Loose and Wobbly',
    category: 'Damaged pathway',
    building: 'Lakeside Dining Pavilion',
    locationDetail: 'Patio connecting ramp',
    description: 'The middle anchoring bracket of the stainless steel handrail has rusted screws and detaches under hand weight.',
    severity: 'Medium',
    status: 'Under Review',
    date: '2026-11-02',
    image: null,
    reporter: 'Campus Staff'
  }
];

export const ACCESSIBILITY_TIPS = [
  {
    id: 'tip-1',
    title: 'Look for Blue Sensor Pads',
    content: 'Automated entrance doors across campus are activated using low-height (30") or mid-height (48") push-plates positioned beside entry vestibules.'
  },
  {
    id: 'tip-2',
    title: 'Smooth Gradient Route Options',
    content: 'When traversing between Engineering and Lakeside Dining, opting for the Central Quad path avoids the 6% steep ridge near the historic humanities colonnade.'
  },
  {
    id: 'tip-3',
    title: 'Assistive Tech Available in Library 210',
    content: 'Room 210 in the Green Main Library provides height-adjustable motorized desks, screen-reading software, and Braille tactile printers available for all students.'
  },
  {
    id: 'tip-4',
    title: 'Immediate Escort or Barrier Assistance',
    content: 'If an elevator is unexpected out of order, campus dispatch can provide immediate mobility escort service via golf carts equipped with wheelchair ramps.'
  }
];

// Campus Route Graph for Demo Routing Engine
export const CAMPUS_ROUTE_NODES = {
  'bld-main-library': { name: 'Green Main Library', lat: 37.4275, lng: -122.1697 },
  'bld-engineering': { name: 'Terman Engineering Center', lat: 37.4289, lng: -122.1712 },
  'bld-student-union': { name: 'Tressider Student Union', lat: 37.4262, lng: -122.1705 },
  'bld-science-complex': { name: 'Science & Bio-X Complex', lat: 37.4301, lng: -122.1685 },
  'bld-humanities': { name: 'Humanities & Arts Hall', lat: 37.4267, lng: -122.1724 },
  'bld-medical-center': { name: 'Campus Health & Medical Center', lat: 37.4255, lng: -122.1668 },
  'bld-sports-center': { name: 'Arrillaga Sports & Rec Center', lat: 37.4295, lng: -122.1652 },
  'bld-dining-hall': { name: 'Lakeside Dining Pavilion', lat: 37.4248, lng: -122.1718 },
  'node-quad-center': { name: 'Central Campus Quad', lat: 37.4277, lng: -122.1705 },
  'node-plaza-junction': { name: 'Student Plaza Junction', lat: 37.4268, lng: -122.1698 },
  'node-north-corridor': { name: 'North Academic Spine', lat: 37.4295, lng: -122.1699 }
};

export const CAMPUS_ROUTE_EDGES = [
  // from, to, distance(meters), hasStairs, hasRamp, hasElevator, hasTactilePaving, pavedSmooth, coordinates (intermediate polyline)
  {
    from: 'bld-main-library',
    to: 'node-plaza-junction',
    distance: 120,
    hasStairs: false,
    hasRamp: true,
    hasElevator: false,
    hasTactilePaving: true,
    pavedSmooth: true,
    path: [[37.4275, -122.1697], [37.4271, -122.1698], [37.4268, -122.1698]]
  },
  {
    from: 'node-plaza-junction',
    to: 'bld-student-union',
    distance: 110,
    hasStairs: false,
    hasRamp: true,
    hasElevator: false,
    hasTactilePaving: true,
    pavedSmooth: true,
    path: [[37.4268, -122.1698], [37.4265, -122.1702], [37.4262, -122.1705]]
  },
  {
    from: 'bld-main-library',
    to: 'node-quad-center',
    distance: 140,
    hasStairs: false,
    hasRamp: true,
    hasElevator: false,
    hasTactilePaving: true,
    pavedSmooth: true,
    path: [[37.4275, -122.1697], [37.4276, -122.1701], [37.4277, -122.1705]]
  },
  {
    from: 'node-quad-center',
    to: 'bld-engineering',
    distance: 160,
    hasStairs: false,
    hasRamp: true,
    hasElevator: true,
    hasTactilePaving: true,
    pavedSmooth: true,
    path: [[37.4277, -122.1705], [37.4283, -122.1708], [37.4289, -122.1712]]
  },
  {
    from: 'node-quad-center',
    to: 'node-north-corridor',
    distance: 210,
    hasStairs: false,
    hasRamp: true,
    hasElevator: false,
    hasTactilePaving: false,
    pavedSmooth: true,
    path: [[37.4277, -122.1705], [37.4286, -122.1702], [37.4295, -122.1699]]
  },
  {
    from: 'node-north-corridor',
    to: 'bld-science-complex',
    distance: 140,
    hasStairs: false,
    hasRamp: true,
    hasElevator: true,
    hasTactilePaving: true,
    pavedSmooth: true,
    path: [[37.4295, -122.1699], [37.4298, -122.1692], [37.4301, -122.1685]]
  },
  {
    from: 'node-north-corridor',
    to: 'bld-sports-center',
    distance: 380,
    hasStairs: true, // alternative stairs exists
    hasRamp: true,
    hasElevator: false,
    hasTactilePaving: true,
    pavedSmooth: true,
    path: [[37.4295, -122.1699], [37.4296, -122.1675], [37.4295, -122.1652]]
  },
  {
    from: 'node-plaza-junction',
    to: 'bld-medical-center',
    distance: 310,
    hasStairs: false,
    hasRamp: true,
    hasElevator: true,
    hasTactilePaving: true,
    pavedSmooth: true,
    path: [[37.4268, -122.1698], [37.4261, -122.1682], [37.4255, -122.1668]]
  },
  {
    from: 'bld-student-union',
    to: 'bld-dining-hall',
    distance: 190,
    hasStairs: false,
    hasRamp: true,
    hasElevator: false,
    hasTactilePaving: false,
    pavedSmooth: true,
    path: [[37.4262, -122.1705], [37.4255, -122.1712], [37.4248, -122.1718]]
  },
  {
    from: 'node-quad-center',
    to: 'bld-humanities',
    distance: 220,
    hasStairs: true, // historic steps exist, but alternate ramp route available
    hasRamp: true,
    hasElevator: false,
    hasTactilePaving: false,
    pavedSmooth: false, // historic cobblestones
    path: [[37.4277, -122.1705], [37.4272, -122.1715], [37.4267, -122.1724]]
  },
  {
    from: 'bld-humanities',
    to: 'bld-dining-hall',
    distance: 230,
    hasStairs: false,
    hasRamp: true,
    hasElevator: false,
    hasTactilePaving: false,
    pavedSmooth: true,
    path: [[37.4267, -122.1724], [37.4257, -122.1721], [37.4248, -122.1718]]
  },
  {
    from: 'bld-science-complex',
    to: 'bld-sports-center',
    distance: 280,
    hasStairs: false,
    hasRamp: true,
    hasElevator: true,
    hasTactilePaving: true,
    pavedSmooth: true,
    path: [[37.4301, -122.1685], [37.4298, -122.1668], [37.4295, -122.1652]]
  }
];

