import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layers, Plus, Edit, Trash2 } from 'lucide-react';
import api from '../api';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories/');
            setCategories(res.data);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        setLoading(true);
        try {
            await api.post('/categories/', { name: newCategory });
            setNewCategory('');
            fetchCategories();
        } catch (err) {
            alert('Failed to add category. Note: Names must be unique.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure? Removing a category will keep any existing expenses but their category will be set to Uncategorized.')) {
            try {
                await api.delete(`/categories/${id}/`);
                fetchCategories();
            } catch (err) {
                alert('Failed to delete category');
            }
        }
    };

    return (
        <div className="dashboard-layout">
            <div className="container mt-4">
                <div className="header-flex mb-4">
                    <h2 className="page-title"><Layers className="icon-mr" /> Manage Categories</h2>
                </div>

                <div className="glass-card mb-4 p-4 d-flex gap-4 filter-card">
                    <form onSubmit={handleAddCategory} className="flex-1 d-flex gap-4 align-items-end">
                        <div className="flex-1">
                            <label className="form-label text-muted">New Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Travel, Software, Logistics"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary-custom" style={{ height: '42px' }}>
                            <Plus size={18} className="icon-mr" /> {loading ? 'Adding...' : 'Add'}
                        </button>
                    </form>
                </div>

                <div className="glass-card table-card">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td className="fw-medium">{cat.name}</td>
                                    <td className="text-right gap-2 action-cell">
                                        <button className="btn-icon text-danger" onClick={() => handleDelete(cat.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan="2" className="text-center py-4 text-muted">No categories available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
