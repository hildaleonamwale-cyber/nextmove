import React from "react";
import "./cards.css";

interface PropertyCardProps {
  image: string;
  tag: string;
  price: string;
  title: string;
  location: string;
  beds: string;
  baths: string;
  size: string;
  onClick: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  tag,
  price,
  title,
  location,
  beds,
  baths,
  size,
  onClick,
}) => {
  return (
    <div className="we-card" onClick={onClick}>
      <div
        className="we-img"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <span className="we-tag">{tag}</span>
      </div>

      <div className="we-body">
        <div className="we-price">{price}</div>
        <div className="we-title">{title}</div>
        <div className="we-location">
          <i className="fa-solid fa-location-dot"></i> {location}
        </div>
        <div className="we-icons-row">
          <div className="we-icon-item"><i className="fa-solid fa-bed"></i> <span className="we-service-label">{beds}</span></div>
          <div className="we-icon-item"><i className="fa-solid fa-bath"></i> <span className="we-service-label">{baths}</span></div>
          <div className="we-icon-item"><i className="fa-solid fa-vector-square"></i> <span className="we-service-label">{size}</span></div>
        </div>
      </div>
    </div>
  );
};

interface StandCardProps {
  image: string;
  status: string;
  price: string;
  priceLabel: string;
  title: string;
  location: string;
  specs: { icon: string; text: string }[];
  onClick: () => void;
}

export const StandCard: React.FC<StandCardProps> = ({
  image,
  status,
  price,
  priceLabel,
  title,
  location,
  specs,
  onClick,
}) => {
  return (
    <div className="we-card" onClick={onClick}>
      <div
        className="we-img"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <span className="we-tag">{status}</span>
      </div>

      <div className="we-body">
        <div className="we-price">
          {price} <span style={{fontSize: '12px', color: '#9CA3AF'}}>{priceLabel}</span>
        </div>

        <div className="we-title">{title}</div>

        <div className="we-location">
          <i className="fa-solid fa-location-dot"></i> {location}
        </div>

        <div className="we-icons-row">
          {specs.map((spec, index) => (
            <div className="we-icon-item" key={index}>
              <i className={spec.icon}></i> <span className="we-service-label">{spec.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SoldCardProps {
  image: string;
  price: string;
  title: string;
  location: string;
  agentTag: string;
  soldDate: string;
  onClick: () => void;
}

export const SoldCard: React.FC<SoldCardProps> = ({
  image,
  price,
  title,
  location,
  agentTag,
  soldDate,
  onClick,
}) => {
  return (
    <div className="we-card sold" onClick={onClick}>
      <div
        className="we-img"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="we-sold-overlay">
          <span className="we-sold-banner">Sold</span>
        </div>
      </div>

      <div className="we-body">
        <div className="we-price">{price}</div>
        <div className="we-title">{title}</div>
        <div className="we-location">
          <i className="fa-solid fa-location-dot"></i> {location}
        </div>
        <div className="we-icons-row">
          <div className="we-icon-item">
            <i className="fa-solid fa-user-tie"></i> <span className="we-service-label">{agentTag}</span>
          </div>
          <div className="we-icon-item">
            <span className="we-service-label">{soldDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
