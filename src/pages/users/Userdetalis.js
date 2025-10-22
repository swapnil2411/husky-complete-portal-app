// import React, { useState } from 'react';
// import {
//   FormControl,Select, MenuItem,Box,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography
// } from '@mui/material';

// import Commonheader from '../../components/shared/Commonheader';
// import Button from '../../components/shared/Button';
// import Invite from '../../components/icons/Invite';
// import Leftangle from '../../components/icons/Leftangle';
// import { useNavigate } from 'react-router-dom';
// import Pencil from '../../components/icons/Pencil';
// import Location from '../../components/icons/Location';
// import Job from '../../components/icons/Job';
// import Earth from '../../components/icons/Earth';
// import Mail from '../../components/icons/Mail';
// import Phone from '../../components/icons/Phone';
// import Plus from '../../components/icons/Plus';
// import Eye from '../../components/icons/Eye';
// import Close from '../../components/icons/Close';
// // import Checkbox from '../../components/shared/Checkbox';
// // import './styles.scss';

// const PlantAccordion = React.memo(({ plant, selectedPlants, onToggle, onParentToggle }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const isParentChecked = plant.children
//     ? plant.children.every(child => selectedPlants.includes(child))
//     : selectedPlants.includes(plant.name);

//   const isParentIndeterminate = plant.children
//     ? plant.children.some(child => selectedPlants.includes(child)) && !isParentChecked
//     : false;

//   const handleParentClick = () => {
//     if (plant.children) {
//       onParentToggle(plant.children, isParentChecked);
//     } else {
//       onToggle(plant.name);
//     }
//   };

//   return (
//     <div className="accordion-item">
//       <div className="accordion-header">
//         {plant.children ? (
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="accordion-toggle"
//             aria-label={isOpen ? "Collapse section" : "Expand section"}
//           >
//             {isOpen ? '↓' : '→'}
//           </button>
//         ) : (
//           <div className="accordion-placeholder" />
//         )}

//         <label className="accordion-label">
//           <div className="checkbox-container">
//             <input
//               type="checkbox"
//               checked={isParentChecked}
//               indeterminate={isParentIndeterminate}
//               onChange={handleParentClick}
//               className="checkbox"
//               id={`plant-${plant.id}`}
//             />
//           </div>
//           <span className="accordion-text" htmlFor={`plant-${plant.id}`}>
//             {plant.name}
//           </span>
//         </label>
//       </div>

//       {plant.children && isOpen && (
//         <div className="accordion-content">
//           {plant.children.map((child, index) => (
//             <div key={`${plant.id}-${child}-${index}`} className="accordion-child">
//               <div className="accordion-placeholder" />
//               <label className="accordion-label">
//                 <input
//                   type="checkbox"
//                   id={`plant-${plant.id}-${child}-${index}`}
//                   checked={selectedPlants.includes(child)}
//                   onChange={() => onToggle(child)}
//                   className="checkbox"
//                 />
//                 <span className="accordion-text" htmlFor={`plant-${plant.id}-${child}-${index}`}>
//                   {child}
//                 </span>
//               </label>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// });

// export default function Userdetails() {
//   const [showEditDialog, setShowEditDialog] = useState(false);
//   const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
//   const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
//   const navigate = useNavigate();

//   const [userInfo, setUserInfo] = useState({
//     name: 'Melanie',
//     surname: 'Chairman',
//     location: 'Toronto, Canada',
//     title: 'VP of Marketing',
//     language: 'English',
//     companyEmail: 'melanie.chairman@abcplastics.com',
//     companyPhone: '+41 1234 567 898',
//     mobilePhone: '+41 1234 567 898',
//     status: 'Active',
//     since: '2025/01/02',
//     lastLogin: '2025/01/02 10:30',
//     avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
//   });

//   const [roles, setRoles] = useState([
//     { role: 'Operator', plants: ['Berlin', 'Lisbon', 'Paris'] },
//     { role: 'Manager', plants: ['Berlin'] },
//   ]);

//   const [newRole, setNewRole] = useState({ role: '', plants: [] });
//   const [deactivateDate, setDeactivateDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const roleOptions = ['Manager', 'Editor', 'Operator', 'Admin', 'Super Admin'];

//   const plantOptions = [
//     { name: 'ABC Plastics - All Locations', id: 'all', children: null },
//     {
//       name: 'Team blue',
//       id: 'team-blue',
//       children: ['Berlin', 'Cairo', 'Paris', 'Toronto'],
//     },
//     {
//       name: 'Team green',
//       id: 'team-green',
//       children: ['Lisbon', 'Paris', 'Vancouver'],
//     },
//   ];

//   const handleEditSave = () => {
//     setShowEditDialog(false);
//   };

