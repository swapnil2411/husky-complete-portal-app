import React, { useState } from "react";
import Button from "./Button";
import Rightangle from "../icons/Rightangle";

const Notificationsview = () => {
    const notificationData = [
  {
    "time": "07:00",
    "date": "12.09.25",
    "title": "Shipped spare parts Order Nr. 123456",
    "subtitle": "Notifications details",
    "color": "#f5b700"
  },
  {
    "time": "08:30",
    "date": "11.09.25",
    "title": "New maintenance video available",
    "subtitle": "Notifications details",
    "color": "#4caf50"
  },
  {
    "time": "08:30",
    "date": "11.09.25",
    "title": "New Advantage+Elite insights",
    "subtitle": "",
    "color": "#ff7043"
  },
  {
    "time": "08:30",
    "date": "11.09.25",
    "title": "New machine in Berlin Plant",
    "subtitle": "HyPET6e System",
    "color": "#ff7043"
  },
  {
    "time": "08:30",
    "date": "11.09.25",
    "title": "Welcome to Paris plant",
    "subtitle": "Advantage+Elite is now available in Paris",
    "color": "#4caf50"
  }
]

  const [notifications, setNotifications] = useState(notificationData);

  const markAllAsRead = () => {
    alert("All notifications marked as read ✅");
    setNotifications([]);
  };

  return (
    <div className="notifications_container">
      {/* Header */}
      <div className="notifications_header">
        <button onClick={markAllAsRead} className="mark_all_btn">
          Mark all as read
        </button>
      </div>

      {/* List */}
      <div className="notifications_list">
        {notifications.map((item, index) => (
          <div key={index} className="notification_item">
              <div className="notification_time_date">
                  <span>{item.time}</span> <span>{item.date}</span>
                </div>

              <div className="notification_content">
                
                <div className="notification_title">{item.title}</div>
                {item.subtitle && (
                  <div className="notification_subtitle">{item.subtitle}</div>
                )}
              </div>

              <Button variant="details_btn">
                <span className="txt">Details</span>
                <span className="icon"><Rightangle /></span>
              </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notificationsview;
