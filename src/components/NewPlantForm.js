import React, { useState } from "react";

function NewPlantForm({ addNewPlant }) {
  const [newPlant, setNewPlant] = useState({
    name: "",
    image: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:6001/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          name: newPlant.name,
          image: newPlant.image,
          price: newPlant.price,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add plant');
      }

      const data = await response.json();

      // Add new plant to parent component's state
      addNewPlant(data);

      // Reset form fields after successful addition
      setNewPlant({
        name: "",
        image: "",
        price: "",
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleAddPlant}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={newPlant.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newPlant.image}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={newPlant.price}
          onChange={handleInputChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