//   const handleAddRole = () => {
//     if (
//       newRole.role &&
//       roleOptions.includes(newRole.role) &&
//       newRole.plants.length > 0 &&
//       newRole.plants.every(plant =>
//         plantOptions.some(option =>
//           option.children ? option.children.includes(plant) : option.name === plant
//         )
//       )
//     ) {
//       setRoles([...roles, { ...newRole }]);
//       setNewRole({ role: '', plants: [] });
//       setShowAddRoleDialog(false);
//     } else {
//       alert('Please select a valid role and at least one valid plant.');
//     }
//   };

//   const handleDeactivate = () => {
//     const today = new Date().toISOString().split('T')[0];
//     if (!deactivateDate) {
//       alert('Please select a deactivation start date.');
//       return;
//     }
//     if (deactivateDate < today) {
//       alert('Deactivation date cannot be in the past.');
//       return;
//     }
//     if (endDate && endDate < deactivateDate) {
//       alert('End date must be after the deactivation date.');
//       return;
//     }
//     setShowDeactivateDialog(false);
//     setUserInfo({ ...userInfo, status: 'Inactive' });
//   };

//   const handlePlantToggle = (plant) => {
//     setNewRole(prev => {
//       const plants = [...prev.plants];
//       const index = plants.indexOf(plant);
//       if (index > -1) {
//         plants.splice(index, 1);
//       } else {
//         plants.push(plant);
//       }
//       return { ...prev, plants };
//     });
//   };

//   const handleParentToggle = (children, isCurrentlyChecked) => {
//     setNewRole(prev => {
//       let plants = [...prev.plants];
//       if (isCurrentlyChecked) {
//         plants = plants.filter(p => !children.includes(p));
//       } else {
//         children.forEach(child => {
//           if (!plants.includes(child)) {
//             plants.push(child);
//           }
//         });
//       }
//       return { ...prev, plants };
//     });
//   };

//   return (
//     <div className="user-management">
      
//       <div className="container">
//         <Commonheader
//       backButton={
//         <Button 
//           variant="common_header_back_btn"
//           onClick={() => navigate(-1)}>
//           <Leftangle />
//           <span className='back_txt'>Back</span>
//         </Button>
//       }
//           titleSection={
//             <>
//               <h2 className='page_heading'>Users Profile</h2>
//               <div className='user_details_btn_grp'>
//                 <Button 
//                 variant="border_btn"
//                 onClick={() => setShowDeactivateDialog(true)}
//                 // onClick={() => setIsCreateModalOpen(true)}
//               >
//                 <span className='icon'><Invite /></span>
//                 <span className='txt'>Deactivate User</span>
//               </Button>
//               <Button 
//                 variant="border_btn"
//                 // onClick={() => setIsCreateModalOpen(true)}
//               >
//                 <span className='icon'><Invite /></span>
//                 <span className='txt'>Remove User</span>
//               </Button>
//               </div>
//             </>
//           }
//         />

//         <div className='user_details_content'>
//           {/* Basic Information */}
//         <div className="card basic-info-card">
//           <div className="card-header">
//             <h2 className="subtitle">Basic information</h2>
//             <Button
//               onClick={() => setShowEditDialog(true)}
//               variant="border_btn"
//             >
//               <Pencil />
//               <span className='txt'>Edit information</span>
//             </Button>
//           </div>

//           <div className="user-section">
//             <div className="user-info">
//               <img
//                 src={userInfo.avatar}
//                 alt={`Profile picture of ${userInfo.name} ${userInfo.surname}`}
//                 className="avatar"
//               />
//               <div className='user-activity'>
//                 <h3 className="user-name">
//                   {userInfo.name} {userInfo.surname}
//                 </h3>
//                 <div className="user-status">
//                   <p className='status_sum'>
//                   <span className="status-badge">{userInfo.status}</span>
//                   <span className="status-text"><b>Since</b> {userInfo.since}</span>
//                   </p>
//                   <p className="login_time"><b>Last login</b> {userInfo.lastLogin}</p>
//                 </div>
                
