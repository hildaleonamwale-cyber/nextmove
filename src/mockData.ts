import { Property, Agent } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Architectural Masterpiece',
    price: 1250000,
    location: { suburb: 'Borrowdale Brooke', city: 'Harare' },
    features: { 
      beds: 5, baths: 4, sqft: 4500, parking: 3,
      lounges: 2, kitchen: true, diningRoom: true, borehole: true,
      swimmingPool: true, garden: true, furnished: false, standSize: 2000,
      securityFeatures: ['Electric Fence', 'CCTV', 'Alarm System']
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Experience the pinnacle of luxury living in this stunning contemporary home. Featuring floor-to-ceiling windows, a private infinity pool, and state-of-the-art smart home integration. The open-concept design seamlessly blends indoor and outdoor spaces, perfect for entertaining.',
    category: 'House',
    type: 'Villa',
    status: 'active',
    isFeatured: true,
    agentId: 'agent-1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Elegant Suburban Retreat',
    price: 850000,
    location: { suburb: 'Glen Lorne', city: 'Harare' },
    features: { 
      beds: 4, baths: 3, sqft: 3200, parking: 2,
      lounges: 1, kitchen: true, diningRoom: true, borehole: true,
      swimmingPool: false, garden: true, furnished: true, standSize: 1500,
      securityFeatures: ['Electric Gate', 'Walled']
    },
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A beautiful family home nestled in the quiet hills of Glen Lorne. This property offers spacious living areas, a lush garden, and breathtaking views of the valley.',
    category: 'House',
    type: 'Full house',
    status: 'active',
    isFeatured: true,
    agentId: 'agent-1',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Luxury Penthouse with City Views',
    price: 450000,
    location: { suburb: 'City Centre', city: 'Bulawayo' },
    features: { 
      beds: 3, baths: 2, sqft: 1800, parking: 1,
      lounges: 1, kitchen: true, diningRoom: true, borehole: false,
      swimmingPool: true, garden: false, furnished: true,
      securityFeatures: ['24/7 Security', 'Access Control']
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Modern living at its finest. This penthouse features high-end finishes, a private balcony, and access to premium building amenities including a gym and rooftop pool.',
    category: 'House',
    type: 'Penthouse',
    status: 'active',
    isFeatured: false,
    agentId: 'agent-2',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Prime Residential Stand',
    price: 45000,
    location: { suburb: 'Glen Lorne', city: 'Harare North' },
    features: { 
      beds: 0, baths: 0, sqft: 2000, soilType: 'Red', paperworkType: 'Parent Deed',
      servicingStatus: 'Partially Serviced', servicingPercentage: 50,
      electricity: true, water: false, sewer: false, tarredRoads: false,
      readyToBuild: false, zoning: 'Residential', cornerStand: true
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A prime residential stand ready for development.',
    category: 'Stand',
    type: 'Residential stand',
    status: 'active',
    agentId: 'agent-1',
    createdAt: new Date().toISOString(),
    terms: {
      installmentsActive: true,
      minimumDeposit: 22500,
      paymentPeriod: '12 Months'
    }
  },
  {
    id: '5',
    title: 'Modern Office Space',
    price: 2500,
    location: { suburb: 'Borrowdale', city: 'Harare' },
    features: { 
      beds: 0, baths: 0, sqft: 150, backupPower: true, internet: true, parking: 5,
      rooms: 3, meetingRooms: 1, receptionArea: true, kitchenette: true,
      airConditioning: true, elevatorAccess: true, buildingGrade: 'A', furnished: false,
      securityFeatures: ['24/7 Security', 'CCTV']
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A modern office space in a prime location.',
    category: 'Commercial',
    type: 'Office',
    listing_type: 'Rent',
    status: 'active',
    agentId: 'agent-1',
    createdAt: new Date().toISOString(),
    viewing_fee: 20
  }
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Sarah Jenkins',
    email: 'sarah@nextmove.com',
    phone: '+263 771 234 567',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    tagline: 'Luxury Property Specialist',
    location: 'Harare, Zimbabwe',
    bio: 'With over 10 years of experience in the luxury real estate market, Sarah has helped hundreds of clients find their dream homes in Harare\'s most exclusive neighborhoods.',
    isPro: true,
    isVerified: true,
    account_type: 'Agency',
    specialties: ['Luxury Villas', 'Investment Properties', 'New Developments'],
    certifications: ['Certified Luxury Home Marketing Specialist', 'REALTOR®'],
    serviceAreas: ['Borrowdale', 'Glen Lorne', 'Mount Pleasant'],
    stories: [
      { id: 's1', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', createdAt: new Date().toISOString() },
      { id: 's2', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', createdAt: new Date().toISOString() }
    ]
  },
  {
    id: 'agent-2',
    name: 'David Moyo',
    email: 'david@nextmove.com',
    phone: '+263 772 987 654',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    tagline: 'Expert Real Estate Consultant',
    location: 'Bulawayo, Zimbabwe',
    bio: 'David is dedicated to providing exceptional service and expert advice to buyers and sellers in Bulawayo.',
    isPro: false,
    isVerified: false,
    account_type: 'Standard',
    specialties: ['Residential Sales', 'Property Management'],
    certifications: ['Professional Practitioner in Real Estate'],
    serviceAreas: ['Suburbs', 'Hillside', 'Burnside']
  }
];
