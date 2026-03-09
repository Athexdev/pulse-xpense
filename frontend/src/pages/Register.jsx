import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/auth/register/', {
                username,
                email,
                password
            });
            // Redirect to login after successful registration
            navigate('/login');
        } catch (err) {
            setError('Failed to create account. Username might be taken.');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-card">
                <div className="text-center mb-4">
                    <h1 className="logo mb-0">
                        <span className="pocket">Pocket</span><span className="pulse">Pulse</span>
                    </h1>
                    <p className="tagline">Start mastering your finances</p>
                </div>

                <h2 className="text-center text-white mb-4">Create Account</h2>

                {error && <div className="alert">{error}</div>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-4">Register</button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-muted">Already have an account? <Link className="text-link" to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
