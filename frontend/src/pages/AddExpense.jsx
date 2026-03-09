import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, ArrowLeft, Loader } from 'lucide-react';
import api from '../api';

function AddExpense() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories/');
            setCategories(res.data);
            if (res.data.length > 0) {
                setFormData(prev => ({ ...prev, category: res.data[0].id }));
            }
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.post('/expenses/', formData);
            navigate('/expenses');
        } catch (err) {
            alert('Failed to save expense. Please check your inputs.');
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="loading flex items-center justify-center min-h-screen text-white"><Loader className="animate-spin mr-2" /> Loading...</div>;
    }

    return (
        <div className="dashboard-layout">


            <div className="container mt-4">
                <div className="header-flex mb-4">
                    <h2 className="page-title"><Plus className="icon-mr" /> Add New Expense</h2>
                    <Link to="/expenses" className="btn btn-outline"><ArrowLeft className="icon-mr" /> Back to List</Link>
                </div>

                <div className="glass-card max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="grid grid-2 gap-4 mb-4">
                            <div className="form-group mb-0">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Dinner with clients"
                                />
                            </div>
                            <div className="form-group mb-0">
                                <label>Amount (₹)</label>
                                <input
                                    type="number"
                                    name="amount"
                                    step="0.01"
                                    className="form-control"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="grid grid-2 gap-4 mb-4">
                            <div className="form-group mb-0">
                                <label>Category</label>
                                <select
                                    name="category"
                                    className="form-control"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mb-0">
                                <label>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label>Description (Optional)</label>
                            <textarea
                                name="description"
                                className="form-control"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Additional details..."
                            ></textarea>
                        </div>

                        <div className="text-right">
                            <Link to="/expenses" className="btn btn-outline mr-2" style={{ marginRight: '0.5rem' }}>Cancel</Link>
                            <button type="submit" className="btn btn-primary-custom" disabled={saving}>
                                {saving ? "Saving..." : "Save Expense"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddExpense;
