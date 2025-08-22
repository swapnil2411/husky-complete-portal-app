import React, { useState, useEffect } from "react";
import Hamburger from "../icons/Hamburger";
import Logo from "../icons/Logo";
import Tipofday from "../icons/Tipofday";
import Notification from "../icons/Notification";
import User from "../icons/User";
import Select from "react-dropdown-select";
import Megadropdown from "./Megadropdown";
import Mobilemenu from "./Mobilemenu";
import Close from "../icons/Close";
import Calenderview from "./Calenderview";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Notificationsview from "./Notificationsview";
import Profileview from "./Profileview";

const Header = ({ companies, loading, error, selectedCompany, setSelectedCompany }) => {
  const [isMegamenuOpen, setIsMegamenuOpen] = useState(false);
  const [isMobilemenuOpen, setIsMobilemenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <=600);
  const [openModalId, setOpenModalId] = useState(null);
  const toggleMegaMenu = () => {
    setIsMegamenuOpen((prev) => !prev)
  }

  const toggleMobileMenu = () => {
    setIsMobilemenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <=600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const options = companies?.map((company) => ({
    value: company.companyId,
    label: company.name,
  })) || [];

  const handleChange = (selectedOptions) => {
    if (selectedOptions.length > 0) {
      const companyId = selectedOptions[0].value;
      const companyDetails = companies.find((c) => c.companyId === companyId);
      setSelectedCompany(companyDetails);
    } else {
      setSelectedCompany(null);
    }
  };

  const actionsArr = [
    { id: 1, title: "tipofday", component: <Tipofday />, modal: <Calenderview /> },
    { id: 2, title: "notification", component: <Notification />, modal: <Notificationsview /> },
    { id: 3, title: "user", component: <User />, modal: <Profileview /> },
  ];

  const handleActionModal = (id) => {
    setOpenModalId((prev) => (prev === id ? null : id));
  };

  return (
    <header>
      <div className="global_navigation_header">
        <div className="global_navigation_header_left">
          <div className="global_navigation_header_left_button">
            <div className={`global_navigation_header_left_button_base_icon ${isMegamenuOpen || isMobilemenuOpen ? "close" : ''}`} onClick={isMobile ? toggleMobileMenu : toggleMegaMenu}>
              <div className="global_navigation_header_left_button_base_icon_svg">
                {
                  isMegamenuOpen || isMobilemenuOpen ? <Close /> : <Hamburger  />
                }
                
              </div>
            </div>
          </div>
          <div className="global_navigation_header_left_logo">
            <Logo />
          </div>
          <div className="global_navigation_header_left_divider"></div>
          <div className="global_navigation_header_left_service_title">
            Complete
          </div>
        </div>
        <div className="global_navigation_header_actions">
  {/* Company Select - stays outside ClickAwayListener */}
  <div className="global_navigation_header_actions_dropdown" >
    <Select
      options={options}
      values={
        selectedCompany
          ? [{ value: selectedCompany.companyId, label: selectedCompany.name }]
          : []
      }
      onChange={handleChange}
      placeholder={loading ? "Loading companies..." : "Choose a company"}
      disabled={loading || !!error}
      isClearable
    />
  </div>

  {/* Wrap each action separately */}
  {actionsArr.map((item) => (
    <ClickAwayListener
      key={item.id}
      onClickAway={() => {
        if (openModalId === item.id) setOpenModalId(null);
      }}
    >
      <div
        className={`global_navigation_header_actions_${item.title} global_navigation_header_actions_wrapper`}
        onClick={() => handleActionModal(item.id)}
      >
        <div
          className={`global_navigation_header_actions_${item.title}_button global_navigation_header_actions_wrapper_button ${openModalId === item.id ? "active" : ""}`}
        >
          <div
            className={`global_navigation_header_actions_${item.title}_button_base_icon global_navigation_header_actionsglobal_navigation_header_actions_wrapper_button_base_icon`}
          >
            {item.component}
          </div>
        </div>

        {openModalId === item.id && (
          <div className="global_navigation_header_actions_wrapper_modal"
          onClick={(e) => e.stopPropagation()}
          >
            {item.modal}
          </div>
        )}
      </div>
    </ClickAwayListener>
  ))}
</div>

      </div>

      {isMobile ? (
        
      <Mobilemenu companies={companies}
    selectedCompany={selectedCompany}
    setSelectedCompany={setSelectedCompany}
    className={isMobilemenuOpen ? "mobile_menu show" : "mobile_menu hide"} />
      ) : (
        <Megadropdown className={isMegamenuOpen ? "mega_menu show" : "mega_menu hide"}/>
      )}
      
    </header>
  );
};

export default Header;
