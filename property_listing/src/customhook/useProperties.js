import { useState, useEffect, useRef } from "react";

const useProperties = (searchQuery, locationFilter, priceFilter) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableLocations, setAvailableLocations] = useState([]);
  const debounceTimeout = useRef(null);

  //fetch logic to get data
  const fetchProperties = async (finalSearchQuery, finalLocationFilter, finalPriceFilter) => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/properties?";
      if (finalSearchQuery) url += `q=${encodeURIComponent(finalSearchQuery)}&`;
      if (finalLocationFilter) url += `location=${encodeURIComponent(finalLocationFilter)}&`;

      const response = await fetch(url);
      let data = await response.json();

      setAvailableLocations([...new Set(data.map((p) => p.location))]);

      if (finalPriceFilter) {
        data = data.filter((property) => {
          const price = typeof property.price === "string"
            ? parseInt(property.price.replace(/\D/g, ""), 10)
            : property.price;
          if (finalPriceFilter === "<500k") return price < 500000;
          if (finalPriceFilter === "500k-1M") return price >= 500000 && price <= 1000000;
          if (finalPriceFilter === ">1M") return price > 1000000;
          return true;
        });
      }

      // search query
      if (finalSearchQuery) {
        data = data.filter((property) => {
          const title = property.title.toLowerCase();
          const location = property.location.toLowerCase();
          return title.includes(finalSearchQuery.toLowerCase()) || location.includes(finalSearchQuery.toLowerCase());
        });
      }

      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  //implemented debouncing for api call
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchProperties(searchQuery, locationFilter, priceFilter);
    }, 600);

    //cleanup for component to unmount
    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery, locationFilter, priceFilter]);

  return { properties, loading, availableLocations };
};

export default useProperties;
