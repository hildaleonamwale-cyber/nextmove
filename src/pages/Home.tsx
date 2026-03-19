import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { PropertyCard, StandCard, SoldCard } from '../components/cards';
import { HeroSection, FeaturedPromoSlider } from '../components/hero-and-slider';
import { SearchSection } from '../components/search-section';
import { PremiumStands } from '../components/PremiumStands';
import { MOCK_PROPERTIES } from '../mockData';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      <HeroSection />
      <FeaturedPromoSlider />
      <SearchSection />

      {/* Latest Listings Grid */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="we-section-header">
          <div className="we-header-text-group">
            <h2>Latest Listings</h2>
            <p>Explore our newest properties across the country, from modern apartments to luxury estates.</p>
          </div>
          <Link to="/listings" className="we-see-all">
            See all listings <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className="we-full-bleed-container">
          <div className="we-listings">
            {MOCK_PROPERTIES.map(property => (
              <PropertyCard 
                key={property.id} 
                image={property.images[0]}
                tag={property.status === 'active' ? 'FOR SALE' : property.status.toUpperCase()}
                price={`$${property.price.toLocaleString()}`}
                title={property.title}
                location={`${property.location.suburb}, ${property.location.city}`}
                beds={`${property.features.beds} Bed`}
                baths={`${property.features.baths} Bath`}
                size={`${property.features.sqft} m²`}
                onClick={() => navigate(`/property/${property.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Stands Section */}
      <PremiumStands />

      {/* Recently Sold Section */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="we-section-header">
          <div className="we-header-text-group">
            <h2>Recently Sold</h2>
            <p>See what's moving in the market.</p>
          </div>
        </div>

        <div className="we-full-bleed-container">
          <div className="we-listings">
            {[
              { id: 1, title: "Luxury Villa, Borrowdale", price: "$1.5M", loc: "Borrowdale Brooke", img: "https://images.unsplash.com/photo-1600566752355-357211b5ff9f?auto=format&fit=crop&w=800&q=80" },
              { id: 2, title: "Modern Highlands Home", price: "$850k", loc: "Highlands, Harare", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
              { id: 3, title: "Chisipite Family Estate", price: "$1.2M", loc: "Chisipite, Harare", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" }
            ].map((sold) => (
              <SoldCard
                key={sold.id}
                image={sold.img}
                price={sold.price}
                title={sold.title}
                location={sold.loc}
                agentTag="Exclusive Deal"
                soldDate="Sold 2 days ago"
                onClick={() => navigate(`/property/1`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Promotion */}
      <section className="py-24 px-[var(--side-margin)]">
        <div className="max-w-7xl mx-auto bg-[#00CFCF] rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A1C1E] mb-5">Sell Your Property with NextMove</h2>
            <p className="text-lg text-[#1A1C1E]/80 mb-8">Join Zimbabwe's most premium real estate network and get your property noticed by the right buyers.</p>
            <Button variant="secondary" size="lg" className="rounded-full bg-white text-[#1A1C1E] hover:bg-gray-100">Get Started Now</Button>
          </div>
          <div className="relative z-10 w-full md:w-1/3 aspect-square bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
            <div className="text-center">
              <span className="text-5xl font-bold text-[#1A1C1E]">10k+</span>
              <p className="text-[#1A1C1E]/60 font-medium text-sm mt-1">Active Buyers</p>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#1A1C1E]/5 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
};
