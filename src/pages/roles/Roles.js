import { FormControlLabel, Switch } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Commonheader from '../../components/shared/Commonheader'
import Button from "../../components/shared/Button";
import Plus from "../../components/icons/Plus"
import Tick from "../../components/icons/Tick";
import Close from "../../components/icons/Close";

const Roles = () => {
  const navigate = useNavigate();

  // 🧠 Load roles from localStorage, or use default list
  const [roles, setRoles] = useState(() => {
    const stored = localStorage.getItem("roles");
    return stored
      ? JSON.parse(stored)
      : [
        {
          role: "Operator",
          applications: ["Spare Parts", "Maintenance", "Advantage+Elite"],
          employees: 123,
        },
        {
          role: "Manager",
          applications: [
            "Spare Parts",
            "Maintenance",
            "Advantage+Elite",
            "Advantage+Enterprise",
          ],
          employees: 12,
        },
        { role: "Editor", applications: ["Spare Parts", "Maintenance"], employees: 10 },
        { role: "Guest", applications: ["Maintenance"], employees: 23 },
      ];
  });

  // 💾 Persist roles to localStorage on change
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  const [advancedMode, setAdvancedMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleNameInput, setRoleNameInput] = useState("");

  const handleAddRoleClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleSave = () => {
    if (!roleNameInput.trim()) return alert("Please enter a role name");

    const newRole = {
      role: roleNameInput.trim(),
      applications: [],
      employees: 0,
    };

    // 🧩 Add role to state
    setRoles((prev) => [...prev, newRole]);
    setIsModalOpen(false);

    // 🚀 Navigate to RoleEditor with role info
    navigate(`/role-editor`, { state: { roleName: roleNameInput.trim() } });
  };

  return (
    <div className="roles_content">
      {/* Modal */}
      {isModalOpen && (
  <div className="dialog-overlay">
    <div className="dialog dialog-small dialog_addrole">
      <div className="dialog-header">
        <h3 className="dialog-title">Add Custom Role</h3>
        <button onClick={handleModalClose} className="dialog-close">
          ✕
        </button>
      </div>

      <div className="dialog-content">
        <div className="form">
          <div className="form-group">
            <label className="form-label">Role Name</label>
            <input
              type="text"
              value={roleNameInput}
              onChange={(e) => setRoleNameInput(e.target.value)}
              placeholder="Enter role name"
              className="form-input"
            />
          </div>
        </div>
      </div>

      <div className="dialog-footer">
        <Button onClick={handleModalClose} variant="border_btn">
          <span className="icon"><Close /></span>
          <span className="txt">Cancel</span>
        </Button>

        <Button
          onClick={handleSave}
          variant="solid_btn"
        >
          <span className="icon"><Tick /></span>
          <span className="txt">Save</span>
        </Button>
      </div>
    </div>
  </div>
)}


      <Commonheader
        titleSection={
          <>
            <h2 className='page_heading'>Roles</h2>
            <FormControlLabel
              className="switch_action"
              control={
                <Switch
                  checked={advancedMode}
                  onChange={(e) => setAdvancedMode(e.target.checked)}
                />
              }
              label={
                <span
                  onClick={(e) => e.stopPropagation()} // Prevents toggle when clicking label
                >
                  Advanced mode
                </span>
              }
            />
          </>
        }
      />
      <div className="roles_table_with_new_role">
        <div className="roles_wrapper">
        <table className="roles_list">
          <thead>
            <tr>
              <th>Role</th>
              <th>Applications</th>
              <th># of Employees</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r, i) => (
              <tr
                key={i}
                onClick={() => navigate(`/role/${r.role}`, { state: { role: r } })}
                style={{ cursor: "pointer" }}
              >
                <td>{r.role}</td>
                <td>
                  <div className="miniBox">
                    {r.applications.length
                      ? r.applications.map((a, j) => <span key={j}>{a}</span>)
                      : "—"}
                  </div>
                </td>
                <td>{r.employees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {advancedMode && (
        <Button
          onClick={handleAddRoleClick}
          variant="borderless_btn"
        >
          <span className="icon">
            <Plus />
          </span>
          <span className="txt">Add Custom Role</span>
        </Button>
      )}
      </div>
      
    </div>
  );
};

export default Roles;
