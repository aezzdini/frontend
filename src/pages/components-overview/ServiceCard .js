import React from "react";
import "./ServiceCard.css"

function ServiceCard({ title, description, icon }) {
  return (
    <div className="service-card">
      {icon && <div className="service-icon">{icon}</div>}
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <button className="service-button">Learn More</button>
    </div>
  );
}

export default ServiceCard;
