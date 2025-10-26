import React, { useEffect, useState } from "react";
import Search from "../../components/icons/Search";
import Pencil from "../../components/icons/Pencil";
import Button from "../../components/shared/Button";

const initialPlants = [
  {
    id: 1,
    plantName: "ABC Plastics plant 1",
    shortName: "ABC",
    contracts: ["Advantage+Enterprise", "Advantage+Elite"],
    machines: 14,
    users: 34,
  },
  {
    id: 2,
    plantName: "Cairo",
    shortName: "CAI",
    contracts: ["Advantage+Enterprise", "Advantage+Elite"],
    machines: 27,
    users: 56,
  },
  {
    id: 3,
    plantName: "Lisbon",
    shortName: "",
    contracts: ["Advantage+Enterprise", "Advantage+Elite"],
    machines: 33,
    users: 45,
  },
  {
    id: 4,
    plantName: "Toronto",
    shortName: "TOR",
    contracts: ["Advantage+Enterprise", "Advantage+Elite"],
    machines: 22,
    users: 29,
  },
];

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState({
    id: null,
    plantName: "",
    shortName: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search term state

  // Load data from localStorage or use initial data
  useEffect(() => {
    const storedData = localStorage.getItem("plantsData");
    if (storedData) {
      setPlants(JSON.parse(storedData));
    } else {
      localStorage.setItem("plantsData", JSON.stringify(initialPlants));
      setPlants(initialPlants);
    }
  }, []);

  // Open modal and load selected plant data
  const handleEdit = (plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  // Handle input change in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPlant((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes and update localStorage
  const handleSave = () => {
    const updatedPlants = plants.map((p) =>
      p.id === selectedPlant.id ? selectedPlant : p
    );
    setPlants(updatedPlants);
    localStorage.setItem("plantsData", JSON.stringify(updatedPlants));
    setIsModalOpen(false);
  };

  // Close modal without saving
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ✅ Filter plants based on search
  const filteredPlants = plants.filter(
    (p) =>
      p.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="plants_table_container">
      {/* Heading with search bar beside it */}
      <div className="plants_header_with_search">
        <h2 style={{ margin: 0 }}>Plants</h2>
        <div className="plants_search_wrapper">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="icon"><Search /></span>
        </div>
      </div>

      <div className="plants_table">
        <table>
          <thead>
            <tr>
              <th>Plant Name</th>
              <th>Contracts</th>
              <th>Machines</th>
              <th>Users</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredPlants.length > 0 ? (
              filteredPlants.map((plant) => (
                <tr key={plant.id}>
                  <td>
                    {plant.plantName}
                    {plant.shortName && ` (${plant.shortName})`}
                  </td>
                  <td>
                    <div className="miniBox">
                      {plant.contracts.map((contract, index) => (
                      <span key={index}>
                        {contract}
                      </span>
                    ))}
                    </div>
                  </td>
                  <td>{plant.machines}</td>
                  <td>{plant.users}</td>
                  <td>
                    <Button variant="borderless_btn" onClick={() => handleEdit(plant)}>
                      <Pencil />
                    </Button >
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                  No matching plants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h3>Edit Plant</h3>
            <div>
              <label>Plant Name*</label>
              <input
                type="text"
                name="plantName"
                value={selectedPlant.plantName}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>

            <div>
              <label>Short Name (optional)</label>
              <input
                type="text"
                name="shortName"
                value={selectedPlant.shortName}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "20px" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plants;
