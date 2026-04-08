export interface Property {
  id: string;
  type: string;
  tag: string;
  tagStyle?: { background: string; color: string };
  featured: boolean;
  image: string;
  price: string;
  priceNum: number;
  title: string;
  location: string;
  icons: { icon?: string; label?: string; text: string }[];
  views: number;
  status: string;
  isSponsored: boolean;
  sponsorDaysLeft: number;
}

export interface User {
  id: string;
  name: string;
  role: string;
  walletBalance: number;
}

export const initialProperties: Property[] = [
  {
      id: '0',
      type: 'residential',
      tag: 'FOR SALE',
      featured: true,
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$850,000",
      priceNum: 850000,
      title: "The Glass Pavilion",
      location: "Borrowdale Brooke",
      icons: [
          { icon: "fa-bed", text: "3 Bed" },
          { icon: "fa-bath", text: "2 Bath" },
          { icon: "fa-vector-square", text: "220 m²" }
      ],
      views: 1240,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '1',
      type: 'residential',
      tag: 'FOR RENT',
      featured: false,
      image: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$2,500/mo",
      priceNum: 2500,
      title: "The Nexus Tower",
      location: "CBD, Harare",
      icons: [
          { icon: "fa-layer-group", text: "Open Plan" },
          { icon: "fa-snowflake", text: "Air Con" },
          { icon: "fa-vector-square", text: "850 m²" }
      ],
      views: 890,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '2',
      type: 'stand',
      tag: 'NEW RELEASE',
      tagStyle: { background: '#1A1C1E', color: '#1FE6D4' },
      featured: false,
      image: "https://i.pinimg.com/736x/98/04/69/980469f630d50176a5ac8c663437e632.jpg",
      price: "$28,000",
      priceNum: 28000,
      title: "Glen Lorne Extension",
      location: "Harare North",
      icons: [
          { icon: "fa-ruler-combined", text: "1200 m²" },
          { icon: "fa-file-signature", text: "Cession" },
          { label: "Service:", text: "60%" }
      ],
      views: 3400,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '3',
      type: 'residential',
      tag: 'FOR SALE',
      featured: false,
      image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$450,000",
      priceNum: 450000,
      title: "Willow Terrace",
      location: "Greendale",
      icons: [
          { icon: "fa-bed", text: "4 Bed" },
          { icon: "fa-bath", text: "3 Bath" },
          { icon: "fa-vector-square", text: "320 m²" }
      ],
      views: 560,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '4',
      type: 'room',
      tag: 'FOR RENT',
      featured: false,
      image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$150/mo",
      priceNum: 150,
      title: "Spacious Room Avondale",
      location: "Avondale",
      icons: [
          { icon: "fa-bed", text: "Private Room" },
          { icon: "fa-bath", text: "Shared Bath" },
          { icon: "fa-door-open", text: "Own Entrance" }
      ],
      views: 450,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '5',
      type: 'stand',
      tag: 'FOR SALE',
      featured: false,
      image: "https://i.pinimg.com/736x/53/0f/1a/530f1ade4b644c91dfed9d53a072b905.jpg",
      price: "$45,000",
      priceNum: 45000,
      title: "Borrowdale East Phase 2",
      location: "Harare North",
      icons: [
          { icon: "fa-ruler-combined", text: "2000 m²" },
          { icon: "fa-file-contract", text: "Title Deed" },
          { label: "Service:", text: "80%" }
      ],
      views: 210,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '6',
      type: 'residential',
      tag: 'FOR SALE',
      featured: false,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$1,200,000",
      priceNum: 1200000,
      title: "Luxury Villa",
      location: "Glen Lorne",
      icons: [
          { icon: "fa-bed", text: "5 Bed" },
          { icon: "fa-bath", text: "4 Bath" },
          { icon: "fa-vector-square", text: "800 m²" }
      ],
      views: 1100,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '7',
      type: 'commercial',
      tag: 'FOR RENT',
      featured: false,
      image: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$3,500/mo",
      priceNum: 3500,
      title: "Commercial Office Space",
      location: "Eastlea",
      icons: [
          { icon: "fa-building", text: "Office" },
          { icon: "fa-car", text: "10 Parking" },
          { icon: "fa-vector-square", text: "450 m²" }
      ],
      views: 800,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '8',
      type: 'commercial',
      tag: 'FOR SALE',
      featured: false,
      image: "https://images.pexels.com/photos/1036371/pexels-photo-1036371.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$150,000",
      priceNum: 150000,
      title: "Retail Shop",
      location: "Avondale Shops",
      icons: [
          { icon: "fa-store", text: "Retail" },
          { icon: "fa-vector-square", text: "120 m²" }
      ],
      views: 320,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '9',
      type: 'residential',
      tag: 'FOR SALE',
      featured: false,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$550,000",
      priceNum: 550000,
      title: "Penthouse Suite",
      location: "Avenues",
      icons: [
          { icon: "fa-bed", text: "3 Bed" },
          { icon: "fa-bath", text: "3 Bath" },
          { icon: "fa-vector-square", text: "250 m²" }
      ],
      views: 2100,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '10',
      type: 'residential',
      tag: 'SOLD',
      featured: false,
      image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$320,000",
      priceNum: 320000,
      title: "Family Home in Mt Pleasant",
      location: "Mt Pleasant",
      icons: [
          { icon: "fa-bed", text: "4 Bed" },
          { icon: "fa-bath", text: "2 Bath" },
          { icon: "fa-vector-square", text: "1500 m²" }
      ],
      views: 4500,
      status: 'Sold',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '11',
      type: 'stand',
      tag: 'SOLD',
      featured: false,
      image: "https://i.pinimg.com/736x/84/38/17/8438172e4fa57040c32c5a62f290dd8a.jpg",
      price: "$18,000",
      priceNum: 18000,
      title: "Mabelreign Garden Plot",
      location: "Mabelreign",
      icons: [
          { icon: "fa-ruler-combined", text: "800 m²" },
          { icon: "fa-file-signature", text: "Cession" },
          { label: "Service:", text: "100%" }
      ],
      views: 1200,
      status: 'Sold',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '12',
      type: 'residential',
      tag: 'SOLD',
      featured: false,
      image: "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$210,000",
      priceNum: 210000,
      title: "Cozy Greendale Cottage",
      location: "Greendale",
      icons: [
          { icon: "fa-bed", text: "2 Bed" },
          { icon: "fa-bath", text: "1 Bath" },
          { icon: "fa-vector-square", text: "800 m²" }
      ],
      views: 3100,
      status: 'Sold',
      isSponsored: false,
      sponsorDaysLeft: 0
  },
  {
      id: '13',
      type: 'residential',
      tag: 'FOR RENT',
      featured: true,
      image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$1,800/mo",
      priceNum: 1800,
      title: "Modern Apartment",
      location: "Newlands",
      icons: [
          { icon: "fa-bed", text: "2 Bed" },
          { icon: "fa-bath", text: "2 Bath" },
          { icon: "fa-vector-square", text: "120 m²" }
      ],
      views: 850,
      status: 'Active',
      isSponsored: true,
      sponsorDaysLeft: 10
  },
  {
      id: '14',
      type: 'stand',
      tag: 'NEW RELEASE',
      tagStyle: { background: '#1A1C1E', color: '#1FE6D4' },
      featured: true,
      image: "https://i.pinimg.com/736x/ac/24/2b/ac242b20bb7872b1b839290d319adc79.jpg",
      price: "$120,000",
      priceNum: 120000,
      title: "Highlands Luxury Estate",
      location: "Harare East",
      icons: [
          { icon: "fa-ruler-combined", text: "4000 m²" },
          { icon: "fa-file-contract", text: "Title Deed" },
          { label: "Service:", text: "100%" }
      ],
      views: 500,
      status: 'Active',
      isSponsored: false,
      sponsorDaysLeft: 0
  }
];

export const initialUsers: User[] = [
  { id: 'u1', name: 'Sarah Jenkins', role: 'admin', walletBalance: 0 },
  { id: 'u2', name: 'John Smith', role: 'premium', walletBalance: 0 },
  { id: 'u3', name: 'Mike Ross', role: 'worker', walletBalance: 0 },
  { id: 'u4', name: 'Jane Doe', role: 'basic', walletBalance: 0 },
];
