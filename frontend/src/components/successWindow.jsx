import { Link } from "react-router-dom";

function SuccessWindow() {
    const connectionData = JSON.parse(localStorage.getItem('connectionDetails') || '{}');

  return (
    <div className="success-container">
      <div className="success-icon">✓</div>
      <h2>Connection Successful!</h2>
      <p>Your API connection has been verified successfully.</p>
      
      <div className="connection-details">
        <h3>Connection Details</h3>
        <p><strong>API URL:</strong> {connectionData.apiUrl}</p>
        <p><strong>Company:</strong> {connectionData.companyName}</p>
        <p><strong>Username:</strong> {connectionData.username}</p>
      </div>
      
      <div className="action-buttons">
        <Link to="/" className="btn btn-secondary">Back to Form</Link>
      </div>
    </div>
  );
}

export default SuccessWindow;