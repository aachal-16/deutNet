import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useProperties from "./customhook/useProperties";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const debounceTimeout = useRef(null);

  //fetched from custom hook
  const { properties, loading, availableLocations } = useProperties(debouncedSearchQuery, locationFilter, priceFilter);

  // debounce implementation for search bar 
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery]);

  const handleLocationChange = (e) => setLocationFilter(e.target.value);
  const handlePriceChange = (e) => setPriceFilter(e.target.value);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">World's Largest Property Site</h1>

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search by title or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <select
            value={locationFilter}
            onChange={handleLocationChange}
            className="form-select"
          >
            <option value="">All Locations</option>
            {availableLocations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            value={priceFilter}
            onChange={handlePriceChange}
            className="form-select"
          >
            <option value="">All Prices</option>
            <option value="<500k">Below $500k</option>
            <option value="500k-1M">$500k - $1M</option>
            <option value=">1M">Above $1M</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-muted">Loading properties...</p>
      ) : (
        <div className="row">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div className="col-md-4 mb-4" key={property.id}>
                <Link to={`/property/${property.id}`} className="text-decoration-none">
                  <div className="card shadow-sm rounded hover-shadow">
                    <img src={property.image_url} alt={property.title} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{property.title}</h5>
                      <p className="card-text">{property.location}</p>
                      <p className="card-text">{property.short_description}</p>
                      <button className="card-subtitle mb-2 card-price">${property.price.toLocaleString()}</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No properties found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
