import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Property } from '../types';
import { cn } from '../lib/utils';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, className }) => {
  return (
    <Link 
      to={`/property/${property.id}`}
      className={cn(
        "group block bg-white rounded-2xl overflow-hidden border border-border-subtle transition-all hover:shadow-premium-hover hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            ${property.price.toLocaleString()}
          </span>
        </div>
        {property.isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-1 text-muted text-sm mb-2">
          <MapPin className="w-3 h-3" />
          <span>{property.location.suburb}, {property.location.city}</span>
        </div>
        <h3 className="text-lg font-semibold text-primary mb-4 line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
          <div className="flex items-center gap-4 text-secondary text-sm">
            {property.category === 'House' && (
              <>
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{property.features.beds}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{property.features.baths}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="w-4 h-4" />
                  <span>{property.features.sqft} sqft</span>
                </div>
              </>
            )}
            {property.category === 'Stand' && (
              <>
                <div className="flex items-center gap-1">
                  <Square className="w-4 h-4" />
                  <span>{property.features.sqft} sqft</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span>{property.features.zoning || 'Residential'}</span>
                </div>
              </>
            )}
            {property.category === 'Commercial' && (
              <>
                <div className="flex items-center gap-1">
                  <Square className="w-4 h-4" />
                  <span>{property.features.sqft} sqft</span>
                </div>
                {property.features.rooms && (
                  <div className="flex items-center gap-1 text-xs">
                    <span>{property.features.rooms} Rooms</span>
                  </div>
                )}
              </>
            )}
          </div>
          <span className="text-accent font-semibold text-sm">View Details</span>
        </div>
      </div>
    </Link>
  );
};
