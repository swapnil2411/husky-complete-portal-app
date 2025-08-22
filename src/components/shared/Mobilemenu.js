import React, { useState } from "react";
import { Link } from "react-router-dom";
import User from "../icons/User";
import Rightangle from "../icons/Rightangle";
import Lock from "../icons/Lock";
import Help from "../icons/Help";
import Logout from "../icons/Logout";
import Notification from "../icons/Notification";
import Tipofday from "../icons/Tipofday";
import Job from "../icons/Job";
import Leftangle from "../icons/Leftangle";
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Mobilemenu = ({
  companies = [],
  selectedCompany,
  setSelectedCompany,
  className
}) => {
  const menuData = [
    {
      id: 1,
      title: "Profile",
      icon: "user",
      children: [
        { id: 1, label: "Access admin area", link: "/profile/admin" },
        { id: 2, label: "Account", link: "/profile/account" },
        { id: 3, label: "Help", link: "/profile/help" },
        { id: 4, label: "Log out", link: "/logout" },
      ],
    },
    {
      id: 2,
      title: "Notifications",
      icon: "bell",
      children: [
        {
          id: 5,
          label: "Shipped spare parts - Order Nr. 123456",
          link: "/notifications/123456",
        },
        {
          id: 6,
          label: "New maintenance video available",
          link: "/notifications/video",
        },
        {
          id: 7,
          label: "New machine in Berlin Plant",
          link: "/notifications/berlin",
        },
      ],
    },
    {
      id: 3,
      title: "Calendar",
      icon: "calendar",
      children: [
        { label: "Pro-Act Visit - All Day", link: "/calendar/proact" },
        {
          label: "Machine Upgrade / 144 CA SQ140 (09:15 - 13:00)",
          link: "/calendar/upgrade1",
        },
        {
          label: "Machine Upgrade / 144 CA SQ140 (14:00 - 15:30)",
          link: "/calendar/upgrade2",
        },
      ],
    },
    {
      id: 4,
      title: "ABC Plastics",
      icon: "building",
      children: [
        { id: 41, title: "EPL Industries", link: "/companies/epl" },
        { id: 42, title: "Chemcon Plastic", link: "/companies/chemcon" },
        { id: 43, title: "Grahak Packaging", link: "/companies/grahak" },
      ],
    },
    {
      id: 5,
      title: "Visual Maintenance",
      children: [
        {
          id: 51,
          title: "By Maintenance Interval",
          link: "/maintenance/interval",
        },
        { id: 52, title: "By Machine Area", link: "/maintenance/machine-area" },
        {
          id: 53,
          title: "Specifications",
          link: "/maintenance/specifications",
        },
        { id: 54, title: "Safety Information", link: "/maintenance/safety" },
      ],
    },
    {
      id: 6,
      title: "Spare Parts",
      children: [
        { id: 61, title: "Genuine OEM Parts", link: "/spare/genuine-oem" },
        {
          id: 62,
          title: "OEM Parts Repair Service",
          link: "/spare/repair-service",
        },
      ],
    },
    {
      id: 7,
      title: "Advantage+ Elite",
      children: [
        { id: 71, title: "Machines", link: "/advantage-elite/machines" },
        { id: 72, title: "Alerts", link: "/advantage-elite/alerts" },
        { id: 73, title: "Monitoring", link: "/advantage-elite/monitoring" },
        {
          id: 74,
          title: "Configuration",
          link: "/advantage-elite/configuration",
        },
        { id: 75, title: "Overview", link: "/advantage-elite/overview" },
        { id: 76, title: "We Call you", link: "/advantage-elite/call" },
      ],
    },
    {
      id: 8,
      title: "Advantage+ Enterprise",
      children: [
        {
          id: 81,
          title: "Executive view",
          link: "/advantage-enterprise/executive",
        },
        {
          id: 82,
          title: "VP of Operations view",
          link: "/advantage-enterprise/operations",
        },
        {
          id: 83,
          title: "VP of Maintenance view",
          link: "/advantage-enterprise/maintenance",
        },
      ],
    },
    {
      id: 9,
      title: "Account",
      link: "/account",
    },
    {
      id: 10,
      title: "Help",
      link: "/help",
    },
    {
      id: 11,
      title: "Log out",
      link: "/logout",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const bottomMenuData = [
    {
      title: "Visual Maintenance",
      options: [
        { label: "By Maintenance Interval", link: "/visual/by-interval" },
        { label: "By Machine Area", link: "/visual/by-machine-area" },
        { label: "Specifications", link: "/visual/specifications" },
        { label: "Safety Information", link: "/visual/safety" },
      ],
    },
    {
      title: "Spare Parts",
      options: [
        { label: "Genuine OEM Parts", link: "/spare/genuine-oem" },
        { label: "OEM Parts Repair Service", link: "/spare/repair-service" },
      ],
    },
    {
      title: "Advantage+Elite",
      options: [
        { label: "Machines", link: "/advantage-elite/machines" },
        { label: "Alerts", link: "/advantage-elite/alerts" },
        { label: "Monitoring", link: "/advantage-elite/monitoring" },
        { label: "Configuration", link: "/advantage-elite/configuration" },
        { label: "Overview", link: "/advantage-elite/overview" },
        { label: "We Call you", link: "/advantage-elite/call" },
      ],
    },
    {
      title: "Advantage+Enterprise",
      options: [
        { label: "Executive view", link: "/advantage-enterprise/executive" },
        {
          label: "VP of Operations view",
          link: "/advantage-enterprise/operations",
        },
        {
          label: "VP of Maintenance view",
          link: "/advantage-enterprise/maintenance",
        },
      ],
    },
  ];

  const toggleDropdown = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const toggleMenu = (menu) => {
    setActiveMenu(menu);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    closeMenu(); // close after selecting
  };

  return (
    <div className={`${className}`}>
      {/* <div className="mobile_menu_top">
        <ul>
          <li className="mobile_menu_top_item">
            <div className="dropdown_header">
                <span className="item_icon">
              <User />
            </span>
            <span className="item_txt">Profile</span>
            <span className="angle_right">
              <Rightangle />
            </span>
            </div>

            <div className="submenu profile">
              <div className="profile_header">
                <img src="images/Photo.png" alt="profile" />
                <div className="profile_details">
                  <h4>Melanie Chairman</h4>
                  <p>VP of Operations</p>
                </div>
              </div>
              <ul>
                <li>
                  <Lock />
                  <span>Access admin area</span>
                </li>
                <li>
                  <User />
                  <span>Account</span>
                </li>
                <li>
                  <Help />
                  <span>Help</span>
                </li>
                <li>
                  <Logout />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          </li>
          <li className="mobile_menu_top_item">
            <div className="dropdown_header">
                <span className="item_icon">
              <Notification />
            </span>
            <span className="item_txt">Notifications</span>
            <span className="angle_right">
              <Rightangle />
            </span>
            </div>
            

            <div className="submenu notifications">
              <div className="notification_header">
                <p>Notifications</p>
                <span>Mark all as read</span>
              </div>
              <ul>
                <li>
                  <div className="date">
                    <span>07:00</span>
                    <span>12.09.2025</span>
                  </div>
                  <div className="content">
                    <h3>Shipped spare parts Order Nr. 123456</h3>
                    <p>Notifications details</p>
                  </div>
                  <div className="details_link">
                    <span>Details</span>
                    <Rightangle />
                  </div>
                </li>
                <li>
                  <div className="date">
                    <span>07:00</span>
                    <span>12.09.2025</span>
                  </div>
                  <div className="content">
                    <h3>Shipped spare parts Order Nr. 123456</h3>
                    <p>Notifications details</p>
                  </div>
                  <div className="details_link">
                    <span>Details</span>
                    <Rightangle />
                  </div>
                </li>
                <li>
                  <div className="date">
                    <span>07:00</span>
                    <span>12.09.2025</span>
                  </div>
                  <div className="content">
                    <h3>Shipped spare parts Order Nr. 123456</h3>
                    <p>Notifications details</p>
                  </div>
                  <div className="details_link">
                    <span>Details</span>
                    <Rightangle />
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li className="mobile_menu_top_item">
             <div className="dropdown_header">
                <span className="item_icon">
              <Tipofday />
            </span>
            <span className="item_txt">Calender</span>
            <span className="angle_right">
              <Rightangle />
            </span>
             </div>
            

            <div className="submenu calender">
              <div className="notification_header">
                <p>Calendar</p>
                <span>Open calender</span>
              </div>
              <ul>
                <li>
                  <div className="date">
                    <span>07:00</span>
                    <span>12.09.2025</span>
                  </div>
                  <div className="content">
                    <h3>Shipped spare parts Order Nr. 123456</h3>
                    <p>Notifications details</p>
                  </div>
                  <div className="details_link">
                    <span>Details</span>
                    <Rightangle />
                  </div>
                </li>
                <li>
                  <div className="date">
                    <span>07:00</span>
                    <span>12.09.2025</span>
                  </div>
                  <div className="content">
                    <h3>Shipped spare parts Order Nr. 123456</h3>
                    <p>Notifications details</p>
                  </div>
                  <div className="details_link">
                    <span>Details</span>
                    <Rightangle />
                  </div>
                </li>
                <li>
                  <div className="date">
                    <span>07:00</span>
                    <span>12.09.2025</span>
                  </div>
                  <div className="content">
                    <h3>Shipped spare parts Order Nr. 123456</h3>
                    <p>Notifications details</p>
                  </div>
                  <div className="details_link">
                    <span>Details</span>
                    <Rightangle />
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li className="mobile_menu_top_item">
            <div className="dropdown_header">
                <span className="item_icon">
              <Job />
            </span>
            <span className="item_txt">ABC Plastic</span>
            <span className="angle_right">
              <Rightangle />
            </span>
            </div>
            

            <div className="submenu companies">
              <div className="notification_header">
                <p>Select company</p>
              </div>
              <ul>
                <li>
                  <div className="date">
                    <span>07:00</span>
                    <span>12.09.2025</span>
                  </div>
                  <div className="content">
                    <h3>Shipped spare parts Order Nr. 123456</h3>
                    <p>Notifications details</p>
                  </div>
                  <div className="details_link">
                    <span>Details</span>
                    <Rightangle />
                  </div>
                </li>
                <li>
                  <div className="date">
                    <span>07:00</span>
                    <span>12.09.2025</span>
                  </div>
                  <div className="content">
                    <h3>Shipped spare parts Order Nr. 123456</h3>
                    <p>Notifications details</p>
                  </div>
                  <div className="details_link">
                    <span>Details</span>
                    <Rightangle />
                  </div>
                </li>
                <li>
                  <div className="date">
                    <span>07:00</span>
                    <span>12.09.2025</span>
                  </div>
                  <div className="content">
                    <h3>Shipped spare parts Order Nr. 123456</h3>
                    <p>Notifications details</p>
                  </div>
                  <div className="details_link">
                    <span>Details</span>
                    <Rightangle />
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div> */}
      <div className="mobile_menu_top">
        <ul>
          {/* Profile */}
          <li className="mobile_menu_top_item">
            <div
              className="dropdown_header"
              onClick={() => toggleMenu("profile")}
            >
              <span className="item_icon">
                <User />
              </span>
              <span className="item_txt">Profile</span>
              <span className="angle_right">
                <Rightangle />
              </span>
            </div>

            <div
              className={`submenu profile ${
                activeMenu === "profile" ? "open" : ""
              }`}
            >
              <span className="back_btn" onClick={closeMenu}>
                <Leftangle />
              </span>
              <div className="profile_header">
                <img src="images/Photo.png" alt="profile" />
                <div className="profile_details">
                  <h4>Melanie Chairman</h4>
                  <p>VP of Operations</p>
                </div>
              </div>
              <ul>
                <li>
                  <span className="icon">
                    <Lock />
                  </span>
                  <span className="txt">Access admin area</span>
                </li>
                <li>
                  <span className="icon">
                    <User />
                  </span>
                  <span className="txt">Account</span>
                </li>
                <li>
                  <span className="icon">
                    <Help />
                  </span>
                  <span className="txt">Help</span>
                </li>
                <li>
                  <span className="icon">
                    <Logout />
                  </span>
                  <span className="txt">Logout</span>
                </li>
              </ul>
            </div>
          </li>

          {/* Notifications */}
          <li className="mobile_menu_top_item">
            <div
              className="dropdown_header"
              onClick={() => toggleMenu("notifications")}
            >
              <span className="item_icon">
                <Notification />
              </span>
              <span className="item_txt">Notifications</span>
              <span className="angle_right">
                <Rightangle />
              </span>
            </div>

            <div
              className={`submenu notifications ${
                activeMenu === "notifications" ? "open" : ""
              }`}
            >
              <span className="back_btn" onClick={closeMenu}>
                <Leftangle />
              </span>
              <div className="content">
                <div className="notification_header">
                    <p>Notifications</p>
                    <span>Mark all as read</span>
                </div>
                <ul>
                    <li>
                        <div className="date">
                            <span>07:00</span>
                            <span>12.05.2025</span>
                        </div>
                        <div className="notification_txt">
                            <h4>Shipped spare parts Order Nr. 123456</h4>
                            <p>Notifications details</p>
                        </div>
                        <div className="notification_link">
                            <span className="txt">Details</span>
                            <span className="icon">
                                <Rightangle />
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="date">
                            <span>07:00</span>
                            <span>12.05.2025</span>
                        </div>
                        <div className="notification_txt">
                            <h4>Shipped spare parts Order Nr. 123456</h4>
                            <p>Notifications details</p>
                        </div>
                        <div className="notification_link">
                            <span className="txt">Details</span>
                            <span className="icon">
                                <Rightangle />
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="date">
                            <span>07:00</span>
                            <span>12.05.2025</span>
                        </div>
                        <div className="notification_txt">
                            <h4>Shipped spare parts Order Nr. 123456</h4>
                            <p>Notifications details</p>
                        </div>
                        <div className="notification_link">
                            <span className="txt">Details</span>
                            <span className="icon">
                                <Rightangle />
                            </span>
                        </div>
                    </li>
                </ul>
              </div>
            </div>
          </li>

          {/* Calendar */}
          <li className="mobile_menu_top_item">
            <div
              className="dropdown_header"
              onClick={() => toggleMenu("calendar")}
            >
              <span className="item_icon">
                <Tipofday />
              </span>
              <span className="item_txt">Calendar</span>
              <span className="angle_right">
                <Rightangle />
              </span>
            </div>

            <div
              className={`submenu calendar ${
                activeMenu === "calendar" ? "open" : ""
              }`}
            >
              <span className="back_btn" onClick={closeMenu}>
                <Leftangle />
              </span>
              <div className="content">
                <div className="calender_header">
                <p>Calendar</p>
                <span>Open calendar</span>
              </div>
              <ul>
                <li className="calender_day_item">
                    <div className="date">
                        <p>13 September</p>
                    </div>
                    <div className="calender_events">
                        <div className="calender_events_item">
                            <div className="time">All Day</div>
                            <div className="calender_events_item_content">
                                <h4>Pro-Act Visit </h4>
                                <p>@ Halifax by Mr. Fisher (Day 2/3) </p>
                            </div>
                        </div>
                        <div className="calender_events_item">
                            <div className="time">09:15 – 13:00</div>
                            <div className="calender_events_item_content">
                                <h4>Machine Upgrade #1 / 144 CA 50x140</h4>
                                <p>@ Medellín by Operator Andy</p>
                            </div>
                        </div>
                    </div>
                </li>
              </ul>
              </div>
            </div>
          </li>

          {/* Companies */}
          <li className="mobile_menu_top_item">
            <div
              className="dropdown_header"
              onClick={() => toggleMenu("companies")}
            >
              <span className="item_icon">
                <Job />
              </span>
              <span className="item_txt">
                {selectedCompany ? selectedCompany.name : "Select Company"}
              </span>
              <span className="angle_right">
                <Rightangle />
              </span>
            </div>

            <div
              className={`submenu companies ${
                activeMenu === "companies" ? "open" : ""
              }`}
            >
              <span className="back_btn" onClick={closeMenu}>
                <Leftangle />
              </span>
              <div className="content">
                <div className="company_header">
                <p>Select company</p>
              </div>
              <ul>
                {companies?.map((company) => (
                  <li
                    key={company.companyId}
                    onClick={() => handleCompanySelect(company)}
                    className={
                      selectedCompany?.companyId === company.companyId
                        ? "active"
                        : ""
                    }
                  >
                    <span>{company.name}</span>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </li>
          {/* <li className="mobile_menu_top_item">
            <div
              className="dropdown_header"
              onClick={() => toggleMenu("companies")}
            >
              <span className="item_icon">
                <Job />
              </span>
              <span className="item_txt">ABC Plastic</span>
              <span className="angle_right">
                <Rightangle />
              </span>
            </div>

            <div
              className={`submenu companies ${
                activeMenu === "companies" ? "open" : ""
              }`}
            >
              <span className="back_btn" onClick={closeMenu}>
                <Leftangle />
              </span>
              <div className="submenu_header">
                <h4>Companies</h4>
              </div>
              <div className="notification_header">
                <p>Select company</p>
              </div>
              <ul>
                <li>… company items …</li>
              </ul>
            </div>
          </li> */}
        </ul>

        {/* Overlay */}
        {activeMenu && (
          <div className="submenu_overlay" onClick={closeMenu}></div>
        )}
      </div>
      <ClickAwayListener onClickAway={() => setActiveIndex(null)}>
        <div className="mobile_menu_bottom">
        <ul className="mobile_menu_bottom_list">
          {bottomMenuData?.map((menu, index) => (
            <li className="mobile_menu_bottom_item" key={index}>
              <div
                className="dropdown_header"
                onClick={() => toggleDropdown(index)}
              >
                <span className="title">{menu.title}</span>
                <span
                  className={`angle_right ${
                    activeIndex === index ? "rotate" : ""
                  }`}
                >
                  <Rightangle />
                </span>
              </div>

              <div
                className={`bottom_options ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                <ul>
                  {menu.options.map((opt, i) => (
                    <li key={i}>{opt?.label}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </ClickAwayListener>
      
    </div>
  );
};

export default Mobilemenu;
