import React from 'react';

function Footer() {
    return (
        <footer style={{
            background: 'rgba(15, 23, 42, 0.95)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '2rem 0',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                    <div>&copy; 2026 PocketPulse. All rights reserved. Industrial Grade FinTech.</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = '#94a3b8'}>Privacy Policy</a>
                        <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = '#94a3b8'}>Terms of Service</a>
                        <a href="#" style={{ color: '#94a3b8', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = '#94a3b8'}>Security Details</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
