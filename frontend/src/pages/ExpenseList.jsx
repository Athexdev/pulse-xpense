import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { List, FileSpreadsheet, Plus, Edit, Trash2, Filter } from 'lucide-react';
import api from '../api';

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await api.get('/expenses/');
            setExpenses(res.data);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await api.delete(`/expenses/${id}/`);
                fetchExpenses();
            } catch (err) {
                alert('Failed to delete expense');
            }
        }
    };

    const filteredExpenses = expenses.filter(exp =>
        exp.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dashboard-layout">


            <div className="container mt-4">
                <div className="header-flex">
                    <h2 className="page-title"><List className="icon-mr" /> My Expenses</h2>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline"><FileSpreadsheet className="icon-mr" /> Export CSV</button>
                        <Link to="/add-expense" className="btn btn-primary-custom"><Plus className="icon-mr" /> Add Expense</Link>
                    </div>
                </div>

                <div className="glass-card mb-4 mt-4 p-4 d-flex gap-4 filter-card">
                    <div className="flex-1">
                        <label className="form-label text-muted">Search Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="d-flex align-items-end">
                        <button className="btn btn-primary-custom"><Filter size={18} className="icon-mr" /> Filter</button>
                    </div>
                </div>

                <div className="glass-card table-card">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th className="text-right">Amount</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExpenses.map((exp) => (
                                <tr key={exp.id}>
                                    <td className="text-muted">{exp.date}</td>
                                    <td className="fw-medium">{exp.title}</td>
                                    <td>
                                        <span className="badge category-badge">{exp.category_name || 'Uncategorized'}</span>
                                    </td>
                                    <td className="text-right fw-bold text-danger">₹{exp.amount}</td>
                                    <td className="text-right gap-2 action-cell">
                                        <button className="btn-icon text-primary-color"><Edit size={16} /></button>
                                        <button className="btn-icon text-danger" onClick={() => handleDelete(exp.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredExpenses.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-muted">No expenses found matching the criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExpenseList;
