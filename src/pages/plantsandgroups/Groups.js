// import React, { useState, useEffect, useRef } from "react";
// import Button from "../../components/shared/Button";
// import Plus from "../../components/icons/Plus";

// const dummyPlants = ["Berlin", "Cairo", "Lisbon", "Paris", "Toronto", "Vancouver"];

// const initialGroups = [];

// const initialSuggestedGroups = [
//   { id: 1, title: "Europe", plants: ["Berlin", "Lisbon", "Paris"] },
//   { id: 2, title: "North America", plants: ["Toronto", "Vancouver"] },
// ];

// const Groups = () => {
//   const [groups, setGroups] = useState([]);
//   const [suggestedGroups, setSuggestedGroups] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [groupName, setGroupName] = useState("");
//   const [selectedPlants, setSelectedPlants] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [accordionOpen, setAccordionOpen] = useState(null);
//   const [groupAccordionOpen, setGroupAccordionOpen] = useState(null);
//   const [editingGroupId, setEditingGroupId] = useState(null);
//   const [editPlants, setEditPlants] = useState([]);
//   const [showAddPlantModal, setShowAddPlantModal] = useState(false);
//   const [newPlants, setNewPlants] = useState([]);
//   const dropdownRef = useRef();

//   // Load data from localStorage
//   useEffect(() => {
//     const storedGroups = JSON.parse(localStorage.getItem("groupsData")) || initialGroups;
//     const storedSuggested =
//       JSON.parse(localStorage.getItem("suggestedGroups")) || initialSuggestedGroups;
//     setGroups(storedGroups);
//     setSuggestedGroups(storedSuggested);
//   }, []);