//               </div>
//             </div>
//             <div className='divider'></div>
//             <div className="info-column info-column-one">
//               <div className="info-item">
//                 <div className='info_item_icon'>
//                   <Location />
//                 </div>
//                 <span>{userInfo.location}</span>
//               </div>
//               <div className="info-item">
//                 <div className='info_item_icon'>
//                   <Job />
//                 </div>
//                 <span>{userInfo.title}</span>
//               </div>
//               <div className="info-item">
//                 <div className='info_item_icon'>
//                   <Earth />
//                 </div>
//                 <span>{userInfo.language}</span>
//               </div>
//             </div>
//             <div className="info-column info-column-two">
//               <div className="info-item">
//                 <div className='info_item_icon'>
//                   <Mail />
//                 </div>
//                 <span>{userInfo.companyEmail}</span>
//               </div>
//               <div className="info-item">
//                 <div className='info_item_icon'>
//                   <Phone />
//                 </div>
//                 <span>{userInfo.companyPhone}</span>
//               </div>
//               <div className="info-item">
//                 <div className='info_item_icon'>
//                   <Phone />
//                 </div>
//                 <span>{userInfo.mobilePhone}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Roles */}
//         <div className="roles_card">
//           <div className="roles_card-header">
//             <h2 className="subtitle">Roles</h2>
//             <Button
//               onClick={() => setShowAddRoleDialog(true)}
//               variant="solid_btn"
//             >
//               <span className='icon'><Plus /></span>
//                <span className='txt'>ADD ROLE</span>
//             </Button>
//           </div>

//           <table className="role-table">
//             <thead>
//               <tr className="table-header">
//                 <th>Role</th>
//                 <th>Plant</th>
//               </tr>
//             </thead>
//             <tbody>
//               {roles.map((role, idx) => (
//                 <tr key={idx} className="table-row">
//                   <td>{role.role}</td>
//                   <td>
//                     <div className="plant-tags">
//                       {role.plants.map((plant, i) => (
//                         <span key={i} className="plant-tag">
//                           {plant}
//                         </span>
//                       ))}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Safety Acknowledgement */}
//         <div className="safety_acknowledgement_card">
//           <div className="safety_acknowledgement_card-header">
//             <h2 className="subtitle">Safety Acknowledgement</h2>
//             <Button
//               onClick={() => setShowAddRoleDialog(true)}
//               variant="border_btn"
//             >
//               <span className='icon'><Eye /></span>
//                <span className='txt'>View Summary</span>
//             </Button>
//           </div>

// <table className="safety-table">
//             <tbody>
//               <tr className="table-row">
//                 <td>Date submitted</td>
//                 <td>2025-01-21</td>
//               </tr>
//               <tr className="table-row">
//                 <td>Due next</td>
//                 <td>2027-01-21</td>
//               </tr>
//             </tbody>
//           </table>
          
//         </div>
//         </div>
//       </div>

//       {/* Edit Information Dialog */}
//       {showEditDialog && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <div className="dialog-header">
//               <h3 className="dialog-title">Edit information</h3>
//               <button
//                 onClick={() => setShowEditDialog(false)}
//                 className="dialog-close"
//                 aria-label="Close dialog"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="dialog-content">
//               <div className="dialog-user">
//                 <img
//                   src={userInfo.avatar}
//                   alt={`Profile picture of ${userInfo.name} ${userInfo.surname}`}
//                   className="dialog-avatar"
//                 />
//                 <div className="dialog-actions">
//                   <button className="btn-primary">
//                     ✏️ EDIT
//                   </button>
//                   <button className="btn-secondary">
//                     🗑️ DELETE
//                   </button>
//                 </div>
//               </div>

//               <div className="form">
//                 <div className="form-group">
//                   <label className="form-label required">NAME*</label>
//                   <input
//                     type="text"
//                     value={userInfo.name}
//                     onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
//                     className="form-input"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label required">SURNAME*</label>
//                   <input
//                     type="text"
//                     value={userInfo.surname}
//                     onChange={(e) => setUserInfo({ ...userInfo, surname: e.target.value })}
//                     className="form-input"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">LOCATION</label>
//                   <input
//                     type="text"
//                     value={userInfo.location}
//                     onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
//                     className="form-input"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">TITLE</label>
//                   <input
//                     type="text"
//                     value={userInfo.title}
//                     onChange={(e) => setUserInfo({ ...userInfo, title: e.target.value })}
//                     className="form-input"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label required">COMPANY EMAIL*</label>
//                   <input
//                     type="email"
//                     value={userInfo.companyEmail}
//                     onChange={(e) => setUserInfo({ ...userInfo, companyEmail: e.target.value })}
//                     className="form-input"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">COMPANY PHONE</label>
//                   <input
//                     type="tel"
//                     value={userInfo.companyPhone}
//                     onChange={(e) => setUserInfo({ ...userInfo, companyPhone: e.target.value })}
//                     className="form-input"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">MOBILE PHONE</label>
//                   <input
//                     type="tel"
//                     value={userInfo.mobilePhone}
//                     onChange={(e) => setUserInfo({ ...userInfo, mobilePhone: e.target.value })}
//                     className="form-input"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="dialog-footer">
//               <button
//                 onClick={() => setShowEditDialog(false)}
//                 className="btn-secondary"
//               >
//                 ✕ CANCEL
//               </button>
//               <button
//                 onClick={handleEditSave}
//                 className="btn-primary"
//               >
//                 ✓ CONFIRM
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Role Dialog */}
//       {showAddRoleDialog && (
//         <div className="dialog-overlay">
//           <div className="dialog dialog-small">
//             <div className="dialog-header">
//               <h3 className="dialog-title">Add role</h3>
//               <button
//                 onClick={() => setShowAddRoleDialog(false)}
//                 className="dialog-close"
//                 aria-label="Close dialog"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="dialog-content">
//              <div className="form-group">
//   <label className="form-label required">ROLE*</label>
//   <FormControl fullWidth size="small">
//     <Select
//       value={newRole.role}
//       onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
//       displayEmpty
//       sx={{
//         backgroundColor: '#fff',
//         borderRadius: '6px',
//         fontSize: '14px',
//         '& .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#d1d5db',
//         },
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#9ca3af',
//         },
//         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#1f2937',
//         },
//       }}
//     >
//       <MenuItem value="">
//         <em>Select a role</em>
//       </MenuItem>
//       {roleOptions.map((role) => (
//         <MenuItem key={role} value={role}>
//           {role}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// </div>



