// // export const generalenquiryEmailTemplate = (enquiryData) => {
// //     return ` 
// //          <div>
// //             <p style="font-weight:bold; margin-bottom: 10px;">New Enquiry Received:</p>
// //             <p style="margin-bottom: 10px;">Name: ${enquiryData.name}</p>
// //             <p style="margin-bottom: 10px;">Email: ${enquiryData.email}</p>
// //             <p style="margin-bottom: 10px;">Phone: ${enquiryData.phone}</p>
// //             <p style="margin-bottom: 10px;">Phone: ${enquiryData.serviceType}</p>
// //             <p style="margin-bottom: 10px;">Phone: ${enquiryData.message}</p>
// //         </div>
// // `;
// // };

// export const generalenquiryEmailTemplate = (enquiryData) => {
//     // Create an array to hold the email content
//     const emailContent = [];

//     // Check if each field is available and add it to the email content if present
//     if (enquiryData.name) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Name: ${enquiryData.name}</p>`);
//     }
//     if (enquiryData.email) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Email: ${enquiryData.email}</p>`);
//     }
//     if (enquiryData.phone) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Phone: ${enquiryData.phone}</p>`);
//     }
//     if (enquiryData.serviceType) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Service Type: ${enquiryData.serviceType}</p>`);
//     }
//     if (enquiryData.message) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Message: ${enquiryData.message}</p>`);
//     }

//     // Return the email template with the accumulated content
//     return `
//       <div>
//         <p style="font-weight:bold; margin-bottom: 10px;">New Enquiry Received:</p>
//         ${emailContent.join('')}
//       </div>
//     `;
// };

const generalenquiryEmailTemplate = (enquiryData) => {
    return ` 
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #1B8D9B; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 22px;">New General Enquiry Received</h2>
            </div>
            
            <div style="padding: 25px;">
                <p style="font-size: 16px; margin-top: 0;">Hello Admin,</p>
                <p>You have received a new general enquiry from the website contact form. Here are the details:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; width: 35%; background-color: #fcfcfc;"><strong>Name:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${enquiryData.name || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; background-color: #fcfcfc;"><strong>Email:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${enquiryData.email}" style="color: #1B8D9B; text-decoration: none;">${enquiryData.email || 'N/A'}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; background-color: #fcfcfc;"><strong>Phone:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${enquiryData.phone || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; background-color: #fcfcfc;"><strong>Service Type:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${enquiryData.serviceType || 'General Enquiry'}</td>
                    </tr>
                </table>

                <div style="margin-top: 25px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #1B8D9B; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; font-weight: bold; color: #1B8D9B;">Message:</p>
                    <p style="margin: 0; white-space: pre-wrap;">${enquiryData.message || 'No message provided.'}</p>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px; color: #777;">
                    This enquiry was submitted from the Spireeta Contact Form.
                </p>
            </div>
            
            <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                &copy; ${new Date().getFullYear()} Spireeta Technologies. All rights reserved.
            </div>
        </div>
    `;
};

module.exports = generalenquiryEmailTemplate;

// For ES6 modules, use: 
// export default generalenquiryEmailTemplate;
