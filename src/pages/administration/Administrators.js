import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import Commonheader from "../../components/shared/Commonheader";
import Button from "../../components/shared/Button";
import Plus from "../../components/icons/Plus";
import Mail from "../../components/icons/Mail";
import Emptysuperadmin from "../../components/icons/Emptysuperadmin";
import Invite from "../../components/icons/Invite";
import Emptyadmintable from "../../components/icons/Emptyadmintable";
import User from "../../components/icons/User";
import Close from "../../components/icons/Close";
import Tick from "../../components/icons/Tick";
import Pencil from "../../components/icons/Pencil";
import Delete from "../../components/icons/Delete";
const Administrators = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "super" or "admin"
  const [selectedUser, setSelectedUser] = useState("");
//   const [search, setSearch] = useState("");
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  // === Initialize default data ===
  useEffect(() => {
    const storedSuperAdmins = JSON.parse(localStorage.getItem("superAdmins"));
    const storedAdmins = JSON.parse(localStorage.getItem("admins"));

    if (!storedSuperAdmins || storedSuperAdmins.length === 0) {
      const defaultSuperAdmin = [
        {
          id: 1,
          name: "Melanie Chairman",
          email: "melanie.chairman@company.com",
          role: "Super Admin",
          location: "Toronto",
        },
      ];
      localStorage.setItem("superAdmins", JSON.stringify(defaultSuperAdmin));
      setSuperAdmins(defaultSuperAdmin);
    } else {
      setSuperAdmins(storedSuperAdmins);
    }

    if (storedAdmins) {
      setAdmins(storedAdmins);
    } else {
      localStorage.setItem("admins", JSON.stringify([]));
      setAdmins([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("superAdmins", JSON.stringify(superAdmins));
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [superAdmins, admins]);

  // === Add admin or super admin ===
  const handleAdd = () => {
    if (!selectedUser) return;

    if (modalType === "super") {
      setSuperAdmins([
        ...superAdmins,
        {
          id: Date.now(),
          name: selectedUser,
          email: `${selectedUser.toLowerCase().replace(/\s/g, ".")}@company.com`,
          role: "Super Admin",
        },
      ]);
    } else {
      setAdmins([
        ...admins,
        {
          id: Date.now(),
          name: selectedUser,
          email: `${selectedUser.toLowerCase().replace(/\s/g, ".")}@company.com`,
          status: "Active",
          location: "Toronto",
        },
      ]);
    }

    setModalOpen(false);
    setSelectedUser("");
  };

  const handleDeleteSuperAdmin = (id) => {
    setSuperAdmins(superAdmins.filter((s) => s.id !== id));
  };

  // === Checkbox selection ===
  const toggleSelectAdmin = (id) => {
    if (selectedAdmins.includes(id)) {
      setSelectedAdmins(selectedAdmins.filter((sid) => sid !== id));
    } else {
      setSelectedAdmins([...selectedAdmins, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedAdmins.length === filteredAdmins.length) {
      setSelectedAdmins([]);
    } else {
      setSelectedAdmins(filteredAdmins.map((a) => a.id));
    }
  };

  // === Search filter ===
  const filteredAdmins = admins.filter(
    // (a) =>
    //   a.name.toLowerCase().includes(search.toLowerCase()) ||
    //   a.email.toLowerCase().includes(search.toLowerCase())
  );

  const dummyUsers = [
    "Ruben Passaquinidici Arcand",
    "Chris Smith",
    "Sofia Ramirez",
    "Marcus Schleifer",
  ];

  return (
    <div className="admin-page">
      {/* Page header */}
      <Commonheader
        titleSection={<h2 className="page_heading">Administrators</h2>}
      />

     

      {/* === Super Admins Section === */}
      <div className="super-admins">
        <Button
          variant="solid_btn"
          onClick={() => {
            setModalOpen(true);
            setModalType("super");
          }}
        >
          <span className="icon">
            <Plus />
          </span>
          <span className="txt">Add Super Admin</span>
        </Button>
        <div className="super_admin_wrapper">
            {superAdmins.map((admin) => (
          <div className="card" key={admin.id}>
            <div className="avatar">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" alt="user_img" />
              </div>
              <div className="admin_info">
                <span className="badge">Super Admin</span>
                <h4>{admin.name}</h4>
                <p className="admin_mail">
                    <span className="icon"><Mail /></span>
                    <span className="txt">{admin.email}</span>
                </p>
              </div>
            <div className="actions">
              {/* Edit SVG */}
              <span className="icon">
                <Pencil />
              </span>
              <span className="icon"  onClick={() => handleDeleteSuperAdmin(admin.id)}>
                <Delete />
              </span>
            </div>
          </div>
        ))}
        {/* Always show empty dashed slot for new Super Admin */}
        {superAdmins.length < 2 && (
          <div
            className="card empty_card add-super"
            
          >
            <div className="empty_super_admin_icon">
                <Emptysuperadmin />
            </div>
            <div className="empty_super_admin_content">
                <span className="title">Add super admin</span>
                <Button variant='border_btn' onClick={() => {
              setModalOpen(true);
              setModalType("super");
            }}>
                <span className="icon"><Invite/></span>
                <spna className="txt">Add Super Admin</spna>
                </Button>
            </div>
          </div>
        )}
        </div>

        
      </div>

      {/* === Admin Table Section === */}
      <div className="admin-table">
        <div className="table-header">
          <h3>Administrators</h3>

          <div className="table-controls">
            {/* <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            /> */}
            <Button
            variant="solid_btn"
              onClick={() => {
                setModalOpen(true);
                setModalType("admin");
              }}
            >
              <span className="icon"><Plus /></span>
              <span className="txt">Add admin</span>
            </Button>
          </div>
        </div>

       <div className="admin_list_table">
         <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedAdmins.length === filteredAdmins.length &&
                      filteredAdmins.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Main Location</th>
                <th>Status</th>
              </tr>
            </thead>
           <tbody>
  {filteredAdmins.length === 0 ? (
    <tr>
      <td colSpan="5">
        <div className="empty">
            <span className="icon">
                <Emptyadmintable />
            </span>
          <span className="txt">You're currently the only system administrator.<br />Once other admins are added, they'll appear here.</span>
          <Button variant="border_btn" >
            <span className="icon"><Plus /></span>
            <span className="txt">Add Admin</span>
          </Button>
        </div>
      </td>
    </tr>
  ) : (
    filteredAdmins.map((a) => (
      <tr key={a.id}>
        <td>
          <input
            type="checkbox"
            checked={selectedAdmins.includes(a.id)}
            onChange={() => toggleSelectAdmin(a.id)}
          />
        </td>
        <td><span className="user_name"><User />{a.name}</span></td>
        <td>{a.email}</td>
        <td>{a.location}</td>
        <td>
          <span className="status active">{a.status}</span>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>

       </div>
        
      </div>

     {/* === Add/Edit Modal (Updated Structure) ===
{modalOpen && (
  <div className="dialog-overlay">
    <div className="dialog dialog-small">
      <div className="dialog-header">
        <h3 className="dialog-title">
          {modalType === "super" ? "Add super admin" : "Add administrator"}
        </h3>
        <button
          onClick={() => setModalOpen(false)}
          className="dialog-close"
        >
          
        </button>
      </div>

      <div className="dialog-content">
        <div className="form">
          <div className="form-group">
            <label className="form-label">Select User</label>
            <select
              onChange={(e) => setSelectedUser(e.target.value)}
              value={selectedUser}
              className="form-input"
            >
              <option value="">Select user</option>
              {dummyUsers.map((u, i) => (
                <option key={i} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="dialog-footer">
        <Button
          onClick={() => setModalOpen(false)}
          variant="border_btn"
        >
          <span className="icon"><Close /></span>
          <span className="txt">Cancel</span>
        </Button>

        <Button onClick={handleAdd} variant="solid_btn">
          <span className="icon"><Tick /></span>
          <span className="txt">Save</span>
        </Button>
      </div>
    </div>
  </div>
)} */}

{modalOpen && (
  <div className="dialog-overlay">
    <div className="dialog dialog-small">
      {/* Header */}
      <div className="dialog-header">
        <h3 className="dialog-title">
          {modalType === "super" ? "Add super admin" : "Add administrator"}
        </h3>
        <button
          onClick={() => setModalOpen(false)}
          className="dialog-close"
        >
          <Close />
        </button>
      </div>

      {/* Content */}
      <div className="dialog-content">
        <div className="form">
          <div className="form-group">
            <label className="form-label">Select User</label>
            <Select
              options={dummyUsers.map((u) => ({ label: u, value: u }))}
              values={
                selectedUser
                  ? [{ label: selectedUser, value: selectedUser }]
                  : []
              }
              onChange={(values) => {
                if (values.length > 0) setSelectedUser(values[0].value);
                else setSelectedUser("");
              }}
              placeholder="Select role"
                    // dropdownHandle={false}
                    clearable={false}
              className="add_role_dropdown"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="dialog-footer">
        <Button
          onClick={() => setModalOpen(false)}
          variant="border_btn"
        >
          <span className="icon"><Close /></span>
          <span className="txt">Cancel</span>
        </Button>

        <Button onClick={handleAdd} variant="solid_btn">
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

export default Administrators;