//               {/* <div className="form-group">
//                 <label className="form-label required">PLANT*</label>
//                 <div className="accordion-container">
//                   {plantOptions.map(plant => (
//                     <PlantAccordion
//                       key={plant.id}
//                       plant={plant}
//                       selectedPlants={newRole.plants}
//                       onToggle={handlePlantToggle}
//                       onParentToggle={handleParentToggle}
//                     />
//                   ))}
//                 </div>
//               </div> */}
//               <div className="form-group">
//   <label className="form-label required">PLANT*</label>
//   <FormControl fullWidth size="small">
//     <Select
//       value="" // keeps dropdown closed selection neutral
//       displayEmpty
//       renderValue={() =>
//         newRole.plants.length > 0
//           ? `${newRole.plants.length} selected`
//           : 'Select plant(s)'
//       }
//       sx={{
//         backgroundColor: '#fff',
//         borderRadius: '6px',
//         fontSize: '14px',
//         '& .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#d1d5db',
//         },
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#9ca3af',
//         },
//         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#1f2937',
//         },
//       }}
//       MenuProps={{
//         PaperProps: {
//           sx: {
//             maxHeight: 400,
//             width: 350,
//             padding: 1,
//             borderRadius: 2,
//           },
//         },
//       }}
//     >
//       <MenuItem disableRipple disableTouchRipple>
//         <Box sx={{ width: '100%' }}>
//           {plantOptions.map((plant) => (
//             <Accordion
//               key={plant.id}
//               defaultExpanded
//               disableGutters
//               sx={{
//                 backgroundColor: 'transparent',
//                 boxShadow: 'none',
//                 borderBottom: '1px solid #f0f0f0',
//                 '&:before': { display: 'none' },
//                 '&:last-child': { borderBottom: 0 },
//               }}
//             >
//               <AccordionSummary
//                 expandIcon={plant.children ? "+" : null}
//                 sx={{
//                   minHeight: '36px !important',
//                   '& .MuiAccordionSummary-content': {
//                     alignItems: 'center',
//                     margin: 0,
//                   },
//                 }}
//               >
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={
//                         plant.children
//                           ? plant.children.every((child) =>
//                               newRole.plants.includes(child)
//                             )
//                           : newRole.plants.includes(plant.name)
//                       }
//                       indeterminate={
//                         plant.children
//                           ? plant.children.some((child) =>
//                               newRole.plants.includes(child)
//                             ) &&
//                             !plant.children.every((child) =>
//                               newRole.plants.includes(child)
//                             )
//                           : false
//                       }
//                       onChange={() => {
//                         if (plant.children) {
//                           handleParentToggle(
//                             plant.children,
//                             plant.children.every((child) =>
//                               newRole.plants.includes(child)
//                             )
//                           );
//                         } else {
//                           handlePlantToggle(plant.name);
//                         }
//                       }}
//                     />
//                   }
//                   label={<Typography fontSize={14}>{plant.name}</Typography>}
//                 />
//               </AccordionSummary>

//               {plant.children && (
//                 <AccordionDetails sx={{ pl: 4 }}>
//                   <FormGroup>
//                     {plant.children.map((child, i) => (
//                       <FormControlLabel
//                         key={`${plant.id}-${child}-${i}`}
//                         control={
//                           <Checkbox
//                             checked={newRole.plants.includes(child)}
//                             onChange={() => handlePlantToggle(child)}
//                           />
//                         }
//                         label={<Typography fontSize={14}>{child}</Typography>}
//                       />
//                     ))}
//                   </FormGroup>
//                 </AccordionDetails>
//               )}
//             </Accordion>
//           ))}
//         </Box>
//       </MenuItem>
//     </Select>
//   </FormControl>
// </div>


//             </div>

//             <div className="dialog-footer">
//               <button
//                 onClick={() => setShowAddRoleDialog(false)}
//                 className="btn-secondary"
//               >
//                 ✕ CANCEL
//               </button>
//               <button
//                 onClick={handleAddRole}
//                 className="btn-primary"
//               >
//                 ✓ CONFIRM
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Deactivate User Dialog */}
//       {showDeactivateDialog && (
//         <div className="dialog-overlay">
//           <div className="dialog dialog-small">
//             <div className="dialog-header">
//               <h3 className="dialog-title">Do you really want to deactivate this user?</h3>
//               <button
//                 onClick={() => setShowDeactivateDialog(false)}
//                 className="dialog-close"
//                 aria-label="Close dialog"
//               >
//                 <Close />
//               </button>
//             </div>

