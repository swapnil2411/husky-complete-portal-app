import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Commonheader from "../../components/shared/Commonheader";
import Button from "../../components/shared/Button";
import Leftangle from "../../components/icons/Leftangle";
import Search from "../../components/icons/Search";
import Tick from "../../components/icons/Tick";
import Pencil from "../../components/icons/Pencil";
import Delete from "../../components/icons/Delete";
import DownAngle from "../../components/icons/DownAngle";

const permissionsData = [
  {
    group: "Spare Parts",
    permissions: [
      { id: "p1", label: "Order parts", checked: true },
      { id: "p2", label: "See orders", checked: false },
      { id: "p3", label: "Edit orders", checked: false },
      { id: "p4", label: "Cancel orders", checked: false },
    ],
  },
  {
    group: "Maintenance",
    permissions: [
      { id: "p5", label: "Watch videos", checked: true },
      { id: "p6", label: "Access manuals", checked: false },
      { id: "p7", label: "Add & manage bookmarks", checked: false },
    ],
  },
  {
    group: "Advantage+Elite",
    isGrid: true,
    permissions: [
      { id: "p8", label: "View machine list", checked: true },
      { id: "p9", label: "View maintenance logs", checked: true },
      { id: "p10", label: "Configure dashboard layouts", checked: true },
      { id: "p11", label: "View machine status", checked: false },
      { id: "p12", label: "Remotely Start/Stop machine", checked: true },
      { id: "p13", label: "Generate reports", checked: false },
      { id: "p14", label: "View machine parameters", checked: false },
      { id: "p15", label: "Manage production orders", checked: true },
      { id: "p16", label: "Manage user access", checked: false },
    ],
  },
];

const primaryColor = "#1976D2";

const CustomCheckbox = (props) => (
  <Checkbox
    sx={{
      color: "#c9cdd2",
      "&.Mui-checked": { color: primaryColor },
      padding: "4px",
    }}
    {...props}
  />
);

const RoleEditor = () => {
  const { roleName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const roleTitle = location.state?.roleName || roleName || "Custom Role";

  const [permissions, setPermissions] = useState(permissionsData);

  // Toggle individual permission
  const handlePermissionChange = (groupId, permissionId) => {
    setPermissions((prev) =>
      prev.map((group) =>
        group.group === groupId
          ? {
              ...group,
              permissions: group.permissions.map((p) =>
                p.id === permissionId ? { ...p, checked: !p.checked } : p
              ),
            }
          : group
      )
    );
  };

  // Toggle all permissions in a group
  const handleSelectAll = (groupId, checked) => {
    setPermissions((prev) =>
      prev.map((group) =>
        group.group === groupId
          ? {
              ...group,
              permissions: group.permissions.map((p) => ({
                ...p,
                checked,
              })),
            }
          : group
      )
    );
  };

  // ✅ Save role + selected permissions
  const handleSave = () => {
    const existingRoles = JSON.parse(localStorage.getItem("roles")) || [];

    // Extract only checked permissions (labels)
    const selectedPermissions = permissions
      .flatMap((group) => group.permissions)
      .filter((p) => p.checked)
      .map((p) => p.label);

    // Check if role already exists
    const updatedRoles = existingRoles.map((r) =>
      r.role === roleTitle ? { ...r, applications: selectedPermissions } : r
    );

    const roleExists = existingRoles.some((r) => r.role === roleTitle);

    // Add if new
    if (!roleExists) {
      updatedRoles.push({
        role: roleTitle,
        applications: selectedPermissions,
        employees: 0,
      });
    }

    // Save to localStorage
    localStorage.setItem("roles", JSON.stringify(updatedRoles));

    // Go back to Roles page
    navigate("/roles");
  };

  // Styles
  

  const PermissionItem = ({ permission, groupId }) => (
    <FormControlLabel
      control={
        <CustomCheckbox
          checked={permission.checked}
          onChange={() => handlePermissionChange(groupId, permission.id)}
        />
      }
      label={permission.label}
      sx={{ margin: 0 }}
    />
  );

  return (
    <div className="role_details_wrapper">
      <Commonheader
      backButton={
        <Button 
          variant="common_header_back_btn"
          onClick={() => navigate(-1)}>
          <Leftangle />
          <span className='back_txt'>Back to roles</span>
        </Button>
      }
         titleSection={
            <>
                <h2 className="page_heading">{roleTitle}</h2>
                <div className="role_editor_actions">
                  <Button variant="border_btn">
                  <span className="icon"><Pencil/></span>
                    <span className="txt">Rename Role</span>
                  </Button>
                  <Button variant="border_btn">
                    <span className="icon"><Delete /></span>
                    <span className="txt">Remove Role</span>
                  </Button>
                  <Button onClick={handleSave} variant="solid_btn">
                    <span className="icon"><Tick /></span>
                    <span className="txt">Save</span>
                  </Button>
                <div className="role_details_search">
                  
                    <div className="serach_wrapper">
                        <input placeholder="Search permissons" />
                        <span className="search_icon">
                            <Search />
                        </span>
                    </div>
                </div>
                </div>
            </>
         }
        />

      {/* Permission Accordions */}
      <div className="role_services_overview">
         {permissions.map((group) => {
        const isAllChecked = group.permissions.every((p) => p.checked);

        return (
          <Accordion key={group.group} defaultExpanded>
            <AccordionSummary>
              {group.group}
              <span className="accordion_angle">
                        <DownAngle />
                    </span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="all_permission_ribbon">
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      checked={isAllChecked}
                      onChange={(e) =>
                        handleSelectAll(group.group, e.target.checked)
                      }
                    />
                  }
                  label="All permissions"
                />
              </div>

              <div
  className={`permissions_container ${
    group.permissions.length > 4 ? "vertical_grid" : "vertical_list"
  }`}
>
  {group.permissions.map((p) => (
    <PermissionItem key={p.id} permission={p} groupId={group.group} />
  ))}
</div>


            </AccordionDetails>
          </Accordion>
        );
      })}
      </div>
      
    </div>
  );
};

export default RoleEditor;
