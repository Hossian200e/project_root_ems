import React, { useState } from "react";
import "../../assets/styles/admin/studentSetup/removeDuplicateStudents.css";

const RemoveDuplicateStudents = () => {
  const [error, setError] = useState(true);

  const handleRemoveDuplicates = () => {
    // simulate error
    setError(true);
  };

  return (
    <div className="remove-duplicate-container">

 

      {/* Error Message */}
      {error && (
        <div className="error-box">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong.</h3>
          <p className="error-title">An Internal Error Has Occurred.</p>
          <p className="error-text">
            Please refresh the page or try again shortly. If the issue continues,
            contact our support team.
          </p>
          <p className="support">
            Need help? <span>Reach out to our support team.</span>
          </p>

       <button
            className="refresh-btn"
            onClick={() => navigate("/AdminDashboard")}
          >
            Go to Admin Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default RemoveDuplicateStudents;
