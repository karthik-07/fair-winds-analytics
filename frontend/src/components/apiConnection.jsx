import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ApiConnection() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        apiUrl: '',
        apiKey: '',
        accessToken: '',
        username: '',
        password: '',
        companyName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear validation error when user types
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm =() => {
        const errors = {};

        // Required form validation
        Object.keys(formData).forEach(field => {
            if (!formData[field]) {
                errors[field] = 'This field is required';
            }
        });
        // URL form validation
        if (formData.apiUrl && !/^(https?:\/\/)/.test(formData.apiUrl)) {
            errors.apiUrl = 'URL must start with http:// of https://';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const testConnection = async (e) => {
        e.preventDefault();
        if(!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/test-connection', formData);
            if (response.data.success) {
                // Stores in localStorage for persistence
                localStorage.setItem('connectionDetails', JSON.stringify(formData));

                // Navigate to success page
                navigate('/success');
            }else {
                setError(response.data.message || 'Connection test failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to test connection');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="connection-form-containter">
            <h2>API Connection Details</h2>
            <form onSubmit={testConnection}>
                <div className="form-gorup">
                    <label htmlFor="apiUrl">API Url</label>
                    <input
                        type="text"
                        id="apiUrl"
                        name="apiUrl"
                        value={formData.apiUrl}
                        onChange={handleChange}
                        className={validationErrors.apiUrl ? 'error' : ''}
                    />
                    {validationErrors.apiUrl && <div className="error-message">{validationErrors.apiUrl}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="apiKey">API Key</label>
                    <input
                        type="text"
                        id="apiKey"
                        name="apiKey"
                        value={formData.apiKey}
                        onChange={handleChange}
                        className={validationErrors.apiKey ? 'error' : ''}
                    />
                    {validationErrors.apiKey && <div className="error-message">{validationErrors.apiKey}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="accessToken">Access Token</label>
                    <input
                        type="text"
                        id="accessToken"
                        name="accessToken"
                        value={formData.accessToken}
                        onChange={handleChange}
                        className={validationErrors.accessToken ? 'error' : ''}
                    />
                    {validationErrors.accessToken && <div className="error-message">{validationErrors.accessToken}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={validationErrors.username ? 'error' : ''}
                    />
                    {validationErrors.username && <div className="error-message">{validationErrors.username}</div>}
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={validationErrors.password ? 'error' : ''}
                />
                {validationErrors.password && <div className="error-message">{validationErrors.password}</div>}
                </div>
                <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={validationErrors.companyName ? 'error' : ''}
                />
                {validationErrors.companyName && <div className="error-message">{validationErrors.companyName}</div>}
                </div>
                <button 
                    type="submit" 
                    className="test-connection-btn" 
                    disabled={loading}
                >
                {loading ? 'Testing...' : 'Test Connection'}
                </button>
                {error && <div className="error-banner">{error}</div>}
            </form>
        </div>
    )
}

export default ApiConnection;