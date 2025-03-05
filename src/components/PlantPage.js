import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";
import PlantList from "./PlantList";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await fetch('http://localhost:6001/plants');
      const data = await response.json();
      setPlants(data);
    };

    fetchPlants();
  }, []);

  const addNewPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update search term
  };

  // Filter plants based on the search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant} />
      <Search onSearch={handleSearch} /> {/* Pass the handleSearch function to Search */}
      <PlantList plants={filteredPlants} /> {/* Pass filtered plants */}
    </main>
  );
}

export default PlantPage;
