import React, { useState } from "react";
import "./search-section.css";

export function SearchSection() {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleSearch = () => {
    console.log("Search:", {
      location,
      price,
      propertyType,
    });
  };

  return (
    <>
      <section className="we-search-hero">
        <div className="we-search-icon-wrapper">
          <i className="fa-solid fa-magnifying-glass-location"></i>
        </div>

        <h1 className="we-search-title">
          Find your spot
          <br />
          on the map.
        </h1>

        <p className="we-search-subtitle">
          Search by neighborhood, soil type, or price range to find the perfect stand for your future home.
        </p>
      </section>

      <div className="we-app-wrapper">
        <div className="we-content-align">
          <div className="we-search-card">
            <div className="we-search-primary">
              <div className="we-search-input-wrap">
                <i className="fa-solid fa-location-dot"></i>
                <input
                  type="text"
                  className="we-s-input"
                  placeholder="Streets, address, city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <button 
              className="we-advanced-toggle" 
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              <i className="fa-solid fa-sliders"></i> Advanced Search
            </button>

            <div className={`we-adv-panel ${isAdvancedOpen ? 'active' : ''}`}>
              <div className="we-search-adv-grid">
                <div className="we-search-input-wrap">
                  <i className="fa-solid fa-tag"></i>
                  <input
                    type="text"
                    className="we-s-input"
                    placeholder="$500 - $700k"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="we-search-input-wrap">
                  <i className="fa-solid fa-house-chimney"></i>
                  <select
                    className="we-s-select"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="all">Property Type</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              className="we-search-submit"
              type="button"
              onClick={handleSearch}
            >
              <i className="fa-solid fa-magnifying-glass"></i> Search Properties
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
