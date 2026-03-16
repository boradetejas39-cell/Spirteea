/**
 * Frontend API integration for all config (backend) endpoints.
 * All routes are under /api. Auth uses Bearer token (set after login).
 */

import { request, getAuthToken, setAuthToken, clearAuthToken } from './client';

export { getAuthToken, setAuthToken, clearAuthToken } from './client';
export { API_BASE_URL, API_PREFIX } from './config';

// —— Health & root ——
export const healthCheck = () => request('/health-check');
export const getApiRoot = () => request('/');

// —— Super Admin (auth) ——
export const getPublicInfo = () => request('/public-info');
export const getDashboard = () => request('/dashboard');
export const signupSuperAdmin = (body) => request('/signup', { method: 'POST', body: { name: body.name, email: body.email, password: body.password } });
export const loginSuperAdmin = (body) => request('/login', { method: 'POST', body: { email: body.email, password: body.password } });
export const resetPasswordSuperAdmin = (body) => request('/reset-password', { method: 'POST', body: { email: body.email } });
export const resetPasswordWithToken = (body) => request('/reset-password-using-link', { method: 'POST', body: { userId: body.userId, token: body.token, password: body.password } });
export const getSuperUserInfo = () => request('/');
export const updateSuperAdminPasswordByID = (body) => request('/updatePasswordByID', { method: 'PUT', body: { id: body.id, password: body.password } });

// —— Student ——
export const createStudent = (body) => request('/createStudent', { method: 'POST', body: { dataToSend: body.dataToSend } });
export const getStudents = () => request('/getStudents');
export const getStudentById = (id) => request(`/getStudentById/${id}`);
export const updateStudent = (id, body) => request(`/updateStudent/${id}`, { method: 'PUT', body });
export const softDeleteStudent = (body) => request('/softdeleteStudent', { method: 'POST', body: { ids: body.ids } });
export const permanentDeleteStudents = (body) => request('/permanentDeleteStudents', { method: 'POST', body: { ids: body.ids } });
export const getAllDeletedStudents = () => request('/getAllDeletedStudents');
export const restoreStudent = (body) => request('/restoreStudent', { method: 'POST', body: { ids: body.ids } });

// —— Enquiry ——
export const createEnquiry = (body) =>
  request('/createEnquiry', {
    method: 'POST',
    body: {
      nameOfTheStudent: body.nameOfTheStudent,
      collegeName: body.collegeName,
      collegeAddress: body.collegeAddress,
      educationalDegree: body.educationalDegree,
      branch: body.branch,
      lastYearPercentageGrade: body.lastYearPercentageGrade,
      email: body.email,
      phone: body.phone,
      emergencyPhone: body.emergencyPhone,
      address: body.address,
      aadharCardNumber: body.aadharCardNumber,
      panNumber: body.panNumber,
      internshipInterestedTechnologies: body.internshipInterestedTechnologies,
      workingStyle: body.workingStyle,
    },
  });
export const getNewEnquiriesCount = () => request('/getNewEnquiriesCount');
export const getEnquiry = () => request('/getEnquiry');
export const getAllDeletedEnquiry = () => request('/getAllDeletedEnquiry');
export const restoreEnquiry = (body) => request('/restoreEnquiry', { method: 'POST', body: { ids: body.ids } });
export const softDeleteEnquiry = (body) => request('/softDeleteEnquiry', { method: 'POST', body: { ids: body.ids } });
export const permanentDeleteEnquiry = (body) => request('/permanentDeleteEnquiry', { method: 'POST', body: { ids: body.ids } });

// —— Employee ——
export const createEmployee = (body) => request('/createEmployee', { method: 'POST', body });
export const getEmployees = () => request('/getEmployees');
export const getDeletedEmployees = () => request('/getDeletedEmployees');
export const getEmployeebyid = (id) => request(`/getEmployeebyid/${id}`);
export const updateEmployee = (id, body) => request(`/updateEmployee/${id}`, { method: 'PUT', body });
export const softDeleteEmployee = (body) => request('/softDeleteEmployee', { method: 'POST', body: { ids: body.ids } });
export const permanentDeleteEmployee = (body) => request('/permanentDeleteEmployee', { method: 'POST', body: { ids: body.ids } });
export const restoreEmployee = (body) => request('/restoreEmployee', { method: 'POST', body: { ids: body.ids } });

// —— General Enquiry (contact form) ——
export const createGeneralEnquiry = (body) =>
  request('/createGeneralController', {
    method: 'POST',
    body: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      serviceType: body.serviceType,
      message: body.message,
    },
  });
export const getGeneralEnquiry = () => request('/getGeneralEnquiry');
export const getDeletedGeneralEnquiry = () => request('/getDeletedGeneralEnquiry');
export const softDeleteGeneralEnquiry = (body) => request('/softDeleteGeneralEnquiry', { method: 'POST', body: { ids: body.ids } });
export const restoreGeneralEnquiry = (body) => request('/restoreGeneralEnquiry', { method: 'POST', body: { ids: body.ids } });
export const permanentDeleteGeneralEnquiry = (body) => request('/permanentDeleteGeneralEnquiry', { method: 'POST', body: { ids: body.ids } });

export const getResumeEnquiry = () => request('/getResumeEnquiry');
export const getDeletedResumeEnquiry = () => request('/getDeletedResumeEnquiry');
export const softDeleteResumeEnquiry = (body) => request('/softDeleteResumeEnquiry', { method: 'POST', body: { ids: body.ids } });
export const restoreResumeEnquiry = (body) => request('/restoreResumeEnquiry', { method: 'POST', body: { ids: body.ids } });
export const permanentDeleteResumeEnquiry = (body) => request('/permanentDeleteResumeEnquiry', { method: 'POST', body: { ids: body.ids } });
