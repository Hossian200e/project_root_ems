// src/student/layoutPage/components/Header.jsx
import React, { useState, useEffect } from "react";

export default function Header({ theme, toggleTheme }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`topbar ${theme}-mode`}>
      <h2 className="greeting">Student Dashboard</h2>
      <div className="profile">
        <span className="time">{time}</span>
        <i
          className={`fa ${theme === "light" ? "fa-moon" : "fa-sun"} theme-icon`}
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        ></i>
      </div>
    </header>
  );
}
