import React from 'react'
import { Link } from "react-router-dom";


const Megadropdown = ({className}) => {
    const menuData = [
  {
    title: "VISUAL MAINTENANCE",
    items: [
      { label: "By Maintenance Interval", link: "/visual/by-interval" },
      { label: "By Machine Area", link: "/visual/by-machine-area" },
      { label: "Specifications", link: "/visual/specifications" },
      { label: "Safety Information", link: "/visual/safety" }
    ]
  },
  {
    title: "SPARE PARTS",
    items: [
      { label: "Genuine OEM Parts", link: "/spare/genuine-oem" },
      { label: "OEM Parts Repair Service", link: "/spare/repair-service" }
    ]
  },
  {
    title: "ADVANTAGE+ELITE",
    items: [
      { label: "Machines", link: "/advantage-elite/machines" },
      { label: "Alerts", link: "/advantage-elite/alerts" },
      { label: "Monitoring", link: "/advantage-elite/monitoring" },
      { label: "Configuration", link: "/advantage-elite/configuration" },
      { label: "Overview", link: "/advantage-elite/overview" },
      { label: "We Call you", link: "/advantage-elite/call" }
    ]
  },
  {
    title: "ADVANTAGE+ENTERPRISE",
    items: [
      { label: "Executive view", link: "/advantage-enterprise/executive" },
      { label: "VP of Operations view", link: "/advantage-enterprise/operations" },
      { label: "VP of Maintenance view", link: "/advantage-enterprise/maintenance" }
    ]
  }
];
  return (
   <div className={`${className}`}>
      {menuData.map((menu, index) => (
        <div key={index} className="mega_menu_column">
          <h4>{menu.title}</h4>
          <ul>
            {menu.items.map((item, idx) => (
              <li key={idx}>
                <Link to={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Megadropdown