import React, { useState } from 'react';
import Commonheader from '../../components/shared/Commonheader'
import Button from '../../components/shared/Button'
import Invite from '../../components/icons/Invite'
import User from '../../components/icons/User';
import EmptyTableIcon from '../../components/icons/EmptyTableIcon';
import Createusermodal from './Createusermodal';
import Errormodal from '../../components/shared/Errormodal';
import { useNavigate } from 'react-router-dom';

// Icon components
const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MapPin = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MoreVertical = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);



const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Bulk Actions Bar Component
// const BulkActionsBar = ({ selectedCount, onAssignPlant, onChangeRole, onAddRole, onDeactivate, onMerge }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <div className="bulk-actions-bar">
//       <div className="bulk-actions-bar__content">
//         <span className="bulk-actions-bar__count">{selectedCount} users selected</span>
        
//         <div className="bulk-actions-bar__actions">
//           <button className="bulk-actions-bar__btn" onClick={onAssignPlant}>
//             <MapPin className="bulk-actions-bar__icon" />
//             ASSIGN NEW PLANT
//           </button>
          
//           <div className="bulk-actions-bar__dropdown">
//             <button 
//               className="bulk-actions-bar__menu-btn"
//               onClick={() => setShowDropdown(!showDropdown)}
//             >
//               <MoreVertical className="bulk-actions-bar__icon" />
//             </button>
            
