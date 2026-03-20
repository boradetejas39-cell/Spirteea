// export const enquiryEmailTemplate = (enquiryData) => {
//     return ` 
//          <div>
//             <p style="font-weight:bold; margin-bottom: 10px;">New Enquiry Received:</p>
//             <p style="margin-bottom: 10px;">Name: ${enquiryData.nameOfTheStudent}</p>
//             <p style="margin-bottom: 10px;">Email: ${enquiryData.email}</p>
//             <p style="margin-bottom: 10px;">Phone: ${enquiryData.phone}</p>
//             <p style="margin-bottom: 10px;">Address: ${enquiryData.address}</p>
//         </div>
// `;
// };
// const enquiryEmailTemplate = (enquiryData) => {
//     return ` 
//         <div>
//             <p style="font-weight:bold; margin-bottom: 10px;">New Enquiry Received:</p>
//             <p style="margin-bottom: 10px;">Name: ${enquiryData.nameOfTheStudent}</p>
//             <p style="margin-bottom: 10px;">Email: ${enquiryData.email}</p>
//             <p style="margin-bottom: 10px;">Phone: ${enquiryData.phone}</p>
//             <p style="margin-bottom: 10px;">Address: ${enquiryData.address}</p>
//         </div>
//     `;
// };
// module.exports = enquiryEmailTemplate;

const enquiryEmailTemplate = (enquiryData) => {
    return ` 
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #1B8D9B;">New Internship Enquiry Received</h2>
            <p><strong>Common Details:</strong></p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; width: 200px;"><strong>Name:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.nameOfTheStudent}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Emergency Phone:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.emergencyPhone || 'N/A'}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Address:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.address || 'N/A'}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Aadhar Card:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.aadharCardNumber || 'N/A'}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>PAN Number:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.panNumber || 'N/A'}</td>
                </tr>
            </table>

            <p style="margin-top: 20px;"><strong>Educational Details:</strong></p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; width: 200px;"><strong>College/Institute:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.collegeName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>College Address:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.collegeAddress || 'N/A'}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Degree:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.educationalDegree}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Branch:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.branch || 'N/A'}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Last Year Grade:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.lastYearPercentageGrade || 'N/A'}</td>
                </tr>
            </table>

            <p style="margin-top: 20px;"><strong>Internship Interests:</strong></p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; width: 200px;"><strong>Technologies:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${Array.isArray(enquiryData.internshipInterestedTechnologies) ? enquiryData.internshipInterestedTechnologies.join(', ') : enquiryData.internshipInterestedTechnologies}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Working Style:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiryData.workingStyle}</td>
                </tr>
            </table>
        </div>
    `;
};

module.exports = { enquiryEmailTemplate };  // Export as an object
