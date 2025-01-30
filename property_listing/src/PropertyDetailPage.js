import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PropertyDetailPage = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  const dummyImage = './images/home.jpg';

  useEffect(() => {
    //property id is set here
    const fetchedProperty = properties.find((property) => property.id === id);

    if (fetchedProperty) {
      setProperty(fetchedProperty);
    } else {
      navigate('/');
    }
  }, [id, properties, navigate]);

  //if img is not avlbl dummy image added
  const propertyImage = property?.image_url || dummyImage;

  if (!property) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <div className="mb-4" style={{textAlign: "left"}}>
        <button onClick={() => navigate('/')} className="btn btn-primary"><i class="bi bi-chevron-double-left"></i>Back</button>
      </div>

      <h1 className="text-center mb-4">Property Detail Page</h1>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <img src={propertyImage} alt={property.title} className="img-fluid rounded shadow" />
        </div>
        <div className="col-lg-6 mb-4 text-start">
          <h1 className="h3 font-weight-bold"><i class="bi bi-house-door-fill"></i>  {property.title}</h1>

          <p className="text-muted">{property.location}</p>
          <p className="lead">{property.long_description}</p>
          <p className="h4 text-success font-weight-bold">${property.price.toLocaleString()}</p>
          <p className="text-secondary">{property.description}</p>

          <button onClick={() => alert("just a button logic is not yet implemented")} className="btn btn-success mt-4">Contact Agent</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