//             <div className="dialog-content">
//               <p className="dialog-text">
//                 If you deactivate this user, they will no longer have access to Husky Complete and services.
//               </p>
//               <p className="dialog-text">
//                 You can reactivate this user at any time.
//               </p>

//               <div className="form">
//                 <div className="form-group">
//                   <label className="form-label">STARTING</label>
//                   <input
//                     type="date"
//                     value={deactivateDate}
//                     onChange={(e) => setDeactivateDate(e.target.value)}
//                     className="form-input"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">ENDING (OPTIONAL)</label>
//                   <input
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="form-input"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="dialog-footer">
//               <button
//                 onClick={() => setShowDeactivateDialog(false)}
//                 className="btn-secondary"
//               >
//                 ✕ CANCEL
//               </button>
//               <button
//                 onClick={handleDeactivate}
//                 className="btn-primary"
//               >
//                 ✓ CONFIRM
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import Select from "react-dropdown-select";
import Commonheader from "../../components/shared/Commonheader";
import Button from "../../components/shared/Button";
import Invite from "../../components/icons/Invite";
import Leftangle from "../../components/icons/Leftangle";
import { useNavigate } from "react-router-dom";
import Pencil from "../../components/icons/Pencil";
import Location from "../../components/icons/Location";
import Job from "../../components/icons/Job";
import Earth from "../../components/icons/Earth";
import Mail from "../../components/icons/Mail";
import Phone from "../../components/icons/Phone";
import Plus from "../../components/icons/Plus";
import Eye from "../../components/icons/Eye";
import Close from "../../components/icons/Close";
import DownAngle from "../../components/icons/DownAngle";
import Tick from "../../components/icons/Tick";
import Delete from "../../components/icons/Delete";

