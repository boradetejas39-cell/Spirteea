import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getEnquiry, getGeneralEnquiry, getResumeEnquiry, softDeleteEnquiry, softDeleteGeneralEnquiry, softDeleteResumeEnquiry, resetPasswordSuperAdmin } from '../api';

const RegistrationsEnquiry = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showAdminDropdown, setShowAdminDropdown] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handlePrint = () => {
        const filteredEnquiries = enquiries.filter(item => 
            (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        const printWindow = window.open('', '_blank');
        const html = `
            <html>
                <head>
                    <title>Registration Enquiries Report</title>
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
                    <h1>Registration Enquiries Report</h1>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>College</th>
                                <th>Degree/Service</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredEnquiries.map((item, idx) => `
                                <tr>
                                    <td>${idx + 1}</td>
                                    <td>${item.name || 'N/A'}</td>
                                    <td>${item.collegeName || 'N/A'}</td>
                                    <td>${item.educationalDegree || 'N/A'}</td>
                                    <td>${item.email || 'N/A'}</td>
                                    <td>${item.phone || 'N/A'}</td>
                                    <td>${item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</td>
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
                            // window.close(); // Optional: close the window after printing
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
        const title = item.source === 'Contact Form' ? 'Enquiry Details' : item.source === 'Resume' ? 'Resume Details' : 'Student Details';
        
        let detailsHtml = '';
        if (item.source === 'Registration') {
            detailsHtml = `
                <tr><th>Name</th><td>${item.nameOfTheStudent || item.name || 'N/A'}</td></tr>
                <tr><th>College</th><td>${item.collegeName || 'N/A'}</td></tr>
                <tr><th>College Address</th><td>${item.collegeAddress || 'N/A'}</td></tr>
                <tr><th>Degree</th><td>${item.educationalDegree || 'N/A'}</td></tr>
                <tr><th>Branch</th><td>${item.branch || 'N/A'}</td></tr>
                <tr><th>Email</th><td>${item.email || 'N/A'}</td></tr>
                <tr><th>Phone</th><td>${item.phone || 'N/A'}</td></tr>
                <tr><th>Aadhar</th><td>${item.aadharCardNumber || 'N/A'}</td></tr>
                <tr><th>PAN</th><td>${item.panNumber || 'N/A'}</td></tr>
                <tr><th>Technologies</th><td>${(item.internshipInterestedTechnologies || []).join(', ') || 'N/A'}</td></tr>
                <tr><th>Working Style</th><td>${item.workingStyle || 'N/A'}</td></tr>
            `;
        } else if (item.source === 'Contact Form') {
            detailsHtml = `
                <tr><th>Name</th><td>${item.name || 'N/A'}</td></tr>
                <tr><th>Email</th><td>${item.email || 'N/A'}</td></tr>
                <tr><th>Phone</th><td>${item.phone || 'N/A'}</td></tr>
                <tr><th>Reason</th><td>${item.serviceType || 'N/A'}</td></tr>
                <tr><th>Message</th><td>${item.message || 'N/A'}</td></tr>
            `;
        } else {
            detailsHtml = `
                <tr><th>Name</th><td>${item.name || 'N/A'}</td></tr>
                <tr><th>Email</th><td>${item.email || 'N/A'}</td></tr>
                <tr><th>Phone</th><td>${item.phone || 'N/A'}</td></tr>
                <tr><th>Resume</th><td>${item.resume || 'N/A'}</td></tr>
            `;
        }

        const html = `
            <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body { font-family: 'Outfit', sans-serif; padding: 40px; }
                        h1 { color: #10b1ba; text-align: center; margin-bottom: 30px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 15px; text-align: left; }
                        th { width: 30%; background-color: #f8f9fa; color: #333; }
                        .footer { margin-top: 40px; text-align: center; color: #888; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <h1>${title}</h1>
                    <table>
                        <tbody>
                            <tr><th>Date</th><td>${item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}</td></tr>
                            ${detailsHtml}
                        </tbody>
                    </table>
                    <div class="footer">Â© Spireeta - Personalized Report</div>
                    <script>window.onload = () => window.print();</script>
                </body>
            </html>
        `;
        printWindow.document.write(html);
        printWindow.document.close();
    };

    const handleExportExcel = () => {
        const filteredEnquiries = enquiries.filter(item => 
            (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        const headers = ['Index', 'Name', 'Type', 'College Name', 'Educational Degree', 'Email', 'Phone', 'Date'];
        const rows = filteredEnquiries.map((item, idx) => [
            idx + 1,
            item.name || 'N/A',
            item.source || 'N/A',
            item.collegeName || 'N/A',
            item.educationalDegree || 'N/A',
            item.email || 'N/A',
            item.phone || 'N/A',
            item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `Registrations_Enquiry_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const filteredEnquiries = enquiries.filter(item => 
                (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSelectedIds(filteredEnquiries.map(item => item._id));
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
        const isBulkDelete = !Array.isArray(idsToDelete);
        const ids = isBulkDelete ? selectedIds : idsToDelete;

        if (!ids || ids.length === 0) {
            alert('Please select at least one item to delete');
            return;
        }

        if (!window.confirm(`Are you sure you want to delete ${ids.length} item(s)?`)) return;

        try {
            setLoading(true);
            const itemsToDelete = enquiries.filter(item => ids.includes(item._id));
            
            const regIds = itemsToDelete.filter(item => item.source === 'Registration').map(item => item._id);
            const genIds = itemsToDelete.filter(item => item.source === 'Contact Form').map(item => item._id);
            const resIds = itemsToDelete.filter(item => item.source === 'Resume').map(item => item._id);

            const deletePromises = [];
            if (regIds.length > 0) deletePromises.push(softDeleteEnquiry({ ids: regIds }));
            if (genIds.length > 0) deletePromises.push(softDeleteGeneralEnquiry({ ids: genIds }));
            if (resIds.length > 0) deletePromises.push(softDeleteResumeEnquiry({ ids: resIds }));

            await Promise.all(deletePromises);
            
            if (isBulkDelete) {
                setSelectedIds([]);
            } else {
                setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
            }
            
            await fetchEnquiries();
            alert('Item(s) moved to recycle bin successfully');
        } catch (error) {
            console.error('Error deleting items:', error);
            alert('Failed to delete items');
        } finally {
            setLoading(false);
        }
    };

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

    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            
            // Fetch all three types of enquiries in parallel
            const [regRes, genRes, resRes] = await Promise.all([
                getEnquiry().catch(e => ({ data: [] })),
                getGeneralEnquiry().catch(e => ({ data: [] })),
                getResumeEnquiry().catch(e => ({ data: [] }))
            ]);

            const regData = (Array.isArray(regRes) ? regRes : (regRes.data || [])).map(item => ({
                ...item,
                source: 'Registration',
                name: item.nameOfTheStudent,
                collegeName: item.collegeName || 'N/A',
                educationalDegree: item.educationalDegree || 'N/A'
            }));

            const genData = (Array.isArray(genRes) ? genRes : (genRes.data || [])).map(item => ({
                ...item,
                source: 'Contact Form',
                name: item.name,
                collegeName: '-',
                educationalDegree: item.serviceType || 'General Enquiry'
            }));

            const resData = (Array.isArray(resRes) ? resRes : (resRes.data || [])).map(item => ({
                ...item,
                source: 'Resume',
                name: item.name,
                collegeName: '-',
                educationalDegree: 'Resume Submitted'
            }));

            // Combine and sort by date
            const combined = [...regData, ...genData, ...resData].sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );

            setEnquiries(combined);
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        } finally {
            setLoading(false);
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
                    min-width: 1000px;
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

                .modal-card {
                    background: white;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 85vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    animation: modalFadeIn 0.3s ease;
                }

                @keyframes modalFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
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
                    font-size: 18px;
                    color: #222;
                    font-weight: 600;
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
                    padding: 15px 25px;
                    border-top: 1px solid #eee;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                }

                .modal-btn {
                    padding: 8px 18px;
                    border-radius: 4px;
                    border: 1px solid #d9d9d9;
                    background: white;
                    color: #333;
                    cursor: pointer;
                    font-size: 14px;
                    transition: border-color 0.2s;
                }

                .modal-btn:hover {
                    border-color: #999;
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
                            <button className="nav-btn" onClick={() => navigate('/dashboard/registrations-enquiry')}>Registrations Enquiry</button>
                            <button className="nav-btn inactive" onClick={() => navigate('/dashboard/enrolled-students')}>Enrolled Students</button>
                            <button className="nav-btn inactive" onClick={() => navigate('/dashboard/employee-registrations')}>Employee Registrations</button>
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
                            <h2>List of Registration Enquiries</h2>
                        </div>
                        <div className="card-body">
                            <div className="toolbar">
                                <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                                    <div className="search-box">
                                        <input 
                                            type="text" 
                                            className="search-input" 
                                            placeholder="Search by name..." 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
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
                                    <button className="action-btn" onClick={() => navigate('/dashboard/recycle-bin')}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        Recycle Bin
                                    </button>
                                </div>
                            </div>

                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th className="check-col">
                                                <input 
                                                    type="checkbox" 
                                                    className="checkbox-custom" 
                                                    onChange={handleSelectAll}
                                                    checked={selectedIds.length > 0 && selectedIds.length === enquiries.filter(item => (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())).length}
                                                />
                                            </th>
                                            <th>Index</th>
                                            <th>Name <div className="sort-icons"><span className="sort-icon">â–²</span><span className="sort-icon">â–¼</span></div></th>
                                            <th>College Name <div className="sort-icons"><span className="sort-icon">â–²</span><span className="sort-icon">â–¼</span></div></th>
                                            <th>Educational Degree <div className="sort-icons"><span className="sort-icon">â–²</span><span className="sort-icon">â–¼</span></div></th>
                                            <th>Email <div className="sort-icons"><span className="sort-icon">â–²</span><span className="sort-icon">â–¼</span></div></th>
                                            <th>Phone <div className="sort-icons"><span className="sort-icon">â–²</span><span className="sort-icon">â–¼</span></div></th>
                                            <th>Date <div className="sort-icons"><span className="sort-icon">â–²</span><span className="sort-icon">â–¼</span></div></th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                                    Loading all enquiries...
                                                </td>
                                            </tr>
                                        ) : enquiries.length === 0 ? (
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                                    No enquiries found.
                                                </td>
                                            </tr>
                                        ) : enquiries.filter(item => 
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
                                                <td style={{fontWeight: 600, color: '#333'}}>{item.name}</td>
                                                <td>{item.collegeName}</td>
                                                <td>{item.educationalDegree}</td>
                                                <td style={{color: '#10b1ba'}}>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</td>
                                                <td>
                                                    <div className="action-icons">
                                                        <span className="action-icon" onClick={() => { setSelectedEnquiry(item); setIsModalOpen(true); }}>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </span>
                                                        <span className="action-icon">
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                        </span>
                                                        <span className="action-icon" style={{color: '#10b1ba'}} onClick={() => handleDeleteSelected([item._id])}>
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

            {/* Student Details Modal */}
            {isModalOpen && selectedEnquiry && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{selectedEnquiry.source === 'Contact Form' ? 'Enquiry Details' : selectedEnquiry.source === 'Resume' ? 'Resume Details' : 'Student Details'}</h3>
                            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-line">
                                <strong>Enquiry Date:</strong> {selectedEnquiry.createdAt ? new Date(selectedEnquiry.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                            </div>

                            {selectedEnquiry.source === 'Registration' && (
                                <>
                                    <div className="detail-line"><strong>Name of the Student:</strong> {selectedEnquiry.nameOfTheStudent || selectedEnquiry.name || 'N/A'}</div>
                                    <div className="detail-line"><strong>College/Institute Name:</strong> {selectedEnquiry.collegeName || 'N/A'}</div>
                                    <div className="detail-line"><strong>College Address:</strong> {selectedEnquiry.collegeAddress || 'N/A'}</div>
                                    <div className="detail-line"><strong>Educational Degree:</strong> {selectedEnquiry.educationalDegree || 'N/A'}</div>
                                    <div className="detail-line"><strong>Branch:</strong> {selectedEnquiry.branch || 'N/A'}</div>
                                    <div className="detail-line"><strong>Last year/semester percentage/grade obtained:</strong> {selectedEnquiry.lastYearPercentageGrade || 'N/A'}</div>
                                    <div className="detail-line"><strong>Candidate email id:</strong> {selectedEnquiry.email || 'N/A'}</div>
                                    <div className="detail-line"><strong>Candidate Phone number:</strong> {selectedEnquiry.phone || 'N/A'}</div>
                                    <div className="detail-line"><strong>Candidate emergency contact number:</strong> {selectedEnquiry.emergencyPhone || 'N/A'}</div>
                                    <div className="detail-line"><strong>Candidate Address:</strong> {selectedEnquiry.address || 'N/A'}</div>
                                    <div className="detail-line"><strong>Candidate Aadhar Card Number:</strong> {selectedEnquiry.aadharCardNumber || 'N/A'}</div>
                                    <div className="detail-line"><strong>Candidate PAN number:</strong> {selectedEnquiry.panNumber || 'N/A'}</div>
                                    <div className="detail-line"><strong>Internship technologies interested in:</strong> {(selectedEnquiry.internshipInterestedTechnologies || []).join(', ') || 'N/A'}</div>
                                    <div className="detail-line"><strong>Working Style:</strong> {selectedEnquiry.workingStyle || 'N/A'}</div>
                                </>
                            )}
                            
                            {selectedEnquiry.source === 'Contact Form' && (
                                <>
                                    <div className="detail-line"><strong>Name:</strong> {selectedEnquiry.name || 'N/A'}</div>
                                    <div className="detail-line"><strong>Email id:</strong> {selectedEnquiry.email || 'N/A'}</div>
                                    <div className="detail-line"><strong>Phone number:</strong> {selectedEnquiry.phone || 'N/A'}</div>
                                    <div className="detail-line"><strong>Service / Reason:</strong> {selectedEnquiry.serviceType || 'N/A'}</div>
                                    <div className="detail-line"><strong>Message:</strong> {selectedEnquiry.message || 'N/A'}</div>
                                </>
                            )}

                            {selectedEnquiry.source === 'Resume' && (
                                <>
                                    <div className="detail-line"><strong>Name:</strong> {selectedEnquiry.name || 'N/A'}</div>
                                    <div className="detail-line"><strong>Email id:</strong> {selectedEnquiry.email || 'N/A'}</div>
                                    <div className="detail-line"><strong>Phone number:</strong> {selectedEnquiry.phone || 'N/A'}</div>
                                    <div className="detail-line"><strong>Resume Link/Details:</strong> {selectedEnquiry.resume || 'N/A'}</div>
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn" onClick={() => handlePrintSingle(selectedEnquiry)}>Print</button>
                            <button className="modal-btn" onClick={() => setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationsEnquiry;

