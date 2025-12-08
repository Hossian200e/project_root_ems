import React, { useEffect, useState, useRef } from "react";
import "../../../assets/styles/admin/layoutPage/components/Header.css";

export default function Header() {
  const [greeting, setGreeting] = useState(""); // Greeting text based on time
  const [time, setTime] = useState(""); // Current time
  const [theme, setTheme] = useState("light"); // Theme state
  const [username, setUsername] = useState(""); // Logged-in user name
  const [dropdownOpen, setDropdownOpen] = useState(false); // Profile dropdown visibility

  const dropdownRef = useRef(); // Ref for profile dropdown to detect outside clicks

  useEffect(() => {
    // Get stored username from localStorage
    const storedName = localStorage.getItem("username") || "User";
    setUsername(storedName);

    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark-mode", savedTheme === "dark");

    // Function to update time and greeting
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const parts = formatter.formatToParts(now);
      const hour = parseInt(parts.find((p) => p.type === "hour").value);
      const minute = parts.find((p) => p.type === "minute").value;
      const period = parts.find((p) => p.type === "dayPeriod").value.toUpperCase();

      setTime(`${hour}:${minute} ${period}`);

      // Convert to 24-hour format for greeting
      const hour24 =
        period === "PM" && hour !== 12 ? hour + 12 :
        period === "AM" && hour === 12 ? 0 : hour;

      // Set greeting based on hour
      if (hour24 < 5) setGreeting("Good Night");
      else if (hour24 < 12) setGreeting("Good Morning");
      else if (hour24 < 17) setGreeting("Good Afternoon");
      else if (hour24 < 20) setGreeting("Good Evening");
      else setGreeting("Good Night");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    // Close dropdown if clicked outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <header className="topbar">
      {/* Greeting message */}
      <h2 className="greeting">
        {greeting}, <span>{username}!</span>
        <small className="time">({time})</small>
      </h2>

      {/* Profile Section */}
      <div className="profile" ref={dropdownRef}>
        {/* Profile info & theme toggle */}
        <div className="profile-info">
          <span className="role">N/A</span>
          <i
            className={`fa ${theme === "light" ? "fa-moon" : "fa-sun"} theme-icon`}
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          ></i>
        </div>

        {/* Profile image */}
        <img
          src="https://i.ibb.co/2W8Q0vG/default-user.png"
          alt="User"
          className="profile-img"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="profile-dropdown">
            <div className="profile-header">
              <img src="https://i.ibb.co/2W8Q0vG/default-user.png" alt={username} />
              <div className="profile-name">
                <strong>{username}</strong>
                <small>Account Info</small>
              </div>
            </div>
            <ul>
              <li>
                <a href="/profile">
                  <i className="fa fa-user"></i> Profile
                </a>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <i className="fa fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