export default function Userdetails() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "Melanie",
    surname: "Chairman",
    location: "Toronto, Canada",
    title: "VP of Marketing",
    language: "English",
    companyEmail: "melanie.chairman@abcplastics.com",
    companyPhone: "+41 1234 567 898",
    mobilePhone: "+41 1234 567 898",
    status: "Active",
    since: "2025/01/02",
    lastLogin: "2025/01/02 10:30",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  });

  const [roles, setRoles] = useState([
    { role: "Operator", plants: ["Berlin", "Lisbon", "Paris"] },
    { role: "Manager", plants: ["Berlin"] },
  ]);

  const [newRole, setNewRole] = useState({ role: "", plants: [] });
  const [accordionOpen, setAccordionOpen] = useState({});
  const [deactivateDate, setDeactivateDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const roleOptions = [
    { value: "Manager", label: "Manager" },
    { value: "Editor", label: "Editor" },
    { value: "Operator", label: "Operator" },
    { value: "Admin", label: "Admin" },
    { value: "Super Admin", label: "Super Admin" },
  ];

  const plantOptions = [
    {
      name: "Team Blue",
      id: "team-blue",
      children: ["Berlin", "Cairo", "Paris", "Toronto"],
    },
    {
      name: "Team Green",
      id: "team-green",
      children: ["Lisbon", "Paris", "Vancouver"],
    },
  ];

  const handleEditSave = () => setShowEditDialog(false);

  const handleAddRole = () => {
    if (!newRole.role) return alert("Please select a role.");
    if (newRole.plants.length === 0)
      return alert("Please select at least one plant.");
    setRoles([...roles, { ...newRole }]);
    setNewRole({ role: "", plants: [] });
    setShowAddRoleDialog(false);
  };

  const handleDeactivate = () => {
    const today = new Date().toISOString().split("T")[0];
    if (!deactivateDate) return alert("Please select a deactivation start date.");
    if (deactivateDate < today)
      return alert("Deactivation date cannot be in the past.");
    if (endDate && endDate < deactivateDate)
      return alert("End date must be after the deactivation date.");
    setUserInfo({ ...userInfo, status: "Inactive" });
    setShowDeactivateDialog(false);
  };

  const handlePlantToggle = (plant) => {
    setNewRole((prev) => {
      const plants = [...prev.plants];
      const index = plants.indexOf(plant);
      if (index > -1) plants.splice(index, 1);
      else plants.push(plant);
      return { ...prev, plants };
    });
  };

  const handleParentToggle = (children, isChecked) => {
    setNewRole((prev) => {
      let plants = [...prev.plants];
      if (isChecked) plants = plants.filter((p) => !children.includes(p));
      else {
        children.forEach((child) => {
          if (!plants.includes(child)) plants.push(child);
        });
      }
      return { ...prev, plants };
    });
  };

  const handleRemoveUser = () => {
    setShowRemoveDialog(false)
  }

  const toggleAccordion = (id) => {
    setAccordionOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="user-management">
      <div className="container">
        <Commonheader
      backButton={
        <Button 
          variant="common_header_back_btn"
          onClick={() => navigate(-1)}>
          <Leftangle />
          <span className='back_txt'>Back</span>
        </Button>
      }
          titleSection={
            <>
              <h2 className='page_heading'>Users Profile</h2>
              <div className='user_details_btn_grp'>
                <Button 
                variant="border_btn"
                onClick={() => setShowDeactivateDialog(true)}
                // onClick={() => setIsCreateModalOpen(true)}
              >
                <span className='icon'><Invite /></span>
                <span className='txt'>Deactivate User</span>
              </Button>
              <Button 
                variant="border_btn"
                onClick={() => setShowRemoveDialog(true)}
                // onClick={() => setIsCreateModalOpen(true)}
              >
                <span className='icon'><Invite /></span>
                <span className='txt'>Remove User</span>
              </Button>
              </div>
            </>
          }
        />

        <div className='user_details_content'>
          {/* Basic Information */}
        <div className="card basic-info-card">
          <div className="card-header">
            <h2 className="subtitle">Basic information</h2>
            <Button
              onClick={() => setShowEditDialog(true)}
              variant="border_btn"
            >
              <Pencil />
              <span className='txt'>Edit information</span>
            </Button>
          </div>

          <div className="user-section">
            <div className="user-info">
              <img
                src={userInfo.avatar}
                alt={`Profile of ${userInfo.name} ${userInfo.surname}`}
                className="avatar"
              />
              <div className='user-activity'>
                <h3 className="user-name">
                  {userInfo.name} {userInfo.surname}
                </h3>
                <div className="user-status">
                  <p className='status_sum'>
                  <span className="status-badge">{userInfo.status}</span>
                  <span className="status-text"><b>Since</b> {userInfo.since}</span>
                  </p>
                  <p className="login_time"><b>Last login</b> {userInfo.lastLogin}</p>
                </div>
                
              </div>
            </div>
            <div className='divider'></div>
            <div className="info-column info-column-one">
              <div className="info-item">
                <div className='info_item_icon'>
                  <Location />
                </div>
                <span>{userInfo.location}</span>
              </div>
              <div className="info-item">
                <div className='info_item_icon'>
                  <Job />
                </div>
                <span>{userInfo.title}</span>
              </div>
              <div className="info-item">
                <div className='info_item_icon'>
                  <Earth />
                </div>
                <span>{userInfo.language}</span>
              </div>
            </div>
            <div className="info-column info-column-two">
              <div className="info-item">
                <div className='info_item_icon'>
                  <Mail />
                </div>
                <span>{userInfo.companyEmail}</span>
              </div>
              <div className="info-item">
                <div className='info_item_icon'>
                  <Phone />
                </div>
                <span>{userInfo.companyPhone}</span>
              </div>
              <div className="info-item">
                <div className='info_item_icon'>
                  <Phone />
                </div>
                <span>{userInfo.mobilePhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="roles_card">
          <div className="roles_card-header">
            <h2 className="subtitle">Roles</h2>
            <Button
              onClick={() => setShowAddRoleDialog(true)}
              variant="solid_btn"
            >
              <span className='icon'><Plus /></span>
               <span className='txt'>ADD ROLE</span>
            </Button>
          </div>

          <table className="role-table">
            <thead>
              <tr className="table-header">
                <th>Role</th>
                <th>Plant</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, idx) => (
                <tr key={idx} className="table-row">
                  <td>{role.role}</td>
                  <td>
                    <div className="plant-tags">
                      {role.plants.map((plant, i) => (
                        <span key={i} className="plant-tag">
                          {plant}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Safety Acknowledgement */}
        <div className="safety_acknowledgement_card">
          <div className="safety_acknowledgement_card-header">
            <h2 className="subtitle">Safety Acknowledgement</h2>
            <Button
              onClick={() => setShowAddRoleDialog(true)}
              variant="border_btn"
            >
              <span className='icon'><Eye /></span>
               <span className='txt'>View Summary</span>
            </Button>
          </div>

<table className="safety-table">
            <tbody>
              <tr className="table-row">
                <td>Date submitted</td>
                <td>2025-01-21</td>
              </tr>
              <tr className="table-row">
                <td>Due next</td>
                <td>2027-01-21</td>
              </tr>
            </tbody>
          </table>
          
        </div>
        </div>
      </div>

      {/* Edit Information Dialog */}
      {showEditDialog && (
        <div className="dialog-overlay">
          <div className="dialog edit_user_dialog">
            <div className="dialog-header">
              <h3 className="dialog-title">Edit information</h3>
              <button
                onClick={() => setShowEditDialog(false)}
                className="dialog-close"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="dialog-content">
              <div className="dialog-user">
                <img
                  src={userInfo.avatar}
                  alt={`Profile of ${userInfo.name} ${userInfo.surname}`}
                  className="dialog-avatar"
                />
                <div className="dialog-actions">
                  <Button variant="solid_btn">
                    <span className="icon"><Pencil/></span> <span className="txt">EDIT</span>
                  </Button>
                  <Button variant="border_btn">
                    <span className="icon"><Delete /></span> <span className="txt">DELETE</span>
                  </Button>
                </div>
              </div>

              <div className="form">
                <div className="form-group">
                  <label className="form-label required">NAME*</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label required">SURNAME*</label>
                  <input
                    type="text"
                    value={userInfo.surname}
                    onChange={(e) => setUserInfo({ ...userInfo, surname: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">LOCATION</label>
                  <input
                    type="text"
                    value={userInfo.location}
                    onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">TITLE</label>
                  <input
                    type="text"
                    value={userInfo.title}
                    onChange={(e) => setUserInfo({ ...userInfo, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label required">COMPANY EMAIL*</label>
                  <input
                    type="email"
                    value={userInfo.companyEmail}
                    onChange={(e) => setUserInfo({ ...userInfo, companyEmail: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">COMPANY PHONE</label>
                  <input
                    type="tel"
                    value={userInfo.companyPhone}
                    onChange={(e) => setUserInfo({ ...userInfo, companyPhone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">MOBILE PHONE</label>
                  <input
                    type="tel"
                    value={userInfo.mobilePhone}
                    onChange={(e) => setUserInfo({ ...userInfo, mobilePhone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="dialog-footer">
              <Button
                  onClick={() => setShowEditDialog(false)}
                  variant="border_btn"
                >
                  <span className="icon"><Close /></span>
                  <span className="txt">Cancel</span>
                </Button>
                <Button onClick={handleEditSave} variant="solid_btn">
                  <span className="icon"><Tick /></span>
                  <span className="txt">Save</span>
                </Button>
              
            </div>
          </div>
        </div>
      )}

        {/* Add Role Dialog */}
        {showAddRoleDialog && (
          <div className="dialog-overlay">
            <div className="dialog dialog-small">
              <div className="dialog-header">
                <h3 className="dialog-title">Add Role</h3>
                <button
                  onClick={() => setShowAddRoleDialog(false)}
                  className="dialog-close"
                >
                  ✕
                </button>
              </div>

              <div className="dialog-content">
                {/* ROLE DROPDOWN */}
                <div className="form-group">
                  <label className="form-label required">ROLE*</label>
                  <Select
                    className="add_role_dropdown"
                    options={roleOptions}
                    values={
                      newRole.role
                        ? [{ value: newRole.role, label: newRole.role }]
                        : []
                    }
                    onChange={(values) =>
                      setNewRole({
                        ...newRole,
                        role: values[0]?.value || "",
                      })
                    }
                    placeholder="Select role"
                    // dropdownHandle={false}
                    clearable={false}
                  />
                </div>

                {/* PLANT DROPDOWN */}
                <div className="form-group">
                  <label className="form-label required">PLANT*</label>
                  <Select
                    multi
                    className="add_role_dropdown"
                    placeholder={
                      newRole.plants.length > 0
                        ? `${newRole.plants.length} selected`
                        : "Select plant(s)"
                    }
                    searchable={false}
                    closeOnSelect={false}
                    // dropdownHandle={false}
                    values={[]}
                    options={[]}
                    dropdownRenderer={() => (
                      <>
                        {plantOptions.map((plant) => (
                          <div
                            key={plant.id}
                            className="plant_group_accordion"
                          >
                            {/* Parent Row */}
                            <div
                            className="plant_accordion_header"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAccordion(plant.id);
                              }}
                            >
                              {plant.children && (
                                <div className={accordionOpen[plant.id] ? "reverse_angle angle" : "angle"}>
                                  <DownAngle />
                                  
                                </div>
                              )}  
                              <label
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>{plant.name}</span>
                                <input
                                  type="checkbox"
                                  checked={
                                    plant.children
                                      ? plant.children.every((child) =>
                                          newRole.plants.includes(child)
                                        )
                                      : newRole.plants.includes(plant.name)
                                  }
                                  ref={(el) => {
                                    if (el && plant.children) {
                                      const allChecked = plant.children.every(
                                        (child) =>
                                          newRole.plants.includes(child)
                                      );
                                      const someChecked = plant.children.some(
                                        (child) =>
                                          newRole.plants.includes(child)
                                      );
                                      el.indeterminate =
                                        !allChecked && someChecked;
                                    }
                                  }}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    if (plant.children) {
                                      handleParentToggle(
                                        plant.children,
                                        plant.children.every((child) =>
                                          newRole.plants.includes(child)
                                        )
                                      );
                                    } else {
                                      handlePlantToggle(plant.name);
                                    }
                                  }}
                                />
                                
                              </label>
                              
                            </div>

                            {/* Children (collapsible) */}
                            {plant.children && accordionOpen[plant.id] && (
                              <div
                              className="options_list"
                              >
                                {plant.children.map((child, i) => (
                                  <label
                                    key={`${plant.id}-${child}-${i}`}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>{child}</span>
                                    <input
                                      type="checkbox"
                                      checked={newRole.plants.includes(child)}
                                      onChange={() => handlePlantToggle(child)}
                                    />
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="dialog-footer">
                <Button
                  onClick={() => setShowAddRoleDialog(false)}
                  variant="border_btn"
                >
                  <span className="icon"><Close /></span>
                  <span className="txt">Cancel</span>
                </Button>
                <Button onClick={handleAddRole} variant="solid_btn">
                  <span className="icon"><Tick /></span>
                  <span className="txt">Save</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Deactivate User Dialog */}
        {showDeactivateDialog && (
          <div className="dialog-overlay">
            <div className="dialog dialog-small dialog_deactive">
              <div className="dialog-header">
                <h3 className="dialog-title">
                  Do you really want to deactivate this user?
                </h3>
                <button
                  onClick={() => setShowDeactivateDialog(false)}
                  className="dialog-close"
                >
                  <Close />
                </button>
              </div>
              <div className="dialog-content">
                <p className="dialog-text">
                  If you deactivate this user, they will no longer have access to
                  Husky Complete and services.
                </p>
                <p className="dialog-text">
                  You can reactivate this user at any time.
                </p>
                <div className="form">
                  <div className="form-group">
                    <label className="form-label">STARTING</label>
                    <input
                      type="date"
                      value={deactivateDate}
                      onChange={(e) => setDeactivateDate(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ENDING (OPTIONAL)</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
              <div className="dialog-footer">
                <Button
                  onClick={() => setShowDeactivateDialog(false)}
                  variant="border_btn"
                >
                  <span className="icon"><Close /></span>
                  <span className="txt">Cancel</span>
                </Button>
                <Button onClick={handleDeactivate} variant="solid_btn">
                  <span className="icon"><Tick /></span>
                  <span className="txt">Deactivate User</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Deactivate User Dialog */}
        {showRemoveDialog && (
          <div className="dialog-overlay">
            <div className="dialog dialog-small dialog_deactive">
              <div className="dialog-header">
                <h3 className="dialog-title">
                  Do you really want to remove this user?
                </h3>
                <button
                  onClick={() => setShowDeactivateDialog(false)}
                  className="dialog-close"
                >
                  <Close />
                </button>
              </div>
              <div className="dialog-content">
                <p className="dialog-text">
                  If you remove this user, they will be permanently deleted from the Husky system and will lose access to Husky Complete and its services.
                </p>
                <p className="dialog-text">
                  This action is irreversible and the user cannot be reactivated later.
                </p>
              </div>
              <div className="dialog-footer">
                <Button
                  onClick={() => setShowRemoveDialog(false)}
                  variant="border_btn"
                >
                  <span className="icon"><Close /></span>
                  <span className="txt">Cancel</span>
                </Button>
                <Button onClick={handleRemoveUser} variant="solid_btn">
                  <span className="icon"><Tick /></span>
                  <span className="txt">Remove User</span>
                </Button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
