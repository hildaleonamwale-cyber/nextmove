import React from "react";
import "./hero-and-slider.css";

export function HeroSection() {
  return (
    <section className="we-hero-clean">
        <div className="we-trust-badge">
            <i className="fa-solid fa-circle-check"></i> 
            <span>2500+ Nextmove Properties</span>
        </div>

        <h1 className="we-hero-h1">
            Find your<br/>dream space.
        </h1>

        <p className="we-hero-p">
            Premium residential stands and luxury plots across Harare’s most prestigious neighborhoods. Curated listings and verified title deeds.
        </p>
        
        <div className="we-hero-actions">
            <a href="#enquire" className="we-btn-hero btn-enquire">
                <i className="fa-solid fa-paper-plane"></i> Enquire Now
            </a>
            
            <a href="#valuations" className="we-btn-hero btn-valuation">
                <i className="fa-solid fa-chart-line"></i> Free Valuation
            </a>
        </div>
    </section>
  );
}

export function FeaturedPromoSlider() {
  const promoCards = [
    {
      tag: "Featured",
      image:
        "https://i.pinimg.com/736x/4e/65/3d/4e653d0f65e59c69be6b692415537455.jpg",
      location: "Greystone Park, Harare",
      title: "Luxury Hillside Stands",
      price: "$45",
      unit: "/sqm",
    },
    {
      tag: "Flash Sale",
      image:
        "https://i.pinimg.com/736x/0f/a3/12/0fa312e5ca0465a866c90842d4f931ad.jpg",
      location: "Mt Pleasant Heights",
      title: "Ready to Build",
      price: "$38",
      unit: "/sqm",
    },
    {
      tag: "New Phase",
      image:
        "https://i.pinimg.com/736x/d3/f4/f5/d3f4f5ba0f31fde11bf4032470ea0bd9.jpg",
      location: "Chisipite, Harare",
      title: "The Orchard Estate",
      price: "$55",
      unit: "/sqm",
    },
    {
      tag: "Exclusive",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      location: "Borrowdale Brooke",
      title: "Golf Course Views",
      price: "$65",
      unit: "/sqm",
    },
    {
      tag: "Just Listed",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      location: "Glen Lorne",
      title: "Valley View Plots",
      price: "$42",
      unit: "/sqm",
    }
  ];

  return (
    <div className="we-promo-wrapper">
      <div className="we-full-bleed-carousel">
        <div className="we-promo-carousel-inner">
          {promoCards.map((card, index) => (
            <div className="we-promo-card" key={index}>
              <div className="we-promo-tag">{card.tag}</div>
              <img src={card.image} alt={card.title} />
              <div className="we-promo-glass">
                <span className="we-promo-location">{card.location}</span>
                <div className="we-promo-title">{card.title}</div>
                <div className="we-promo-price">
                  {card.price} <span>{card.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
