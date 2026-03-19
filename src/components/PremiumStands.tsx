import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandCard } from './cards';
import './PremiumStands.css';

export const PremiumStands: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const stands = [
    {
      id: '4', // Using mock property ID 4 which is a stand
      type: 'gated',
      img: 'https://i.pinimg.com/736x/53/0f/1a/530f1ade4b644c91dfed9d53a072b905.jpg',
      status: 'Title Deeds Ready',
      price: '$45,000',
      priceLabel: 'Full Price',
      title: 'Borrowdale East Phase 2',
      loc: 'Harare North',
      specs: [
        { icon: 'fa-solid fa-ruler-combined', text: '2,000 m²' },
        { icon: 'fa-solid fa-droplet', text: 'Borehole Site' },
        { icon: 'fa-solid fa-road', text: 'Tarred Roads' },
        { icon: 'fa-solid fa-bolt', text: 'ZESA Available' }
      ]
    },
    {
      id: '4',
      type: 'red-soil',
      img: 'https://i.pinimg.com/736x/98/04/69/980469f630d50176a5ac8c663437e632.jpg',
      status: '50% Deposit',
      price: '$28,000',
      priceLabel: 'Installments',
      title: 'Glen Lorne Extension',
      loc: 'Harare North',
      specs: [
        { icon: 'fa-solid fa-ruler-combined', text: '1,200 m²' },
        { icon: 'fa-solid fa-mountain', text: 'Hillside View' },
        { icon: 'fa-solid fa-seedling', text: 'Red Soil' },
        { icon: 'fa-solid fa-shield-halved', text: 'Secure Gated' }
      ]
    },
    {
      id: '4',
      type: 'ceded',
      img: 'https://i.pinimg.com/736x/ac/24/2b/ac242b20bb7872b1b839290d319adc79.jpg',
      status: 'New Release',
      price: '$120,000',
      priceLabel: 'Negotiable',
      title: 'Highlands Luxury Estate',
      loc: 'Harare East',
      specs: [
        { icon: 'fa-solid fa-ruler-combined', text: '4,000 m²' },
        { icon: 'fa-solid fa-file-contract', text: 'Title Deeds' },
        { icon: 'fa-solid fa-tree', text: 'Mature Trees' },
        { icon: 'fa-solid fa-plug', text: 'Solar Ready' }
      ]
    },
    {
      id: '4',
      type: 'red-soil',
      img: 'https://i.pinimg.com/736x/84/38/17/8438172e4fa57040c32c5a62f290dd8a.jpg',
      status: 'Sold Fast',
      price: '$18,000',
      priceLabel: 'Red Soil',
      title: 'Mabelreign Garden Plot',
      loc: 'Mabelreign',
      specs: [
        { icon: 'fa-solid fa-ruler-combined', text: '800 m²' },
        { icon: 'fa-solid fa-droplet', text: 'Well Site' },
        { icon: 'fa-solid fa-road', text: 'Dirt Road' },
        { icon: 'fa-solid fa-bolt', text: 'ZESA Site' }
      ]
    }
  ];

  const filteredStands = stands.filter(stand => filter === 'all' || stand.type === filter);

  return (
    <div className="we-stands-wrapper py-12 bg-white">
      <div className="we-section-header">
        <div className="we-header-text-group">
          <h2>Premium Stands</h2>
          <p>Investment-ready land in prime locations.</p>
        </div>
      </div>

      <div className="we-tab-bleeder">
        <div className="we-pill-tabs">
          <div 
            className={`we-pill ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            <i className="fa-solid fa-earth-africa"></i> All Stands
          </div>
          <div 
            className={`we-pill ${filter === 'red-soil' ? 'active' : ''}`} 
            onClick={() => setFilter('red-soil')}
          >
            <i className="fa-solid fa-mound"></i> Red Soil
          </div>
          <div 
            className={`we-pill ${filter === 'gated' ? 'active' : ''}`} 
            onClick={() => setFilter('gated')}
          >
            <i className="fa-solid fa-shield-halved"></i> Gated Community
          </div>
          <div 
            className={`we-pill ${filter === 'ceded' ? 'active' : ''}`} 
            onClick={() => setFilter('ceded')}
          >
            <i className="fa-solid fa-file-signature"></i> Ceded
          </div>
        </div>
      </div>

      <div className="we-full-bleed-container">
        <div className="we-listings" id="standGrid">
          {filteredStands.map((stand, idx) => (
            <StandCard
              key={idx}
              image={stand.img}
              status={stand.status}
              price={stand.price}
              priceLabel={stand.priceLabel}
              title={stand.title}
              location={stand.loc}
              specs={stand.specs}
              onClick={() => navigate(`/property/${stand.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
