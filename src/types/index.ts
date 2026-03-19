export interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    suburb: string;
    city: string;
    address?: string;
  };
  features: {
    // General
    beds: number;
    baths: number;
    sqft: number; // For houses/offices: floor size, For stands: land size
    parking?: number;
    
    // House specific
    lounges?: number;
    kitchen?: boolean;
    diningRoom?: boolean;
    borehole?: boolean;
    swimmingPool?: boolean;
    garden?: boolean;
    furnished?: boolean;
    standSize?: number;
    securityFeatures?: string[];

    // Stand specific
    soilType?: 'Red' | 'Sandy' | 'Black Rock';
    paperworkType?: 'Cession' | 'Title Deeds' | 'Parent Deed' | 'Permit';
    servicingStatus?: 'Fully Serviced' | 'Partially Serviced' | 'Unserviced';
    servicingPercentage?: number;
    electricity?: boolean;
    water?: boolean;
    sewer?: boolean;
    tarredRoads?: boolean;
    readyToBuild?: boolean;
    zoning?: 'Residential' | 'Commercial' | 'Industrial' | 'Agricultural';
    cornerStand?: boolean;

    // Office / Commercial specific
    rooms?: number;
    meetingRooms?: number;
    receptionArea?: boolean;
    kitchenette?: boolean;
    internet?: boolean;
    airConditioning?: boolean;
    backupPower?: boolean;
    elevatorAccess?: boolean;
    buildingGrade?: 'A' | 'B' | 'C';
  };
  images: string[];
  description: string;
  category: 'House' | 'Stand' | 'Commercial';
  type: 'Full house' | 'Apartment' | 'Cottage' | 'Room' | 'Villa' | 'Penthouse' | 'Residential stand' | 'Commercial stand' | 'Office' | 'Shop' | 'Warehouse' | 'Land' | 'House';
  listing_type?: 'Rent' | 'Sale';
  status: 'active' | 'sold' | 'rented';
  isFeatured?: boolean;
  agentId: string;
  createdAt: string;
  viewing_fee?: number;
  terms?: {
    securityDeposit?: number;
    leaseDuration?: string;
    mortgageOrCash?: boolean;
    depositAndInstallments?: boolean;
    minimumDeposit?: number;
    paymentPeriod?: string;
    installmentsActive?: boolean;
  };
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  tagline: string;
  location: string;
  bio: string;
  isPro: boolean;
  isVerified: boolean;
  account_type?: 'Agency' | 'Pro' | 'Standard';
  specialties: string[];
  certifications: string[];
  serviceAreas: string[];
  stories?: Story[];
}

export interface Story {
  id: string;
  imageUrl: string;
  createdAt: string;
}

export interface UpdatePost {
  id: string;
  agentId: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  agentId: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled' | 'viewed';
  createdAt: string;
}