//             {showDropdown && (
//               <>
//                 <div 
//                   className="bulk-actions-bar__overlay" 
//                   onClick={() => setShowDropdown(false)}
//                 />
//                 <div className="bulk-actions-bar__menu">
//                   <button className="bulk-actions-bar__menu-item" onClick={onChangeRole}>
//                     Change role
//                   </button>
//                   <button className="bulk-actions-bar__menu-item" onClick={onAddRole}>
//                     Add role
//                   </button>
//                   <button className="bulk-actions-bar__menu-item" onClick={onDeactivate}>
//                     Deactivate user
//                   </button>
//                   <button className="bulk-actions-bar__menu-item" onClick={onMerge}>
//                     Merge accounts
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const BulkActionsBar = ({ selectedCount, totalCount, onClearSelection, onAssignPlant, onChangeRole, onAddRole, onDeactivate, onMerge }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const checkboxRef = React.useRef(null);

  React.useEffect(() => {
    if (!checkboxRef.current) return;
    checkboxRef.current.indeterminate = selectedCount > 0 && selectedCount < totalCount;
  }, [selectedCount, totalCount]);

  return (
    <div className="bulk-actions-bar">
      <div className="bulk-actions-bar__content">
        <div className="bulk-actions-bar__left">
          <input
            type="checkbox"
            ref={checkboxRef}
            checked={selectedCount === totalCount && totalCount > 0}
            onChange={onClearSelection}
            className="table__checkbox"
          />
          <span className="bulk-actions-bar__count">
            {selectedCount} users selected
          </span>
        </div>

        <div className="bulk-actions-bar__actions">
          <button className="bulk-actions-bar__btn" onClick={onAssignPlant}>
            <MapPin className="bulk-actions-bar__icon" />
            ASSIGN NEW PLANT
          </button>

          <div className="bulk-actions-bar__dropdown">
            <button
              className="bulk-actions-bar__menu-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreVertical className="bulk-actions-bar__icon" />
            </button>

            {showDropdown && (
              <>
                <div
                  className="bulk-actions-bar__overlay"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="bulk-actions-bar__menu">
                  <button className="bulk-actions-bar__menu-item" onClick={onChangeRole}>
                    Change role
                  </button>
                  <button className="bulk-actions-bar__menu-item" onClick={onAddRole}>
                    Add role
                  </button>
                  <button className="bulk-actions-bar__menu-item" onClick={onDeactivate}>
                    Deactivate user
                  </button>
                  <button className="bulk-actions-bar__menu-item" onClick={onMerge}>
                    Merge accounts
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// Reusable Dropdown Component
const Dropdown = ({ placeholder, options, value, onChange, multiSelect = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter(v => v !== option)
        : [...currentValues, option];
      onChange(newValues);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };

  const isSelected = (option) => {
    if (multiSelect) {
      return Array.isArray(value) && value.includes(option);
    }
    return value === option;
  };

  const getDisplayText = () => {
    if (multiSelect) {
      if (!value || value.length === 0) return placeholder;
      if (value.length === 1) return value[0];
      return `${value.length} selected`;
    }
    return value || placeholder;
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange(multiSelect ? [] : '');
  };

  const hasSelection = multiSelect ? (value && value.length > 0) : value;

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`dropdown__button ${hasSelection ? 'has-selection' : ''}`}
      >
        <span className="dropdown__text">{getDisplayText()}</span>
        <div className="dropdown__actions">
          {hasSelection && (
            <span onClick={clearSelection} className="dropdown__clear">×</span>
          )}
          <ChevronDown className={`dropdown__icon ${isOpen ? 'open' : ''}`} />
        </div>
      </button>
      {isOpen && (
        <>
          <div className="dropdown__overlay" onClick={() => setIsOpen(false)} />
          <div className="dropdown__menu">
            {multiSelect && (
              <div className="dropdown__menu-header">Select multiple options</div>
            )}
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`dropdown__item ${isSelected(option) ? 'selected' : ''}`}
              >
                {multiSelect && (
                  <input
                    type="checkbox"
                    checked={isSelected(option)}
                    onChange={() => {}}
                    className="dropdown__checkbox"
                  />
                )}
                <span className="dropdown__item-text">{option}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Badge component
const BadgeGroup = ({ items, type = 'role' }) => {
  if (!items || items.length === 0) return null;

  const getBadgeClass = (item) => {
    if (type !== 'role') return `badge badge--${type}`;
    switch (item) {
      case 'Super Admin':
        return 'badge badge--super-admin';
      case 'Admin':
        return 'badge badge--admin';
      case 'Operator':
      case 'Editor':
        return 'badge badge--operator-editor';
      default:
        return 'badge badge--role';
    }
  };

  const displayItem = items[0];
  const remaining = items.length - 1;

  return (
    <div className="badge-group">
      <span className={getBadgeClass(displayItem)}>{displayItem}</span>
      {remaining > 0 && (
        <span className={`badge badge--count ${type === 'plant' ? 'plant-count' : ''}`}>+{remaining}</span>
      )}
    </div>
  );
};

// Empty State Component
const EmptyState = ({ activeFilter }) => {
  const getEmptyMessage = () => {
    switch(activeFilter) {
      case 'Pending':
        return {
          title: 'There are no pending invitations. Great!',
          showButton: false
        };
      case 'Active':
        return {
          title: 'There are no active users.',
          showButton: false
        };
      case 'Inactive':
        return {
          title: 'There are no inactive users.',
          showButton: false
        };
      default:
        return {
          title: "We couldn't find any matches for your search.",
          showButton: false
        };
    }
  };

  const message = getEmptyMessage();

  return (
    <div className="empty-state">
      <div className="empty-state__content">
        <div className="empty-state__icon">
          <EmptyTableIcon />
        </div>
        <p className="empty-state__title">{message.title}</p>
        {message.description && (
          <p className="empty-state__description">{message.description}</p>
        )}
      </div>
    </div>
  );
};

const Table = ({ columns, data, onRowSelect, activeFilter }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const toggleRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    onRowSelect?.(Array.from(newSelected));
  };

  const toggleAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const allIds = new Set(data.map(item => item.id));
      setSelectedRows(allIds);
      onRowSelect?.(Array.from(allIds));
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          <tr>
            <th className="table__th table__th--checkbox">
              <input
                type="checkbox"
                checked={data.length > 0 && selectedRows.size === data.length}
                onChange={toggleAll}
                className="table__checkbox"
              />
            </th>
            {columns.map((col, index) => (
              <th key={index} className="table__th">
                <div className="table__th-content">
                  {col.header}
                  {col.sortable && <ChevronDown className="table__sort-icon" />}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="table__body">
          {data.length === 0 ? (
            <tr>
              <td className='empty_cell'>
                <EmptyState activeFilter={activeFilter} />
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="table__row">
                <td className="table__td">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    className="table__checkbox"
                  />
                </td>
                {columns.map((col, index) => (
                  <td key={index} className="table__td">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Main Component
const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState([]);
  const [plantFilter, setPlantFilter] = useState([]);
  const [serviceFilter, setServiceFilter] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  

const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: 'Melanie Chairman',
      email: 'melanie.chairman@company.com',
      roles: ['Super Admin', 'Admin'],
      plants: ['Toronto', 'Vancouver'],
      lastLogin: '2025-01-12, 16:29',
      status: 'Active'
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@company.com',
      roles: ['Admin', 'Manager', 'User'],
      plants: ['New York', 'Boston', 'Chicago'],
      lastLogin: '2025-01-10, 14:22',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      roles: ['User'],
      plants: ['Chicago'],
      lastLogin: '2024-12-28, 09:15',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      roles: ['User', 'Viewer'],
      plants: ['Boston'],
      lastLogin: '2024-11-15, 18:45',
      status: 'Pending'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeFilter === 'All' || user.status === activeFilter;
    const matchesRole = roleFilter.length === 0 || user.roles.some(role => roleFilter.includes(role));
    const matchesPlant = plantFilter.length === 0 || user.plants.some(plant => plantFilter.includes(plant));
    
    return matchesSearch && matchesStatus && matchesRole && matchesPlant;
  });

  const handleRowSelect = (selectedIds) => {
    setSelectedUsers(selectedIds);
  };

  const handleAssignPlant = () => {
    console.log('Assign plant to users:', selectedUsers);
  };

  const handleChangeRole = () => {
    console.log('Change role for users:', selectedUsers);
  };

  const handleAddRole = () => {
    console.log('Add role to users:', selectedUsers);
  };

  const handleDeactivate = () => {
    console.log('Deactivate users:', selectedUsers);
  };

  const handleMergeAccounts = () => {
    console.log('Merge accounts:', selectedUsers);
  };

  const handleCreateUser = (formData) => {
    // // Simulate API call
    // const success = Math.random() > 0.5; // 50% chance of success for demo
    
    // if (success) {
    //   console.log('User created:', formData);
    //   // Add user to list or refresh data
    //   setIsCreateModalOpen(false);
    // } else {
    //   // Show error modal
    //   setIsCreateModalOpen(false);
    //   setErrorMessage("We couldn't complete your action, please try again. If this problem persists, please contact support.");
    //   setIsErrorModalOpen(true);
    // }

    setIsCreateModalOpen(false);
  setErrorMessage("We couldn't complete your action, please try again. If this problem persists, please contact support.");
  setIsErrorModalOpen(true);
  };

  const columns = [
    {
  header: 'Name',
  accessor: 'name',
  sortable: true,
  render: (row) => (
    <div 
      className="user-name cursor-pointer" 
      onClick={() => navigate(`/users/${row.id}`)}
      style={{ cursor: 'pointer', color: '#2563eb' }} // optional blue clickable text
    >
      <div className="user-avatar">
        <User />
      </div>
      <span>{row.name}</span>
    </div>
  )
},
    { 
      header: 'Email', 
      accessor: 'email',
      sortable: true
    },
    {
      header: 'Roles',
      accessor: 'roles',
      sortable: true,
      render: (row) => <BadgeGroup items={row.roles} type="role" />
    },
    {
      header: 'Plants',
      accessor: 'plants',
      sortable: true,
      render: (row) => <BadgeGroup items={row.plants} type="plant" />
    },
    { 
      header: 'Last login', 
      accessor: 'lastLogin',
      sortable: true
    },
    {
      header: 'Status',
      accessor: 'status',
      sortable: true,
      render: (row) => (
        <span className={`status-badge status-badge--${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="user-management">
      <div className="container">
        <Commonheader
          titleSection={
            <>
              <h2 className='page_heading'>Users</h2>
              <Button 
                variant="solid_btn"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <span className='icon'><Invite /></span>
                <span className='txt'>Create User</span>
              </Button>
            </>
          }
        />

        <div className='page_toolbar'>
          <div className="filters">
            <Dropdown
              placeholder="Select roles"
              options={['Super Admin', 'Admin', 'Manager', 'User', 'Viewer']}
              value={roleFilter}
              onChange={setRoleFilter}
              multiSelect={true}
            />
            <Dropdown
              placeholder="Select plants"
              options={['Toronto', 'Vancouver', 'New York', 'Chicago', 'Boston', 'Seattle']}
              value={plantFilter}
              onChange={setPlantFilter}
              multiSelect={true}
            />
            <Dropdown
              placeholder="Select service"
              options={['Service A', 'Service B', 'Service C']}
              value={serviceFilter}
              onChange={setServiceFilter}
              multiSelect={true}
            />
          </div>

          <div className="action-bar">
            <div className="filter-buttons">
              {['All', 'Active', 'Pending', 'Inactive'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="action-bar__right">
              <div className="search-box">
                <Search className="search-box__icon" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-box__input"
                />
              </div>
            </div>
          </div>
        </div>
<div className='overlap_header_table'>
  {/* {selectedUsers.length > 0 && (
          <BulkActionsBar 
            selectedCount={selectedUsers.length}
            onAssignPlant={handleAssignPlant}
            onChangeRole={handleChangeRole}
            onAddRole={handleAddRole}
            onDeactivate={handleDeactivate}
            onMerge={handleMergeAccounts}
          />
        )} */}
        {selectedUsers.length > 0 && (
  <BulkActionsBar 
    selectedCount={selectedUsers.length}
    totalCount={filteredUsers.length}
    onClearSelection={() => setSelectedUsers([])}
    onAssignPlant={handleAssignPlant}
    onChangeRole={handleChangeRole}
    onAddRole={handleAddRole}
    onDeactivate={handleDeactivate}
    onMerge={handleMergeAccounts}
  />
)}

        <Table 
          columns={columns} 
          data={filteredUsers}
          activeFilter={activeFilter}
          onRowSelect={handleRowSelect}
        />
</div>
      </div>

      {/* Modals */}
      <Createusermodal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />
      
      <Errormodal 
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
    </div>
  );
};

export default Users;