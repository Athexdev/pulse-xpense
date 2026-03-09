import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, TrendingUp, Clock, LogOut, Grid } from 'lucide-react';
import api from '../api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend, ArcElement);

function Dashboard() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await api.get('/dashboard/');
            setData(res.data);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('access_token');
                navigate('/login');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    if (!data) return <div className="loading">Loading...</div>;

    const chartData = {
        labels: data.category_data.map(item => item.category),
        datasets: [
            {
                data: data.category_data.map(item => item.value),
                backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="dashboard-layout">


            <div className="container mt-4">
                <div className="header-flex">
                    <div>
                        <h2 className="page-title"><Grid className="icon-mr" /> Dashboard Overview</h2>
                        <p className="text-muted">Welcome back! Here is your expense summary.</p>
                    </div>
                    <Link to="/add-expense" className="btn btn-primary-custom"><Wallet className="icon-mr" /> Add Expense</Link>
                </div>

                <div className="grid grid-2 gap-4 mt-4">
                    <div className="glass-card stat-card">
                        <div className="stat-icon primary">
                            <Wallet size={32} />
                        </div>
                        <div>
                            <h6 className="stat-title">Total Expenses</h6>
                            <h3 className="stat-value">₹{data.total_expenses.toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className="glass-card stat-card">
                        <div className="stat-icon success">
                            <TrendingUp size={32} />
                        </div>
                        <div>
                            <h6 className="stat-title">This Month</h6>
                            <h3 className="stat-value success">₹{data.current_month_expenses.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-charts gap-4 mt-4">
                    <div className="glass-card flex-col">
                        <h5 className="card-title">Expenses by Category</h5>
                        <div className="chart-container">
                            {data.category_data.length > 0 ? (
                                <Doughnut data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#f8fafc' } } } }} />
                            ) : (
                                <p className="text-muted text-center pt-8">No expenses found.</p>
                            )}
                        </div>
                    </div>

                    <div className="glass-card flex-col">
                        <div className="card-header-flex">
                            <h5 className="card-title"><Clock className="icon-mr" /> Recent Expenses</h5>
                            <Link to="/expenses" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>View All</Link>
                        </div>
                        <div className="table-responsive mt-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th className="text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.recent_expenses.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>
                                                <div className="fw-medium">{expense.title}</div>
                                                <div className="text-xs text-muted">{expense.category_name || 'Uncategorized'}</div>
                                            </td>
                                            <td>{expense.date}</td>
                                            <td className="text-right fw-bold text-danger">₹{expense.amount}</td>
                                        </tr>
                                    ))}
                                    {data.recent_expenses.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-muted">No recent expenses.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
