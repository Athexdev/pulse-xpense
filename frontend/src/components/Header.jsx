import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Grid, LogOut, List, Layers } from 'lucide-react';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('access_token');

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1rem' }}>
                <div className="navbar-brand">
                    <Link to={token ? "/dashboard" : "/"} style={{ textDecoration: 'none' }}>
                        <h1 className="logo mb-0 text-white" style={{ fontSize: '24px' }}>
                            <span className="pocket">Pocket</span><span className="pulse">Pulse</span>
                        </h1>
                    </Link>
                </div>
                <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {token ? (
                        <>
                            <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}><Grid size={18} className="icon-mr" /> Dashboard</Link>
                            <Link to="/expenses" className={`nav-link ${location.pathname === '/expenses' ? 'active' : ''}`}><List size={18} className="icon-mr" /> Expenses</Link>
                            <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}><Layers size={18} className="icon-mr" /> Categories</Link>
                            <button onClick={logout} className="btn-logout" style={{ background: 'transparent', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 600 }}>
                                <LogOut size={18} className="icon-mr" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline text-white border-white" style={{ padding: '0.5rem 1rem' }}>Sign In</Link>
                            <Link to="/register" className="btn btn-primary-custom" style={{ padding: '0.5rem 1rem', background: 'white', color: '#0f172a' }}>Get Started Free</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
