import React, { useState } from "react";
import Leftangle from "../icons/Leftangle";
import Rightangle from "../icons/Rightangle";

const Calenderview = () => {
  const calendarData = {
  "2025-08": [
    {
      date: "2025-08-10",
      day: "10",
      month: "August",
      events: [
        {
          time: "ALL DAY",
          title: "Plant Maintenance",
          location: "Delhi",
          person: "Mr. Rao",
          color: "yellow",
        },
        {
          time: "09:00 – 12:30",
          title: "Operator Training Session",
          location: "Mumbai",
          person: "Trainer Kavita",
          color: "teal",
        },
        {
          time: "14:00 – 18:00",
          title: "Machine Upgrade #A",
          location: "Pune",
          person: "Engineer Patel",
          color: "pink",
        },
      ],
    },
    {
      date: "2025-08-18",
      day: "18",
      month: "August",
      events: [
        {
          time: "ALL DAY",
          title: "Pro-Act Visit",
          location: "Bangalore",
          person: "Mr. Iyer",
          color: "red",
        },
      ],
    },
    {
      date: "2025-08-25",
      day: "25",
      month: "August",
      events: [
        {
          time: "11:00 – 15:00",
          title: "Customer Demo",
          location: "Hyderabad",
          person: "Team Lead Priya",
          color: "purple",
        },
      ],
    },
  ],
  "2025-09": [
    {
      date: "2025-09-13",
      day: "13",
      month: "September",
      events: [
        {
          time: "ALL DAY",
          title: "Pro-Act Visit",
          location: "Halifax",
          person: "Mr. Fisher (Day 2/3)",
          color: "yellow",
        },
        {
          time: "09:15 – 13:00",
          title: "Machine Upgrade #1 / 144 CA 50x140",
          location: "Medellín",
          person: "Operator Andy",
          color: "teal",
        },
        {
          time: "14:00 – 19:30",
          title: "Machine Upgrade #2 / 144 CA 50x140",
          location: "Medellín",
          person: "Operator Andy",
          color: "pink",
        },
      ],
    },
    {
      date: "2025-09-14",
      day: "14",
      month: "September",
      events: [
        {
          time: "ALL DAY",
          title: "Pro-Act Visit",
          location: "Halifax",
          person: "Mr. Fisher (Day 3/3)",
          color: "yellow",
        },
      ],
    },
    {
      date: "2025-09-15",
      day: "15",
      month: "September",
      events: [
        {
          time: "09:00 – 12:00",
          title: "Operator Training",
          location: "Berlin",
          person: "Sophie",
          color: "purple",
        },
      ],
    },
  ],
  "2025-10": [
    {
      date: "2025-10-05",
      day: "05",
      month: "October",
      events: [
        {
          time: "10:00 – 12:00",
          title: "System Maintenance",
          location: "London",
          person: "Engineer Bob",
          color: "blue",
        },
      ],
    },
    {
      date: "2025-10-19",
      day: "19",
      month: "October",
      events: [
        {
          time: "ALL DAY",
          title: "Plant Audit",
          location: "Chicago",
          person: "Mr. Smith",
          color: "red",
        },
      ],
    },
  ],
  "2025-11": [
    {
      date: "2025-11-07",
      day: "07",
      month: "November",
      events: [
        {
          time: "ALL DAY",
          title: "Annual Shutdown",
          location: "Tokyo",
          person: "Maintenance Crew",
          color: "yellow",
        },
        {
          time: "14:00 – 17:00",
          title: "Machine Calibration",
          location: "Tokyo",
          person: "Mr. Tanaka",
          color: "teal",
        },
      ],
    },
    {
      date: "2025-11-20",
      day: "20",
      month: "November",
      events: [
        {
          time: "09:00 – 11:30",
          title: "Safety Training",
          location: "Paris",
          person: "Alice",
          color: "green",
        },
      ],
    },
  ],
  "2025-12": [
    {
      date: "2025-12-02",
      day: "02",
      month: "December",
      events: [
        {
          time: "ALL DAY",
          title: "Holiday Preparation",
          location: "New York",
          person: "Operations Team",
          color: "pink",
        },
      ],
    },
    {
      date: "2025-12-15",
      day: "15",
      month: "December",
      events: [
        {
          time: "13:00 – 18:00",
          title: "Machine Upgrade #3",
          location: "Dubai",
          person: "Technician Omar",
          color: "purple",
        },
      ],
    },
    {
      date: "2025-12-24",
      day: "24",
      month: "December",
      events: [
        {
          time: "ALL DAY",
          title: "Christmas Shutdown",
          location: "Global",
          person: "Company-wide",
          color: "red",
        },
      ],
    },
  ],
  "2026-01": [
    {
      date: "2026-01-12",
      day: "12",
      month: "January",
      events: [
        {
          time: "ALL DAY",
          title: "Kickoff Meeting",
          location: "Berlin",
          person: "Anna",
          color: "green",
        },
      ],
    },
  ],
};


  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0–11

  const getMonthKey = (year, monthIndex) =>
    `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

  const events = calendarData[getMonthKey(currentYear, currentMonth)] || [];

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleMonthClick = (year, index) => {
    setCurrentYear(year);
    setCurrentMonth(index);
  };

  // Build dynamic header where current month is always at leftmost
  const getHeaderMonths = () => {
    const list = [];
    let year = currentYear;
    let monthIndex = currentMonth;

    // Always start with current year & month
    list.push({ type: "year", value: year });
    list.push({
      type: "month",
      value: months[monthIndex],
      year: year,
      index: monthIndex,
    });

    // Add forward months
    let forwardYear = year;
    let forwardMonth = monthIndex + 1;
    for (let i = 0; i < 24; i++) {
      if (forwardMonth === 12) {
        forwardYear++;
        list.push({ type: "year", value: forwardYear });
        forwardMonth = 0;
      }
      list.push({
        type: "month",
        value: months[forwardMonth],
        year: forwardYear,
        index: forwardMonth,
      });
      forwardMonth++;
    }

    return list;
  };

  return (
    <div className="calendar_container">
      {/* Header */}
      <div className="calendar_header">
        <button onClick={handlePrev} className="calender_nav_btn">
            <span className="calender_nav_icon"><Leftangle /></span>
        </button>
        <div className="calendar_scroll">
          {getHeaderMonths().map((item, idx) =>
            item.type === "year" ? (
              <span key={`y-${idx}`} className="calendar_year_label">
                {item.value}
              </span>
            ) : (
              <button
                key={`m-${idx}`}
                className={`month_btn ${
                  item.year === currentYear && item.index === currentMonth
                    ? "active"
                    : ""
                }`}
                onClick={() => handleMonthClick(item.year, item.index)}
              >
                {item.value}
              </button>
            )
          )}
        </div>
        <button onClick={handleNext} className="calender_nav_btn">
            <span className="calender_nav_icon"><Rightangle /></span>
        </button>
      </div>

      {/* Event List */}
      <div className={`calendar_list ${events.length === 0 && 'calender_list_empty'}`}>
        <div className="calendar_days">
            {events.map((day, idx) => (
          <div key={idx} className="calendar_day_item">
            <div className="calendar_date">
              <div className="calendar_date_num">{day.day}</div>
              <div className="calendar_date_month">{day.month}</div>
            </div>
            <div className="calendar_date_events">
              {day.events.map((event, i) => (
                <div key={i} className='calendar_date_event_item'>
                  <div className="calendar_date_event_time">{event.time}</div>
                  <div className={`calendar_date_event_description border-${event.color}`}>
                        <h4 className="calendar_date_event_title">{event.title}</h4>
                        <p className="calendar_date_event_para">
                          @{event.location} by {event.person}
                        </p>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="calendar-empty">No events this month</div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Calenderview;
