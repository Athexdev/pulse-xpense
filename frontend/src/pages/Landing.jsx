import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, PieChart, Activity, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const chartData = {
    labels: ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment'],
    datasets: [
        {
            data: [35, 25, 20, 10, 10],
            backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
            borderWidth: 0,
        },
    ],
};

const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Spending',
        data: [1200, 1900, 1500, 2200, 1800, 2600],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
    }]
};

function Landing() {
    return (
        <div className="landing-page">


            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-grid">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="hero-content"
                        >
                            <div className="badge-pro mb-4">Enterprise Grade Tracking</div>
                            <h1 className="hero-title">
                                Master Your Finances with <span className="pulse">Industrial Precision</span>.
                            </h1>
                            <p className="hero-subtitle">
                                Unlock deep insights into your spending habits with enterprise-grade analytics, gorgeous visual charts, and complete ownership of your data.
                            </p>
                            <div className="hero-cta">
                                <Link to="/register" className="btn btn-primary-custom btn-lg mr-4">Start Tracking Free</Link>
                                <Link to="/login" className="btn btn-outline text-white border-white btn-lg">View Demo</Link>
                            </div>
                            <div className="hero-trust mt-4 text-muted flex items-center gap-2">
                                <ShieldCheck size={20} className="text-success" /> Bank-level 256-bit encryption standard.
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hero-visual"
                        >
                            <div className="glass-card hero-mockup">
                                <div className="mockup-header border-b border-gray-700 pb-3 mb-4 flex justify-between">
                                    <div className="flex gap-2">
                                        <div className="dot bg-danger rounded-full w-3 h-3"></div>
                                        <div className="dot bg-warning rounded-full w-3 h-3"></div>
                                        <div className="dot bg-success rounded-full w-3 h-3"></div>
                                    </div>
                                    <div className="text-muted text-xs font-mono">analytics.pocketpulse.app</div>
                                </div>

                                <h3 className="text-white mb-2">Monthly Expenditure</h3>
                                <div className="flex gap-4 mb-4">
                                    <div className="flex-1 bg-darker rounded-lg p-3">
                                        <div className="text-muted text-xs uppercase mb-1">Total Limit</div>
                                        <div className="text-white font-bold">₹ 50,000</div>
                                    </div>
                                    <div className="flex-1 bg-darker rounded-lg p-3">
                                        <div className="text-muted text-xs uppercase mb-1">Spent</div>
                                        <div className="text-danger font-bold">₹ 23,450</div>
                                    </div>
                                </div>

                                <div className="chart-wrapper h-48 w-full relative">
                                    <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section py-20">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Industrial Grade Tools</h2>
                        <p className="text-muted max-w-2xl mx-auto">Built for modern professionals who want complete transparency over their wealth.</p>
                    </div>

                    <div className="grid grid-3 gap-8">
                        <motion.div whileHover={{ y: -5 }} className="glass-card text-center p-8">
                            <div className="feature-icon bg-indigo-500/20 text-indigo-400 mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <PieChart size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Advanced Analytics</h3>
                            <p className="text-muted">Break down your spending habits into beautiful, interactive, and customizable charts.</p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="glass-card text-center p-8">
                            <div className="feature-icon bg-emerald-500/20 text-emerald-400 mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Real-time Pulse</h3>
                            <p className="text-muted">Add expenses on the fly and watch your dashboard update its metrics instantly.</p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="glass-card text-center p-8">
                            <div className="feature-icon bg-pink-500/20 text-pink-400 mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
                            <p className="text-muted">Built upon highly optimized React and Django infrastructure ensuring ZERO wait times.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Landing;
