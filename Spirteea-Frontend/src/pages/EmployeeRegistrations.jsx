import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getEmployees, softDeleteEmployee, createEmployee, resetPasswordSuperAdmin } from '../api';

const EmployeeRegistrations = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showAdminDropdown, setShowAdminDropdown] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFormData, setAddFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pancardNo: '',
        aadharNo: '',
        position: '',
        department: '',
        dateOfJoining: '',
        dateOfBirth: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handlePrint = () => {
        const filteredEmployees = employees.filter(item => 
            (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        const printWindow = window.open('', '_blank');
        const html = `
            <html>
                <head>
                    <title>Employee Registrations Report</title>
                    <style>
                        body { font-family: 'Outfit', sans-serif; padding: 20px; }
                        h1 { color: #10b1ba; text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 14px; }
                        th { background-color: #f8f9fa; color: #333; }
                        tr:nth-child(even) { background-color: #fcfcfc; }
                        .footer { margin-top: 30px; text-align: right; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <h1>Employee Registrations Report</h1>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Position</th>
                                <th>Department</th>
                                <th>DOJ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredEmployees.map((item, idx) => `
                                <tr>
                                    <td>${idx + 1}</td>
                                    <td>${item.name || 'N/A'}</td>
                                    <td>${item.email || 'N/A'}</td>
                                    <td>${item.phone || 'N/A'}</td>
                                    <td>${item.position || 'N/A'}</td>
                                    <td>${item.department || 'N/A'}</td>
                                    <td>${item.dateOfJoining ? new Date(item.dateOfJoining).toLocaleDateString() : 'N/A'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="footer">
                        <p>Â© Spireeta - Admin Portal</p>
                    </div>
                    <script>
                        window.onload = function() {
                            window.print();
                        };
                    </script>
                </body>
            </html>
        `;
        printWindow.document.write(html);
        printWindow.document.close();
    };

    const handlePrintSingle = (item) => {
        const printWindow = window.open('', '_blank');
        const html = `
            <html>
                <head>
                    <title>Employee Detailed Report</title>
                    <style>
                        body { font-family: 'Outfit', sans-serif; padding: 40px; }
                        h1 { color: #10b1ba; text-align: center; margin-bottom: 30px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 14px; }
                        th { width: 35%; background-color: #f8f9fa; color: #333; }
                        .footer { margin-top: 40px; text-align: center; color: #888; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <h1>Employee Detailed Report</h1>
                    <table>
                        <tbody>
                            <tr><th>Employee ID</th><td>${item.employeeID || 'N/A'}</td></tr>
                            <tr><th>Name</th><td>${item.name || 'N/A'}</td></tr>
                            <tr><th>Email</th><td>${item.email || 'N/A'}</td></tr>
                            <tr><th>Phone</th><td>${item.phone || 'N/A'}</td></tr>
                            <tr><th>DOB</th><td>${item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString() : 'N/A'}</td></tr>
                            <tr><th>Address</th><td>${item.address || 'N/A'}</td></tr>
                            <tr><th>City</th><td>${item.city || 'N/A'}</td></tr>
                            <tr><th>Pan No</th><td>${item.pancardNo || 'N/A'}</td></tr>
                            <tr><th>Aadhar No</th><td>${item.aadharNo || 'N/A'}</td></tr>
                            <tr><th>Position</th><td>${item.position || 'N/A'}</td></tr>
                            <tr><th>Department</th><td>${item.department || 'N/A'}</td></tr>
                            <tr><th>DOJ</th><td>${item.dateOfJoining ? new Date(item.dateOfJoining).toLocaleDateString() : 'N/A'}</td></tr>
                        </tbody>
                    </table>
                    <div class="footer">Â© Spireeta - Personalized Employee Report</div>
                    <script>window.onload = () => window.print();</script>
                </body>
            </html>
        `;
        printWindow.document.write(html);
        printWindow.document.close();
    };

    const handleExportExcel = () => {
        const filteredEmployees = employees.filter(item => 
            (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        const headers = ['Index', 'Name', 'Email', 'Phone', 'Position', 'Department', 'DOJ'];
        const rows = filteredEmployees.map((item, idx) => [
            idx + 1,
            item.name || 'N/A',
            item.email || 'N/A',
            item.phone || 'N/A',
            item.position || 'N/A',
            item.department || 'N/A',
            item.dateOfJoining ? new Date(item.dateOfJoining).toLocaleDateString() : 'N/A'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `Employee_Registrations_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const filteredEmployees = employees.filter(item => 
                (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.employeeID || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSelectedIds(filteredEmployees.map(item => item._id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async (idsToDelete = null) => {
        // Handle cases where the function might be called with an event object
        const isBulkDelete = !Array.isArray(idsToDelete);
        const ids = isBulkDelete ? selectedIds : idsToDelete;
        
        if (!ids || ids.length === 0) {
            alert('Please select at least one employee to delete');
            return;
        }

        if (!window.confirm(`Are you sure you want to delete ${ids.length} employee(s)?`)) return;

        try {
            setLoading(true);
            await softDeleteEmployee({ ids: ids });
            
            if (isBulkDelete) {
                setSelectedIds([]);
            } else {
                setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
            }
            
            await fetchEmployees();
            alert('Employee(s) moved to recycle bin successfully');
        } catch (error) {
            console.error('Error deleting employees:', error);
            alert('Failed to delete employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

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

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await getEmployees();
            const data = Array.isArray(response) ? response : (response.data || []);
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setAddFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const res = await createEmployee(addFormData);
            if (res) {
                alert('Employee added successfully!');
                setIsAddModalOpen(false);
                setAddFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    pancardNo: '',
                    aadharNo: '',
                    position: '',
                    department: '',
                    dateOfJoining: '',
                    dateOfBirth: ''
                });
                fetchEmployees();
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Failed to add employee');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

                :root {
                    --primary-teal: #10b1ba;
                    --hover-teal: #0d969e;
                    --bg-overlay: rgba(255, 255, 255, 0.9);
                    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    --nav-height: 85px;
                    --border-color: #e4ecef;
                }

                .dashboard-wrapper {
                    min-height: 100vh;
                    font-family: 'Outfit', sans-serif;
                    background: #f0f5f7;
                    position: relative;
                }

                .dashboard-content {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                }

                /* Top Navbar */
                .top-navbar {
                    height: var(--nav-height);
                    background: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 60px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                    border-bottom: 1px solid var(--border-color);
                }

                .nav-left {
                    display: flex;
                    align-items: center;
                    gap: 40px;
                }

                .nav-logo {
                    height: 55px;
                    cursor: pointer;
                }

                .nav-links {
                    display: flex;
                    gap: 12px;
                }

                .nav-btn {
                    padding: 9px 22px;
                    border-radius: 6px;
                    background: var(--primary-teal);
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 14px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 4px rgba(16, 177, 186, 0.2);
                }

                .nav-btn:hover {
                    background: var(--hover-teal);
                    transform: translateY(-1px);
                }

                .nav-btn.inactive {
                    background: #66c8d0;
                }

                .nav-right {
                    display: flex;
                    align-items: center;
                }

                .admin-profile {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 5px 25px 5px 5px;
                    border: 1px solid #10b1ba;
                    border-radius: 50px;
                    background: white;
                    cursor: pointer;
                    color: #4B6279;
                    font-size: 16px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }

                .admin-profile:hover {
                    background: #f0fbfc;
                }

                .admin-icon {
                    width: 36px;
                    height: 36px;
                    border: 1px solid #10b1ba;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #10b1ba;
                    background: white;
                }

                .admin-container {
                    position: relative;
                }

                .admin-dropdown {
                    position: absolute;
                    top: calc(100% + 15px);
                    right: 0;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
                    width: 240px;
                    z-index: 1000;
                    border: 1px solid #f0f0f0;
                    padding: 10px 0;
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    color: #333;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .dropdown-item:hover {
                    background: #f0fbfc;
                    color: var(--primary-teal);
                }

                .dropdown-item svg {
                    color: #666;
                }
                
                .dropdown-item:hover svg {
                    color: var(--primary-teal);
                }

                /* Main Content Area */
                .main-container {
                    padding: 30px 60px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .data-card {
                    width: 100%;
                    background: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: var(--card-shadow);
                    border: 1px solid var(--border-color);
                }

                .card-header {
                    background: var(--primary-teal);
                    padding: 16px 28px;
                    color: white;
                }

                .card-header h2 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                }

                .card-body {
                    padding: 30px;
                }

                .toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    gap: 15px;
                }

                .search-box {
                    max-width: 350px;
                    width: 100%;
                }

                .search-input {
                    width: 100%;
                    padding: 10px 18px;
                    border-radius: 6px;
                    border: 1px solid #d9d9d9;
                    background: #f5f5f5;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .search-input:focus {
                    border-color: var(--primary-teal);
                    background: #ffffff;
                    box-shadow: 0 0 0 2px rgba(16, 177, 186, 0.1);
                }

                .action-buttons {
                    display: flex;
                    gap: 12px;
                }

                .action-btn {
                    padding: 9px 18px;
                    border-radius: 6px;
                    border: 1px solid #d9d9d9;
                    background: white;
                    color: #555;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .action-btn:hover {
                    border-color: var(--primary-teal);
                    color: var(--primary-teal);
                }

                .action-btn.delete {
                    background: #f5f5f5;
                    color: #bbb;
                    cursor: not-allowed;
                }

                .selected-row {
                    background: #f0fbfc !important;
                }

                .action-btn.add {
                    border-color: #d9d9d9;
                    color: #555;
                }

                /* Table Styling */
                .table-container {
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    overflow-x: auto;
                    margin-bottom: 20px;
                }

                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                    min-width: 1400px;
                }

                .data-table th {
                    background: #fafafa;
                    padding: 14px 15px;
                    font-weight: 600;
                    font-size: 14px;
                    color: #262626;
                    border-bottom: 1px solid var(--border-color);
                    border-right: 1px solid var(--border-color);
                    white-space: nowrap;
                }

                .data-table td {
                    padding: 14px 15px;
                    font-size: 14px;
                    color: #595959;
                    border-bottom: 1px solid var(--border-color);
                    border-right: 1px solid var(--border-color);
                    white-space: nowrap;
                }

                .data-table tr:hover {
                    background: #fafafa;
                }

                .sort-icons {
                    display: inline-flex;
                    flex-direction: column;
                    vertical-align: middle;
                    margin-left: 8px;
                }

                .sort-icon {
                    font-size: 8px;
                    line-height: 1;
                    color: #bfbfbf;
                }

                .check-col {
                    width: 50px;
                    text-align: center;
                }

                .checkbox-custom {
                    width: 16px;
                    height: 16px;
                }

                .action-icons {
                    display: flex;
                    gap: 15px;
                    color: var(--primary-teal);
                }

                .action-icon {
                    cursor: pointer;
                    font-size: 16px;
                    transition: transform 0.2s ease;
                }

                .action-icon:hover {
                    transform: scale(1.2);
                    opacity: 0.8;
                }

                /* Pagination */
                .pagination-footer {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 15px;
                    margin-top: 10px;
                }

                .pagination-nav {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .page-number {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    border: 1px solid #d9d9d9;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s;
                }

                .page-number.active {
                    background: var(--primary-teal);
                    color: white;
                    border-color: var(--primary-teal);
                }

                .page-number:hover:not(.active) {
                    border-color: var(--primary-teal);
                    color: var(--primary-teal);
                }

                .page-arrow {
                    color: #bfbfbf;
                    font-size: 12px;
                    cursor: pointer;
                }

                .page-size-select {
                    padding: 6px 12px;
                    border: 1px solid #d9d9d9;
                    border-radius: 4px;
                    font-size: 14px;
                    background: #fff;
                    color: #595959;
                    outline: none;
                }

                /* Modal Styling */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(1px);
                }

                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                .modal-card {
                    background: white;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 650px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
                    animation: modalFadeIn 0.2s ease-out;
                    border: 1px solid #f3f4f6;
                }

                .modal-header {
                    padding: 20px 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #eee;
                }

                .modal-header h3 {
                    margin: 0;
                    font-size: 20px;
                    color: #111827;
                    font-weight: 700;
                }

                .modal-close-btn {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                    line-height: 1;
                }

                .modal-body {
                    padding: 25px;
                    overflow-y: auto;
                }

                .detail-line {
                    font-size: 15px;
                    color: #6c757d;
                    margin-bottom: 14px;
                    line-height: 1.5;
                }

                .detail-line strong {
                    color: #4b6279;
                    font-weight: 600;
                }

                .modal-footer {
                    padding: 20px 25px;
                    border-top: 1px solid #f3f4f6;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                }

                .modal-btn {
                    padding: 10px 24px;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                    background: white;
                    color: #4b5563;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.2s;
                }

                .modal-btn:hover {
                    background: #f9fafb;
                    border-color: #d1d5db;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #444;
                }

                .form-group label span {
                    color: #ff4d4f;
                    margin-right: 4px;
                }

                .form-input {
                    width: 100%;
                    padding: 12px 15px;
                    background-color: #f5f5f5;
                    border: 1px solid transparent;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: all 0.3s;
                    box-sizing: border-box;
                }

                .form-input:focus {
                    background-color: #fff;
                    border-color: #10b1ba;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(16, 177, 186, 0.1);
                }

                .add-btn {
                    background: #10b1ba !important;
                    color: #fff !important;
                    border: none !important;
                    box-shadow: 0 4px 6px -1px rgba(16, 177, 186, 0.2);
                }

                .add-btn:hover {
                    background: #0d969e !important;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 8px -1px rgba(16, 177, 186, 0.3);
                }

                .add-btn:active {
                    transform: translateY(0);
                }

                .add-btn:disabled {
                    background: #9ca3af !important;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }
                `}
            </style>

            <div className="dashboard-content">
                {/* Navbar */}
                <nav className="top-navbar">
                    <div className="nav-left">
                        <img 
                            src="/next_assets/static/media/logo-spirita.eb124c62.jpg" 
                            alt="Spirita Logo" 
                            className="nav-logo" 
                            onClick={() => navigate('/')}
                        />
                        <div className="nav-links">
                            <button className="nav-btn inactive" onClick={() => navigate('/dashboard/registrations-enquiry')}>Registrations Enquiry</button>
                            <button className="nav-btn inactive" onClick={() => navigate('/dashboard/enrolled-students')}>Enrolled Students</button>
                            <button className="nav-btn" onClick={() => navigate('/dashboard/employee-registrations')}>Employee Registrations</button>
                        </div>
                    </div>
                    <div className="nav-right">
                        <div className="admin-container">
                            <div className="admin-profile" onClick={() => setShowAdminDropdown(!showAdminDropdown)}>
                                <div className="admin-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                                <span>Admin</span>
                            </div>

                            {showAdminDropdown && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="admin-dropdown"
                                >
                                    <div className="dropdown-item" onClick={() => navigate('/login')}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                                        Sign out
                                    </div>
                                    <div className="dropdown-item" onClick={handleForgotPassword}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/></svg>
                                        Forgot Password
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="main-container">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="data-card"
                    >
                        <div className="card-header">
                            <h2>Employee Registrations</h2>
                        </div>
                        <div className="card-body">
                            <div className="toolbar">
                                <div className="search-box">
                                    <input 
                                        type="text" 
                                        className="search-input" 
                                        placeholder="Search..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="action-buttons">
                                    <button className="action-btn" onClick={handlePrint}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                        Print
                                    </button>
                                    <button className="action-btn" onClick={handleExportExcel}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        Export to Excel
                                    </button>
                                    <button 
                                        className={`action-btn ${selectedIds.length === 0 ? 'delete' : ''}`}
                                        style={selectedIds.length > 0 ? { backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#fecaca', cursor: 'pointer' } : {}}
                                        disabled={selectedIds.length === 0}
                                        onClick={handleDeleteSelected}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        Delete Selected
                                    </button>
                                    <button className="action-btn add" onClick={() => setIsAddModalOpen(true)}>
                                        <span style={{fontSize: '18px', fontWeight: 'bold'}}>+</span>
                                        Add Employee
                                    </button>
                                    <button className="action-btn" onClick={() => navigate('/dashboard/recycle-bin')}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        Recycle Bin
                                    </button>
                                </div>
                            </div>

                            <div className="table-container">
                                <table className="data-table">                                    <thead>
                                        <tr>
                                            <th className="check-col">
                                                <input 
                                                    type="checkbox" 
                                                    className="checkbox-custom" 
                                                    onChange={handleSelectAll}
                                                    checked={selectedIds.length > 0 && selectedIds.length === employees.filter(item => (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())).length}
                                                />
                                            </th>
                                            <th>Index</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>DOJ</th>
                                            <th>DOB</th>
                                            <th style={{ textAlign: 'center' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="10" style={{textAlign: 'center', padding: '50px', background: 'white'}}>
                                                    <div className="loading-spinner"></div>
                                                    <p style={{marginTop: '10px', color: '#666'}}>Fetching employees...</p>
                                                </td>
                                            </tr>
                                        ) : employees.length === 0 ? (
                                            <tr>
                                                <td colSpan="10" style={{textAlign: 'center', padding: '50px', background: 'white'}}>
                                                    <p style={{color: '#666'}}>No employees found</p>
                                                </td>
                                            </tr>
                                        ) : employees.filter(item => 
                                            (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
                                        ).map((item, idx) => (
                                            <tr key={item._id || idx} className={selectedIds.includes(item._id) ? 'selected-row' : ''}>
                                                <td className="check-col">
                                                    <input 
                                                        type="checkbox" 
                                                        className="checkbox-custom" 
                                                        checked={selectedIds.includes(item._id)}
                                                        onChange={() => handleSelectOne(item._id)}
                                                    />
                                                </td>
                                                <td>{idx + 1}</td>
                                                <td style={{fontWeight: 500, color: '#262626'}}>{item.name}</td>
                                                <td style={{color: '#595959'}}>{item.email}</td>
                                                <td style={{color: '#595959'}}>{item.phone}</td>
                                                <td style={{color: '#595959'}}>{item.position}</td>
                                                <td style={{color: '#595959'}}>{item.department}</td>
                                                <td style={{color: '#595959'}}>{item.dateOfJoining ? new Date(item.dateOfJoining).toLocaleDateString('en-GB') : 'N/A'}</td>
                                                <td style={{color: '#595959'}}>{item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString('en-GB') : 'N/A'}</td>
                                                <td>
                                                    <div className="action-icons" style={{ justifyContent: 'center' }}>
                                                        <span className="action-icon" onClick={() => { setSelectedEmployee(item); setIsModalOpen(true); }} title="View">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </span>
                                                        <span className="action-icon" title="Edit">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                        </span>
                                                        <span className="action-icon" style={{color: '#10b1ba'}} onClick={() => handleDeleteSelected([item._id])} title="Delete">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="pagination-footer">
                                <div className="page-arrow">â®</div>
                                <div className="pagination-nav">
                                    <span className="page-number active">1</span>
                                </div>
                                <div className="page-arrow">â¯</div>
                                <select className="page-size-select">
                                    <option>5 / page</option>
                                    <option>10 / page</option>
                                    <option>20 / page</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Employee Details Modal */}
            {isModalOpen && selectedEmployee && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Employee Details</h3>
                            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-line"><strong>Employee ID:</strong> {selectedEmployee.employeeID || 'N/A'}</div>
                            <div className="detail-line"><strong>Name:</strong> {selectedEmployee.name || 'N/A'}</div>
                            <div className="detail-line"><strong>Email:</strong> {selectedEmployee.email || 'N/A'}</div>
                            <div className="detail-line"><strong>Phone:</strong> {selectedEmployee.phone || 'N/A'}</div>
                            <div className="detail-line"><strong>Date of Birth:</strong> {selectedEmployee.dateOfBirth ? new Date(selectedEmployee.dateOfBirth).toLocaleDateString('en-GB') : 'N/A'}</div>
                            
                            <hr style={{margin: '20px 0', border: 'none', borderTop: '1px solid #eee'}} />

                            <div className="detail-line"><strong>Address:</strong> {selectedEmployee.address || 'N/A'}</div>
                            <div className="detail-line"><strong>City:</strong> {selectedEmployee.city || 'N/A'}</div>
                            <div className="detail-line"><strong>Pan No:</strong> {selectedEmployee.pancardNo || 'N/A'}</div>
                            <div className="detail-line"><strong>Aadhar No:</strong> {selectedEmployee.aadharNo || 'N/A'}</div>
                            
                            <hr style={{margin: '20px 0', border: 'none', borderTop: '1px solid #eee'}} />

                            <div className="detail-line"><strong>Position:</strong> {selectedEmployee.position || 'N/A'}</div>
                            <div className="detail-line"><strong>Department:</strong> {selectedEmployee.department || 'N/A'}</div>
                            <div className="detail-line"><strong>Date of Joining:</strong> {selectedEmployee.dateOfJoining ? new Date(selectedEmployee.dateOfJoining).toLocaleDateString('en-GB') : 'N/A'}</div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn" onClick={() => handlePrintSingle(selectedEmployee)}>Print</button>
                            <button className="modal-btn" onClick={() => setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Add Employee Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="modal-card" 
                        onClick={e => e.stopPropagation()}
                        style={{ maxWidth: '600px' }}
                    >
                        <div className="modal-header">
                            <h3 style={{ fontSize: '18px' }}>Add Employee</h3>
                            <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleAddSubmit}>
                            <div className="modal-body" style={{ maxHeight: '70vh' }}>
                                <div className="form-group">
                                    <label><span>*</span>Name</label>
                                    <input type="text" name="name" className="form-input" value={addFormData.name} onChange={handleAddInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label><span>*</span>Email</label>
                                    <input type="email" name="email" className="form-input" value={addFormData.email} onChange={handleAddInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label><span>*</span>Phone</label>
                                    <input type="tel" name="phone" className="form-input" value={addFormData.phone} onChange={handleAddInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" name="address" className="form-input" value={addFormData.address} onChange={handleAddInputChange} />
                                </div>
                                <div className="form-group">
                                    <label><span>*</span>City</label>
                                    <input type="text" name="city" className="form-input" value={addFormData.city} onChange={handleAddInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Pancard</label>
                                    <input type="text" name="pancardNo" className="form-input" value={addFormData.pancardNo} onChange={handleAddInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Adhar</label>
                                    <input type="text" name="aadharNo" className="form-input" value={addFormData.aadharNo} onChange={handleAddInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Position</label>
                                    <input type="text" name="position" className="form-input" value={addFormData.position} onChange={handleAddInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Department</label>
                                    <input type="text" name="department" className="form-input" value={addFormData.department} onChange={handleAddInputChange} />
                                </div>
                                <div className="form-group">
                                    <label><span>*</span>Date of Joining</label>
                                    <input type="date" name="dateOfJoining" className="form-input" value={addFormData.dateOfJoining} onChange={handleAddInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label><span>*</span>Date of Birth</label>
                                    <input type="date" name="dateOfBirth" className="form-input" value={addFormData.dateOfBirth} onChange={handleAddInputChange} required />
                                </div>
                            </div>
                            <div className="modal-footer" style={{ borderTop: '1.5px solid #f3f4f6', padding: '20px 30px', justifyContent: 'flex-end' }}>
                                <button type="submit" className="modal-btn add-btn" disabled={isSubmitting} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {isSubmitting ? 'Adding...' : (
                                        <>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            Add
                                        </>
                                    )}
                                </button>
                                <button type="button" className="modal-btn" onClick={() => setIsAddModalOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default EmployeeRegistrations;