//   // Click outside dropdown
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const saveToStorage = (updatedGroups, updatedSuggested = suggestedGroups) => {
//     localStorage.setItem("groupsData", JSON.stringify(updatedGroups));
//     localStorage.setItem("suggestedGroups", JSON.stringify(updatedSuggested));
//   };

//   // ---------- ADD GROUP ----------
//   const openAddGroupModal = (prefill = null) => {
//     if (prefill) {
//       setGroupName(prefill.title);
//       setSelectedPlants(prefill.plants);
//     } else {
//       setGroupName("");
//       setSelectedPlants([]);
//     }
//     setShowModal(true);
//   };

//   const handleSaveGroup = () => {
//     if (!groupName || selectedPlants.length === 0) {
//       alert("Please enter a group name and select at least one plant.");
//       return;
//     }

//     const newGroup = {
//       id: Date.now(),
//       name: groupName,
//       plants: selectedPlants,
//     };

//     const updatedGroups = [...groups, newGroup];
//     const updatedSuggested = suggestedGroups.filter((g) => g.title !== groupName);

//     setGroups(updatedGroups);
//     setSuggestedGroups(updatedSuggested);
//     saveToStorage(updatedGroups, updatedSuggested);
//     setShowModal(false);
//   };

//   // ---------- DELETE GROUP ----------
//   const handleDeleteGroup = (id) => {
//     const updatedGroups = groups.filter((g) => g.id !== id);
//     setGroups(updatedGroups);
//     saveToStorage(updatedGroups);
//   };

//   // ---------- EDIT GROUP ----------
//   const handleEditGroup = (group) => {
//     setEditingGroupId(group.id);
//     setEditPlants([...group.plants]);
//   };

//   const handleCancelEdit = () => {
//     setEditingGroupId(null);
//     setEditPlants([]);
//   };

//   const handleSaveEdit = () => {
//     const updatedGroups = groups.map((g) => {
//       if (g.id === editingGroupId) {
//         return { ...g, plants: [...editPlants] };
//       }
//       return g;
//     });

//     setGroups(updatedGroups);
//     saveToStorage(updatedGroups);
//     setEditingGroupId(null);
//     setEditPlants([]);
//   };

//   // ---------- ADD PLANT POPUP ----------
//   const handleOpenAddPlantModal = () => {
//     setNewPlants([]);
//     setShowAddPlantModal(true);
//   };

//   const handleSaveNewPlants = () => {
//     if (newPlants.length === 0) {
//       alert("Please select at least one new plant.");
//       return;
//     }

//     const updatedPlantList = [...new Set([...editPlants, ...newPlants])];
//     setEditPlants(updatedPlantList);
//     setShowAddPlantModal(false);
//   };

//   // ---------- REMOVE PLANT ----------
//   const handleRemovePlant = (plant) => {
//     setEditPlants(editPlants.filter((p) => p !== plant));
//   };

//   // ---------- DISMISS SUGGESTED ----------
//   const handleDismissGroup = (id) => {
//     const updated = suggestedGroups.filter((g) => g.id !== id);
//     setSuggestedGroups(updated);
//     saveToStorage(groups, updated);
//   };

//   // ---------- DROPDOWN MULTISELECT ----------
//   const togglePlant = (plant) => {
//     if (selectedPlants.includes(plant)) {
//       setSelectedPlants(selectedPlants.filter((p) => p !== plant));
//     } else {
//       setSelectedPlants([...selectedPlants, plant]);
//     }
//   };

//   const toggleNewPlant = (plant) => {
//     if (newPlants.includes(plant)) {
//       setNewPlants(newPlants.filter((p) => p !== plant));
//     } else {
//       setNewPlants([...newPlants, plant]);
//     }
//   };

//   return (
//     <div className="groups_container">
//       <div className="groups_box">
//         <div className="groups_heading_with_button">
//           <h2>Groups</h2>
//           <Button variant="solid_btn" onClick={() => openAddGroupModal()}>
//             <span className="icon"><Plus /></span>
//             <span className="txt">Add Group</span>
//           </Button>
//         </div>

//         <div className="groups_listing">
//           {groups.length === 0 ? (
//             <p className="empty_group">No groups created yet.</p>
//           ) : (
//             groups.map((group) => (
//               <div className="groups_accordion_wrapper">
//                 <div
//                   onClick={() =>
//                     setGroupAccordionOpen(groupAccordionOpen === group.id ? null : group.id)
//                   }
//                 >
//                   <strong>{group.name}</strong>
//                   <span>{groupAccordionOpen === group.id ? "▲" : "▼"}</span>
//                 </div>

//                 {groupAccordionOpen === group.id && (
//                   <div style={{ marginTop: "6px" }}>
//                     {/* Edit Mode */}
//                     {editingGroupId === group.id ? (
//                       <>
//                         {editPlants.length === 0 ? (
//                           <p>No plants in this group.</p>
//                         ) : (
//                           editPlants.map((plant, i) => (
//                             <div
//                               key={i}
//                               style={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                                 borderBottom: "1px dashed #ddd",
//                                 padding: "4px 0",
//                               }}
//                             >
//                               <span>{plant}</span>
//                               <button onClick={() => handleRemovePlant(plant)}>🗑 Remove</button>
//                             </div>
//                           ))
//                         )}

//                         <button onClick={handleOpenAddPlantModal} style={{ marginTop: "10px" }}>
//                           + Add Plant
//                         </button>

//                         <div style={{ marginTop: "10px" }}>
//                           <button onClick={handleCancelEdit}>Cancel</button>{" "}
//                           <button onClick={handleSaveEdit}>Save</button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         {group.plants.map((plant, i) => (
//                           <p key={i}>{plant}</p>
//                         ))}
//                         <div style={{ marginTop: "10px" }}>
//                           <button onClick={() => handleEditGroup(group)}>Edit Group</button>{" "}
//                           <button onClick={() => handleDeleteGroup(group.id)}>Delete Group</button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* -------- SUGGESTED GROUPS -------- */}
//       <div className="suggested_group_box">
//         <div className="groups_heading_with_button">
//           <h2>Suggested Groups</h2>
//         </div>
//       {suggestedGroups.length === 0 ? (
//         <p>No suggested groups available.</p>
//       ) : (
//         suggestedGroups.map((sg) => (
//           <div
//             key={sg.id}
//             className="suggested_record"
//           >
//             <div>
//               <strong>{sg.title}</strong>
//               <div>
//                 <button onClick={() => openAddGroupModal(sg)}>Add Group</button>{" "}
//                 <button onClick={() => handleDismissGroup(sg.id)}>Dismiss</button>{" "}
//                 <button
//                   onClick={() =>
//                     setAccordionOpen(accordionOpen === sg.id ? null : sg.id)
//                   }
//                 >
//                   {accordionOpen === sg.id ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>
//             {accordionOpen === sg.id && (
//               <div style={{ marginTop: "6px" }}>
//                 {sg.plants.map((p, i) => (
//                   <p key={i}>{p}</p>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       )}
//       </div>

//       {/* -------- ADD GROUP MODAL -------- */}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             backgroundColor: "rgba(0,0,0,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: "20px",
//               borderRadius: "8px",
//               width: "350px",
//             }}
//           >
//             <h4>Add New Group</h4>
//             <div>
//               <label>Group Name*</label>
//               <input
//                 type="text"
//                 value={groupName}
//                 onChange={(e) => setGroupName(e.target.value)}
//                 style={{ width: "100%", marginBottom: "10px" }}
//               />
//             </div>

//             {/* Plants Dropdown */}
//             <div ref={dropdownRef} style={{ marginBottom: "10px" }}>
//               <label>Plants*</label>
//               <div
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 style={{
//                   border: "1px solid #ccc",
//                   padding: "6px",
//                   cursor: "pointer",
//                   position: "relative",
//                 }}
//               >
//                 {selectedPlants.length > 0
//                   ? `${selectedPlants.length} plant(s) selected`
//                   : "Please select at least one plant"}
//               </div>

//               {dropdownOpen && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     background: "#fff",
//                     border: "1px solid #ccc",
//                     marginTop: "2px",
//                     width: "90%",
//                     zIndex: 100,
//                     maxHeight: "150px",
//                     overflowY: "auto",
//                     padding: "6px",
//                   }}
//                 >
//                   {dummyPlants.map((plant) => (
//                     <div key={plant}>
//                       <label>
//                         <input
//                           type="checkbox"
//                           checked={selectedPlants.includes(plant)}
//                           onChange={() => togglePlant(plant)}
//                         />{" "}
//                         {plant}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Chips */}
//             {selectedPlants.length > 0 && (
//               <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
//                 {selectedPlants.map((plant) => (
//                   <div
//                     key={plant}
//                     style={{
//                       border: "1px solid #aaa",
//                       borderRadius: "12px",
//                       padding: "2px 8px",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "4px",
//                     }}
//                   >
//                     <span>{plant}</span>
//                     <button
//                       style={{
//                         border: "none",
//                         background: "transparent",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => togglePlant(plant)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div style={{ textAlign: "right", marginTop: "10px" }}>
//               <button onClick={() => setShowModal(false)}>Cancel</button>{" "}
//               <button onClick={handleSaveGroup}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* -------- ADD PLANT MODAL -------- */}
//       {showAddPlantModal && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             backgroundColor: "rgba(0,0,0,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: "20px",
//               borderRadius: "8px",
//               width: "350px",
//             }}
//           >
//             <h4>Add Plant</h4>

//             {dummyPlants.map((plant) => {
//               const alreadyInGroup = editPlants.includes(plant);
//               return (
//                 <div
//                   key={plant}
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <span>{plant}</span>
//                   {alreadyInGroup ? (
//                     <span>✔️</span>
//                   ) : (
//                     <input
//                       type="checkbox"
//                       checked={newPlants.includes(plant)}
//                       onChange={() => toggleNewPlant(plant)}
//                     />
//                   )}
//                 </div>
//               );
//             })}

//             <div style={{ textAlign: "right", marginTop: "10px" }}>
//               <button onClick={() => setShowAddPlantModal(false)}>Cancel</button>{" "}
//               <button onClick={handleSaveNewPlants}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Groups;

import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/shared/Button";
import Plus from "../../components/icons/Plus";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DownAngle from "../../components/icons/DownAngle";
import Close from "../../components/icons/Close";
import Tick from "../../components/icons/Tick";
import Delete from "../../components/icons/Delete";
import Pencil from "../../components/icons/Pencil";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const dummyPlants = ["Berlin", "Cairo", "Lisbon", "Paris", "Toronto", "Vancouver"];

const initialGroups = [];

const initialSuggestedGroups = [
  { id: 1, title: "Europe", plants: ["Berlin", "Lisbon", "Paris"] },
  { id: 2, title: "North America", plants: ["Toronto", "Vancouver"] },
];

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [suggestedGroups, setSuggestedGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editPlants, setEditPlants] = useState([]);
  const [showAddPlantModal, setShowAddPlantModal] = useState(false);
  const [newPlants, setNewPlants] = useState([]);
  const dropdownRef = useRef();

  // Load data from localStorage
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groupsData")) || initialGroups;
    const storedSuggested =
      JSON.parse(localStorage.getItem("suggestedGroups")) || initialSuggestedGroups;
    setGroups(storedGroups);
    setSuggestedGroups(storedSuggested);
  }, []);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveToStorage = (updatedGroups, updatedSuggested = suggestedGroups) => {
    localStorage.setItem("groupsData", JSON.stringify(updatedGroups));
    localStorage.setItem("suggestedGroups", JSON.stringify(updatedSuggested));
  };

  // ---------- ADD GROUP ----------
  const openAddGroupModal = (prefill = null) => {
    if (prefill) {
      setGroupName(prefill.title);
      setSelectedPlants(prefill.plants);
    } else {
      setGroupName("");
      setSelectedPlants([]);
    }
    setShowModal(true);
  };

  const handleSaveGroup = () => {
    if (!groupName || selectedPlants.length === 0) {
      alert("Please enter a group name and select at least one plant.");
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: groupName,
      plants: selectedPlants,
    };

    const updatedGroups = [...groups, newGroup];
    const updatedSuggested = suggestedGroups.filter((g) => g.title !== groupName);

    setGroups(updatedGroups);
    setSuggestedGroups(updatedSuggested);
    saveToStorage(updatedGroups, updatedSuggested);
    setShowModal(false);
  };

  // ---------- DELETE GROUP ----------
  const handleDeleteGroup = (id) => {
    const updatedGroups = groups.filter((g) => g.id !== id);
    setGroups(updatedGroups);
    saveToStorage(updatedGroups);
  };

  // ---------- EDIT GROUP ----------
  const handleEditGroup = (group) => {
    setEditingGroupId(group.id);
    setEditPlants([...group.plants]);
  };

  const handleCancelEdit = () => {
    setEditingGroupId(null);
    setEditPlants([]);
  };

  const handleSaveEdit = () => {
    const updatedGroups = groups.map((g) => {
      if (g.id === editingGroupId) {
        return { ...g, plants: [...editPlants] };
      }
      return g;
    });

    setGroups(updatedGroups);
    saveToStorage(updatedGroups);
    setEditingGroupId(null);
    setEditPlants([]);
  };

  // ---------- ADD PLANT POPUP ----------
  const handleOpenAddPlantModal = () => {
    setNewPlants([]);
    setShowAddPlantModal(true);
  };

  const handleSaveNewPlants = () => {
    if (newPlants.length === 0) {
      alert("Please select at least one new plant.");
      return;
    }

    const updatedPlantList = [...new Set([...editPlants, ...newPlants])];
    setEditPlants(updatedPlantList);
    setShowAddPlantModal(false);
  };

  // ---------- REMOVE PLANT ----------
  const handleRemovePlant = (plant) => {
    setEditPlants(editPlants.filter((p) => p !== plant));
  };

  // ---------- DISMISS SUGGESTED ----------
  const handleDismissGroup = (id) => {
    const updated = suggestedGroups.filter((g) => g.id !== id);
    setSuggestedGroups(updated);
    saveToStorage(groups, updated);
  };

  // ---------- DROPDOWN MULTISELECT ----------
  const togglePlant = (plant) => {
    if (selectedPlants.includes(plant)) {
      setSelectedPlants(selectedPlants.filter((p) => p !== plant));
    } else {
      setSelectedPlants([...selectedPlants, plant]);
    }
  };

  const toggleNewPlant = (plant) => {
    if (newPlants.includes(plant)) {
      setNewPlants(newPlants.filter((p) => p !== plant));
    } else {
      setNewPlants([...newPlants, plant]);
    }
  };

  return (
    <div className="groups_container">
      {/* ---------- GROUPS SECTION ---------- */}
      <div className="groups_box">
        <div className="groups_heading_with_button">
          <h2>Groups</h2>
          <Button variant="solid_btn" onClick={() => openAddGroupModal()}>
            <span className="icon">
              <Plus />
            </span>
            <span className="txt">Add Group</span>
          </Button>
        </div>

        <div className="groups_listing">
          {groups.length === 0 ? (
            <p className="empty_group">No groups created yet.</p>
          ) : (
            groups.map((group) => (
              <Accordion key={group.id} className="listed_acrrordion">
                <AccordionSummary expandIcon={<DownAngle />}>
                  <span className="accordion_heading">{group.name}</span>
                </AccordionSummary>
                <AccordionDetails>
                  {editingGroupId === group.id ? (
                    <>
                      {editPlants.length === 0 ? (
                        <p>No plants in this group.</p>
                      ) : (
                        editPlants.map((plant, i) => (
                          <p className="plant_name plant_name_with_delete_icon">
                            <span>{plant}</span>
                            <Button variant="borderless_btn" onClick={() => handleRemovePlant(plant)}>
                              <Delete />
                            </Button>
                          </p>
                        ))
                      )}
                      <Button variant="borderless_btn add_plany_in_grp" onClick={handleOpenAddPlantModal}>
                        <span className="icon"><Plus /></span>
                        <span className="txt">Add Plant</span>
                      </Button>
                      <div className="group_action_grp">
                        <Button variant='border_btn' onClick={handleCancelEdit}>
                          <span className="icon"><Close /></span>
                        <span className="txt">Cancel</span>
                        </Button>{" "}
                        <Button variant='solid_btn' onClick={handleSaveEdit}>
                          <span className="icon"><Tick /></span>
                        <span className="txt">Save</span>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {group.plants.map((plant, i) => (
                        <p className="plant_name" key={i}>{plant}</p>
                      ))}
                      <div className="group_action_grp">
                        <Button variant="border_btn" onClick={() => handleDeleteGroup(group.id)}>
                          <span className="icon"><Delete /></span>
                          <span className="txt">Delete Group</span>
                        </Button>
                        <Button variant="border_btn" onClick={() => handleEditGroup(group)}>
                            <span className="icon"><Pencil /></span>
                            <span className="txt">Edit Group</span>
                        </Button>
                      </div>
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </div>
      </div>

      {/* ---------- SUGGESTED GROUPS ---------- */}
      <div className="suggested_group_box">
        <div className="groups_heading_with_button">
          <h2>Suggested Groups</h2>
        </div>
        {suggestedGroups.length === 0 ? (
          <p>No suggested groups available.</p>
        ) : (
          suggestedGroups.map((sg) => (
            <Accordion key={sg.id} className="suggested_group_record">
              <AccordionSummary expandIcon={<DownAngle />}>
                <span className="accordion_title">{sg.title}</span>
                <Button variant="border_btn" onClick={() => openAddGroupModal(sg)}>
                  <span className="icon"><Plus /></span>
                    <span className="txt">Add <span class="group-text">Group</span></span>
                  </Button>{" "}
                  <Button variant="borderless_btn" onClick={() => handleDismissGroup(sg.id)}>
                    <span className="icon"><Close /></span>
                    <span className="txt">Dismiss</span>
                  </Button>
              </AccordionSummary>
              <AccordionDetails>
                {sg.plants.map((p, i) => (
                  <p className="plants_name" key={i}>{p}</p>
                ))}
                <div style={{ marginTop: "10px" }}>
                  
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </div>

     
      {/* {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "350px",
            }}
          >
            <h4>Add New Group</h4>
            <div>
              <label>Group Name*</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>

            <div ref={dropdownRef} style={{ marginBottom: "10px" }}>
              <label>Plants*</label>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  border: "1px solid #ccc",
                  padding: "6px",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {selectedPlants.length > 0
                  ? `${selectedPlants.length} plant(s) selected`
                  : "Please select at least one plant"}
              </div>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    background: "#fff",
                    border: "1px solid #ccc",
                    marginTop: "2px",
                    width: "90%",
                    zIndex: 100,
                    maxHeight: "150px",
                    overflowY: "auto",
                    padding: "6px",
                  }}
                >
                  {dummyPlants.map((plant) => (
                    <div key={plant}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedPlants.includes(plant)}
                          onChange={() => togglePlant(plant)}
                        />{" "}
                        {plant}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedPlants.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {selectedPlants.map((plant) => (
                  <div
                    key={plant}
                    style={{
                      border: "1px solid #aaa",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{plant}</span>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => togglePlant(plant)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ textAlign: "right", marginTop: "10px" }}>
              <button onClick={() => setShowModal(false)}>Cancel</button>{" "}
              <button onClick={handleSaveGroup}>Save</button>
            </div>
          </div>
        </div>
      )}

     
      {showAddPlantModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "350px",
            }}
          >
            <h4>Add Plant</h4>
            {dummyPlants.map((plant) => {
              const alreadyInGroup = editPlants.includes(plant);
              return (
                <div
                  key={plant}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{plant}</span>
                  {alreadyInGroup ? (
                    <span>✔️</span>
                  ) : (
                    <input
                      type="checkbox"
                      checked={newPlants.includes(plant)}
                      onChange={() => toggleNewPlant(plant)}
                    />
                  )}
                </div>
              );
            })}
            <div style={{ textAlign: "right", marginTop: "10px" }}>
              <button onClick={() => setShowAddPlantModal(false)}>Cancel</button>{" "}
              <button onClick={handleSaveNewPlants}>Save</button>
            </div>
          </div>
        </div>
      )} */}

      {/* -------- ADD GROUP MODAL -------- */}
{showModal && (
  <div className="dialog-overlay">
    <div className="dialog dialog-small">
      {/* Header */}
      <div className="dialog-header">
        <h3 className="dialog-title">Add New Group</h3>
        <button
          onClick={() => setShowModal(false)}
          className="dialog-close"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="dialog-content">
        <div className="form-group">
          <label className="form-label required">Group Name*</label>
          <input
            type="text"
            value={groupName}
            placeholder="Enter group name"
            onChange={(e) => setGroupName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group" ref={dropdownRef}>
          <label className="form-label required">Plants*</label>
          <div
            className="custom-select"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedPlants.length > 0
              ? `${selectedPlants.length} plant(s) selected`
              : "Please select at least one plant"}
          </div>

          {dropdownOpen && (
            <div className="custom-dropdown">
              {dummyPlants.map((plant) => (
                <label key={plant} className="dropdown-item">
                  <span>
                  {plant}</span>
                  <input
                    type="checkbox"
                    checked={selectedPlants.includes(plant)}
                    onChange={() => togglePlant(plant)}
                  />
                </label>
              ))}
            </div>
          )}
          {selectedPlants.length > 0 && (
          <div className="chips_wrapper">
            {selectedPlants.map((plant) => (
              <div key={plant} className="chip">
                <span className="chip_plant">{plant}</span>
                <Button
                  variant="borderless_btn"
                  onClick={() => togglePlant(plant)}
                >
                  <Close />
                </Button>
              </div>
            ))}
          </div>
        )}
        </div>

        
      </div>

      {/* Footer */}
      <div className="dialog-footer">
        <Button
          onClick={() => setShowModal(false)}
          variant="border_btn"
        >
          <span className="icon"><Close /></span>
          <span className="txt">Cancel</span>
        </Button>
        <Button onClick={handleSaveGroup} variant="solid_btn">
          <span className="icon"><Tick /></span>
          <span className="txt">Save</span>
        </Button>
      </div>
    </div>
  </div>
)}

{/* -------- ADD PLANT MODAL -------- */}
{/* {showAddPlantModal && (
  <div className="dialog-overlay">
    <div className="dialog dialog-small">
      <div className="dialog-header">
        <h3 className="dialog-title">Add Plant</h3>
        <button
          onClick={() => setShowAddPlantModal(false)}
          className="dialog-close"
        >
          ✕
        </button>
      </div>

      <div className="dialog-content">
        {dummyPlants.map((plant) => {
          const alreadyInGroup = editPlants.includes(plant);
          return (
            <div
              key={plant}
              className="form-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 0",
              }}
            >
              <span>{plant}</span>
              {alreadyInGroup ? (
                <span>✔️</span>
              ) : (
                <input
                  type="checkbox"
                  checked={newPlants.includes(plant)}
                  onChange={() => toggleNewPlant(plant)}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="dialog-footer">
        <Button
          onClick={() => setShowAddPlantModal(false)}
          variant="border_btn"
        >
          <span className="icon"><Close /></span>
          <span className="txt">Cancel</span>
        </Button>
        <Button onClick={handleSaveNewPlants} variant="solid_btn">
          <span className="icon"><Tick /></span>
          <span className="txt">Save</span>
        </Button>
      </div>
    </div>
  </div>
)} */}

{showAddPlantModal && (
  <div className="dialog-overlay">
    <div className="dialog dialog-small">
      {/* Header */}
      <div className="dialog-header">
        <h3 className="dialog-title">Add Plant</h3>
        <button
          onClick={() => setShowAddPlantModal(false)}
          className="dialog-close"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="dialog-content">
        {/* PLANT DROPDOWN */}
        <div className="form-group" ref={dropdownRef}>
          <label className="form-label required">Plants*</label>

          <div
            className="custom-select"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {newPlants.length > 0
              ? `${newPlants.length} plant(s) selected`
              : "Please select plant(s)"}
          </div>

          {dropdownOpen && (
            <div className="custom-dropdown">
              {dummyPlants.map((plant) => {
                const alreadyInGroup = editPlants.includes(plant);
                return (
                  <label key={plant} className="dropdown-item">
                    <span>{plant}</span>
                    {alreadyInGroup ? (
                      <Tick />
                    ) : (
                      <input
                        type="checkbox"
                        checked={newPlants.includes(plant)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleNewPlant(plant);
                        }}
                      />
                    )}
                  </label>
                );
              })}
            </div>
          )}

          {newPlants.length > 0 && (
            <div className="chips_wrapper">
              {newPlants.map((plant) => (
                <div key={plant} className="chip">
                  <span className="chip_plant">{plant}</span>
                  <Button
                    variant="borderless_btn"
                    onClick={() => toggleNewPlant(plant)}
                  >
                    <Close />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="dialog-footer">
        <Button
          onClick={() => setShowAddPlantModal(false)}
          variant="border_btn"
        >
          <span className="icon"><Close /></span>
          <span className="txt">Cancel</span>
        </Button>
        <Button onClick={handleSaveNewPlants} variant="solid_btn">
          <span className="icon"><Tick /></span>
          <span className="txt">Save</span>
        </Button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Groups;

