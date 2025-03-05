import React from "react";
import { useState } from "react";


function PlantCard( { name, image, price } ) {
  const [isInStock, setIsInStock] = useState(true);

const plantStockStatus = () => {
  setIsInStock(prevStatus => !prevStatus)
};

  return (
    <li className="card" data-testid="plant-item" >
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button onClick={plantStockStatus} className="primary">In Stock</button>
      ) : (
        <button onClick={plantStockStatus}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
