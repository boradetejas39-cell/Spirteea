import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    getAllDeletedEnquiry, getDeletedGeneralEnquiry, getDeletedResumeEnquiry,
    getAllDeletedStudents, getDeletedEmployees,
    restoreEnquiry, restoreGeneralEnquiry, restoreResumeEnquiry,
    restoreStudent, restoreEmployee,
    permanentDeleteEnquiry, permanentDeleteGeneralEnquiry, permanentDeleteResumeEnquiry,
    permanentDeleteStudents, permanentDeleteEmployee,
    resetPasswordSuperAdmin
} from '../api';

const RecycleBin = () => {
    const [activeTab, setActiveTab] = useState('enquiries');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAdminDropdown, setShowAdminDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDeletedItems();
    }, [activeTab]);

    const handleForgotPassword = async () => {
        try {
            const adminData = localStorage.getItem('adminUser');
            if (!adminData) {
                alert('Session expired. Please login again.');
                navigate('/login');
                return;
            }
            const admin = JSON.parse(adminData);
            if (!window.confirm(`Request a password reset link? It will be sent to admin@spireeta.com.`)) return;
            
            setLoading(true);
            const res = await resetPasswordSuperAdmin({ email: admin.email });
            alert(res.message || 'Reset link sent to admin@spireeta.com');
        } catch (error) {
            console.error('Reset error:', error);
            alert(error.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    const fetchDeletedItems = async () => {
        try {
            setLoading(true);
            setSelectedIds([]);
            let data = [];

            if (activeTab === 'enquiries') {
                const [regRes, genRes, resRes] = await Promise.all([
                    getAllDeletedEnquiry().catch(() => ({ data: [] })),
                    getDeletedGeneralEnquiry().catch(() => ({ data: [] })),
                    getDeletedResumeEnquiry().catch(() => ({ data: [] }))
                ]);

                const regData = (regRes.data || []).map(item => ({ ...item, source: 'Registration', name: item.nameOfTheStudent }));
                const genData = (genRes.data || []).map(item => ({ ...item, source: 'Contact Form', name: item.name }));
                const resData = (resRes.data || []).map(item => ({ ...item, source: 'Resume', name: item.name }));
                data = [...regData, ...genData, ...resData];
            } else if (activeTab === 'students') {
                const res = await getAllDeletedStudents().catch(() => ({ data: [] }));
                data = (res.data || []).map(item => ({ ...item, name: item.nameOfTheStudent }));
            } else if (activeTab === 'employees') {
                const res = await getDeletedEmployees().catch(() => ({ data: [] }));
                data = (res.data || []);
            }

            setItems(data.sort((a, b) => new Date(b.deletedAt || b.updatedAt) - new Date(a.deletedAt || a.updatedAt)));
        } catch (error) {
            console.error('Error fetching deleted items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (item) => {
        if (!window.confirm('Restore this item?')) return;
        try {
            setLoading(true);
            if (activeTab === 'enquiries') {
                if (item.source === 'Registration') await restoreEnquiry({ ids: [item._id] });
                else if (item.source === 'Contact Form') await restoreGeneralEnquiry({ ids: [item._id] });
                else if (item.source === 'Resume') await restoreResumeEnquiry({ ids: [item._id] });
            } else if (activeTab === 'students') {
                await restoreStudent({ ids: [item._id] });
            } else if (activeTab === 'employees') {
                await restoreEmployee({ ids: [item._id] });
            }
            await fetchDeletedItems();
        } catch (error) {
            alert('Failed to restore');
        } finally {
            setLoading(false);
        }
    };

    const handlePermanentDelete = async (item) => {
        if (!window.confirm('PERMANENTLY DELETE this item? This cannot be undone.')) return;
        try {
            setLoading(true);
            if (activeTab === 'enquiries') {
                if (item.source === 'Registration') await permanentDeleteEnquiry({ ids: [item._id] });
                else if (item.source === 'Contact Form') await permanentDeleteGeneralEnquiry({ ids: [item._id] });
                else if (item.source === 'Resume') await permanentDeleteResumeEnquiry({ ids: [item._id] });
            } else if (activeTab === 'students') {
                await permanentDeleteStudents({ ids: [item._id] });
            } else if (activeTab === 'employees') {
                await permanentDeleteEmployee({ ids: [item._id] });
            }
            await fetchDeletedItems();
        } catch (error) {
            alert('Failed to delete');
        } finally {
            setLoading(false);
        }
    };

    const handleRestoreSelected = async () => {
        if (!window.confirm(`Restore ${selectedIds.length} items?`)) return;
        try {
            setLoading(true);
            const selectedItems = items.filter(item => selectedIds.includes(item._id));
            const promises = [];

            if (activeTab === 'enquiries') {
                const regIds = selectedItems.filter(item => item.source === 'Registration').map(item => item._id);
                const genIds = selectedItems.filter(item => item.source === 'Contact Form').map(item => item._id);
                const resIds = selectedItems.filter(item => item.source === 'Resume').map(item => item._id);
                if (regIds.length > 0) promises.push(restoreEnquiry({ ids: regIds }));
                if (genIds.length > 0) promises.push(restoreGeneralEnquiry({ ids: genIds }));
                if (resIds.length > 0) promises.push(restoreResumeEnquiry({ ids: resIds }));
            } else if (activeTab === 'students') {
                promises.push(restoreStudent({ ids: selectedIds }));
            } else if (activeTab === 'employees') {
                promises.push(restoreEmployee({ ids: selectedIds }));
            }

            await Promise.all(promises);
            fetchDeletedItems();
        } catch (error) {
            alert('Failed to restore items');
        } finally {
            setLoading(false);
        }
    };

    const handlePermanentDeleteSelected = async () => {
        if (!window.confirm(`PERMANENTLY DELETE ${selectedIds.length} items? This cannot be undone.`)) return;
        try {
            setLoading(true);
            const selectedItems = items.filter(item => selectedIds.includes(item._id));
            const promises = [];

            if (activeTab === 'enquiries') {
                const regIds = selectedItems.filter(item => item.source === 'Registration').map(item => item._id);
                const genIds = selectedItems.filter(item => item.source === 'Contact Form').map(item => item._id);
                const resIds = selectedItems.filter(item => item.source === 'Resume').map(item => item._id);
                if (regIds.length > 0) promises.push(permanentDeleteEnquiry({ ids: regIds }));
                if (genIds.length > 0) promises.push(permanentDeleteGeneralEnquiry({ ids: genIds }));
                if (resIds.length > 0) promises.push(permanentDeleteResumeEnquiry({ ids: resIds }));
            } else if (activeTab === 'students') {
                promises.push(permanentDeleteStudents({ ids: selectedIds }));
            } else if (activeTab === 'employees') {
                promises.push(permanentDeleteEmployee({ ids: selectedIds }));
            }

            await Promise.all(promises);
            fetchDeletedItems();
        } catch (error) {
            alert('Failed to delete items');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredItems.map(item => item._id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredItems = items.filter(item => 
        (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.employeeID || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-wrapper">
            <style>{`
                .dashboard-wrapper {
                    display: flex;
                    min-height: 100vh;
                    background-color: #f0f2f5;
                    font-family: 'Outfit', sans-serif;
                }

                /* Sidebar Styles */
                .sidebar {
                    width: 280px;
                    background: #fff;
                    border-right: 1px solid #e5e7eb;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 4px 0 10px rgba(0,0,0,0.02);
                }

                .sidebar-logo {
                    padding: 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border-bottom: 1px solid #f3f4f6;
                }

                .sidebar-logo img {
                    height: 40px;
                }

                .sidebar-logo span {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1a1a1a;
                }

                .sidebar-nav {
                    padding: 20px 15px;
                    flex: 1;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    color: #4b5563;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin-bottom: 4px;
                    font-weight: 500;
                }

                .nav-item:hover {
                    background: #f9fafb;
                    color: #10b1ba;
                }

                .nav-item.active {
                    background: #f0fbfc;
                    color: #10b1ba;
                }

                /* Main Content Styles */
                .main-content {
                    flex: 1;
                    padding: 30px;
                    overflow-y: auto;
                }

                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }

                .header-left h1 {
                    font-size: 24px;
                    font-weight: 700;
                    color: #111827;
                    margin: 0;
                }

                .header-left p {
                    color: #6b7280;
                    margin: 4px 0 0 0;
                }

                /* Admin Profile Toggle */
                .admin-profile-container {
                    position: relative;
                }

                .admin-profile-btn {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: #fff;
                    padding: 8px 16px;
                    border-radius: 50px;
                    border: 1px solid #10b1ba;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-weight: 500;
                }

                .admin-avatar {
                    width: 32px;
                    height: 32px;
                    background: #fff;
                    border-radius: 50%;
                    border: 1.5px solid #10b1ba;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .admin-dropdown {
                    position: absolute;
                    top: calc(100% + 10px);
                    right: 0;
                    width: 220px;
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    border: 1px solid #f3f4f6;
                    padding: 8px;
                    z-index: 100;
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 12px;
                    color: #4b5563;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .dropdown-item:hover {
                    background: #f9fafb;
                    color: #10b1ba;
                }

                /* Recycle Bin Card Styling */
                .recycle-card {
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                }

                .recycle-header {
                    background: #10b1ba;
                    padding: 15px 25px;
                }

                .recycle-header h2 {
                    color: #fff;
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                }

                .recycle-body {
                    padding: 25px;
                }

                .toolbar-row {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 25px;
                }

                .search-container {
                    position: relative;
                    width: 300px;
                }

                .search-input-custom {
                    width: 100%;
                    padding: 10px 15px;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: all 0.2s;
                    outline: none;
                }

                .search-input-custom:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .btn-action-custom {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                    background: #fff;
                    font-size: 14px;
                    font-weight: 500;
                    color: #4b5563;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-action-custom:hover:not(:disabled) {
                    background: #f9fafb;
                }

                .btn-action-custom:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    color: #9ca3af;
                }

                .btn-back-custom {
                    border-color: #e5e7eb;
                    color: #111827;
                }

                /* Table Styling */
                .table-wrapper {
                    border: 1px solid #f0f0f0;
                    border-radius: 8px;
                    overflow-x: auto;
                }

                .custom-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .custom-table th {
                    background: #fafafa;
                    padding: 15px;
                    text-align: left;
                    font-size: 14px;
                    font-weight: 600;
                    color: #374151;
                    border-bottom: 2px solid #f3f4f6;
                }

                .custom-table td {
                    padding: 15px;
                    font-size: 14px;
                    color: #4b5563;
                    border-bottom: 1px solid #f3f4f6;
                    white-space: nowrap;
                }

                .custom-table tr:hover {
                    background: #f9fafb;
                }

                .custom-table tr.selected-row {
                    background: #f0fbfc;
                }

                .checkbox-custom {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                }

                .action-btns-cell {
                    display: flex;
                    gap: 15px;
                }

                .icon-action-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #3b82f6;
                    padding: 5px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                .icon-action-btn:hover {
                    background: rgba(59, 130, 246, 0.1);
                }

                .icon-action-btn.delete {
                    color: #3b82f6;
                }

                .icon-action-btn.restore svg {
                    transform: scaleX(-1);
                }

                .tabs-strip {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #f3f4f6;
                }

                .tab-trigger {
                    padding: 10px 20px;
                    font-size: 14px;
                    font-weight: 600;
                    border: none;
                    background: none;
                    cursor: pointer;
                    color: #6b7280;
                    position: relative;
                }

                .tab-trigger.active {
                    color: #10b1ba;
                }

                .tab-trigger.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #10b1ba;
                }
            `}</style>

            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src="https://spireeta.com/assets/img/logo.png" alt="Spireeta" />
                    <span>Admin Panel</span>
                </div>
                <nav className="sidebar-nav">
                    <div className="nav-item" onClick={() => navigate('/dashboard/registrations-enquiry')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                        Registrations Enquiry
                    </div>
                    <div className="nav-item" onClick={() => navigate('/dashboard/enrolled-students')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-3-3.87"></path><path d="M9 21v-2a4 4 0 0 1-3-3.87"></path><circle cx="9" cy="7" r="4"></circle><circle cx="17" cy="7" r="4"></circle></svg>
                        Enrolled Students
                    </div>
                    <div className="nav-item" onClick={() => navigate('/dashboard/employee-registrations')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        Employee Registrations
                    </div>
                    <div className="nav-item active">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        Recycle Bin
                    </div>
                </nav>
            </div>

            <div className="main-content">
                <header className="dashboard-header">
                    <div className="header-left">
                        <h1>Recycle Bin</h1>
                        <p>Manage and restore deleted records</p>
                    </div>
                    <div className="header-right">
                        <div className="admin-profile-container">
                            <button className="admin-profile-btn" onClick={() => setShowAdminDropdown(!showAdminDropdown)}>
                                <div className="admin-avatar">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b1ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                                <span>Admin</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transform: showAdminDropdown ? 'rotate(180deg)' : 'none', transition: '0.2s'}}><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            {showAdminDropdown && (
                                <div className="admin-dropdown">
                                    <div className="dropdown-item" onClick={handleForgotPassword}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                        Forgot Password
                                    </div>
                                    <div className="dropdown-item" onClick={() => navigate('/login')}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        Sign out
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="tabs-strip">
                    <button className={`tab-trigger ${activeTab === 'enquiries' ? 'active' : ''}`} onClick={() => setActiveTab('enquiries')}>Enquiries</button>
                    <button className={`tab-trigger ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>Students</button>
                    <button className={`tab-trigger ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => setActiveTab('employees')}>Employees</button>
                </div>

                <div className="recycle-card">
                    <div className="recycle-header">
                        <h2>{activeTab === 'enquiries' ? 'Registrations Enquiry' : activeTab === 'students' ? 'Enrolled Students' : 'Employee Registrations'}</h2>
                    </div>
                    <div className="recycle-body">
                        <div className="toolbar-row">
                            <div className="search-container">
                                <input 
                                    type="text" 
                                    className="search-input-custom" 
                                    placeholder="Search..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button 
                                className="btn-action-custom" 
                                disabled={selectedIds.length === 0}
                                onClick={handlePermanentDeleteSelected}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                Permanent Delete Selected
                            </button>
                            <button 
                                className="btn-action-custom" 
                                disabled={selectedIds.length === 0}
                                onClick={handleRestoreSelected}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transform: 'scaleX(-1)'}}><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                Restore Selected
                            </button>
                            <button className="btn-action-custom btn-back-custom" onClick={() => navigate(-1)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                Go Back
                            </button>
                        </div>

                        <div className="table-wrapper">
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th style={{width: '40px'}}><input type="checkbox" className="checkbox-custom" onChange={handleSelectAll} checked={selectedIds.length > 0 && selectedIds.length === filteredItems.length} /></th>
                                        <th style={{width: '60px'}}>Index</th>
                                        {activeTab === 'employees' ? <th>Employee ID</th> : <th>Student Name</th>}
                                        {activeTab === 'employees' ? <th>Name</th> : <th>College Name</th>}
                                        {activeTab === 'enquiries' ? <th>Educational Degree</th> : activeTab === 'students' ? <th>ITP ID</th> : <th>Email</th>}
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Date</th>
                                        <th style={{width: '100px'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="9" style={{textAlign: 'center', padding: '40px'}}>Loading...</td></tr>
                                    ) : filteredItems.length === 0 ? (
                                        <tr><td colSpan="9" style={{textAlign: 'center', padding: '40px'}}>No deleted records found</td></tr>
                                    ) : (
                                        filteredItems.map((item, idx) => (
                                            <tr key={item._id} className={selectedIds.includes(item._id) ? 'selected-row' : ''}>
                                                <td><input type="checkbox" className="checkbox-custom" checked={selectedIds.includes(item._id)} onChange={() => handleSelectOne(item._id)} /></td>
                                                <td>{idx + 1}</td>
                                                <td>{activeTab === 'employees' ? (item.employeeID || 'N/A') : (item.name || 'N/A')}</td>
                                                <td>{activeTab === 'employees' ? (item.name || 'N/A') : (item.collegeName || 'N/A')}</td>
                                                <td>{activeTab === 'enquiries' ? (item.educationalDegree || 'N/A') : activeTab === 'students' ? (item.itpNumber || 'N/A') : (item.email || 'N/A')}</td>
                                                <td>{item.email || 'N/A'}</td>
                                                <td>{item.phone || 'N/A'}</td>
                                                <td>{new Date(item.deletedAt || item.createdAt).toLocaleDateString('en-GB')}</td>
                                                <td className="action-btns-cell">
                                                    <button className="icon-action-btn restore" title="Restore" onClick={() => handleRestore(item)}>
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                                    </button>
                                                    <button className="icon-action-btn delete" title="Permanent Delete" onClick={() => handlePermanentDelete(item)}>
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecycleBin;
