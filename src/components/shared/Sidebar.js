import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import Company from '../icons/Company'
import Human from '../icons/Human'
import Lock from '../icons/Lock'
import Support from '../icons/Support'
import Button from './Button'
import Rightangle from '../icons/Rightangle'

const Sidebar = () => {
  const navLink = [
     { id: 1, title: "Company Overview", path: "/", icon: <Company /> },
    { id: 2, title: "Users", path: "/users", icon: <Human /> },
    { id: 3, title: "Roles", path: "/roles", icon: <Lock /> },
    { id: 4, title: "Support", path: "/support", icon: <Support /> }
  ]

  const [isTablet, setIsTablet] = useState(window.innerWidth <= 991);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 991);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsTablet(true);
        setIsSidebarOpen(false); // ✅ auto-hide when going to tablet/mobile
      } else {
        setIsTablet(false);
        setIsSidebarOpen(true); // ✅ auto-show when going back to desktop
      }
    };

    // // Run once at mount
    // handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const mobileActionsArr = [
  //   { id: 1, title: "user", component: <User /> },
  //   { id: 2, title: "notification", component: <Notification /> },
  //   { id: 3, title: "tipofday", component: <Tipofday /> },
  //   {id: 4, title: "company", component: <Job />}
  // ];

  const topLinks = navLink.slice(0, 3);
  const bottomLinks = navLink.slice(3);

  return (
    <aside className={`sidebar 
        ${isTablet ? "toogle_side_navigation" : ""} 
        ${isSidebarOpen ? "sidebar_open" : "sidebar_closed"}`}>
      <Button variant='block_button' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <Rightangle />
      </Button>
      <div className='side_navigation'>
        {/* <div className='side_navigation_mobile'>
          <nav>
            <ul>
              {
                mobileActionsArr?.map(item => {
                  return(
                    <li key={item?.id}>
                      <span>{item?.component}</span>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </div> */}
        <div className='side_navigation_top'>
          <nav>
            <ul>
              {
                topLinks?.map(item => {
                  return (
                    <li key={item?.id}>
                        <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    <span className='nav_icon'>{item?.icon}</span>
                      <span className='nav_txt'>{item?.title}</span>
                  </NavLink>
                      
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </div>
        <div className='side_navigation_bottom'>
          <nav>
            <ul>
              {
                bottomLinks?.map(item => {
                  return (
                    <li key={item?.id}>
                      <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                     <span className='nav_icon'>{item?.icon}</span>
                      <span className='nav_txt'>{item?.title}</span>
                  </NavLink>
                     
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar