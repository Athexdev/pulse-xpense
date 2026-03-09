import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Wallet } from 'lucide-react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/auth/login/', {
                username,
                password
            });
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-card">
                <div className="text-center mb-4">
                    <h1 className="logo mb-0">
                        <span className="pocket">Pocket</span><span className="pulse">Pulse</span>
                    </h1>
                    <p className="tagline">Feel the rhythm of your finances</p>
                </div>

                <h2 className="text-center text-white mb-4">Welcome Back</h2>

                {error && <div className="alert">{error}</div>}

                <form onSubmit={handleLogin}>
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
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-muted">Don't have an account? <Link className="text-link" to="/register">Register here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
