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
    // Create an array to store email content
    const emailContent = [];

    // Check and add fields dynamically
    if (enquiryData.name) {
        emailContent.push(`<p style="margin-bottom: 10px;"><strong>Name:</strong> ${enquiryData.name}</p>`);
    }
    if (enquiryData.email) {
        emailContent.push(`<p style="margin-bottom: 10px;"><strong>Email:</strong> ${enquiryData.email}</p>`);
    }
    if (enquiryData.phone) {
        emailContent.push(`<p style="margin-bottom: 10px;"><strong>Phone:</strong> ${enquiryData.phone}</p>`);
    }
    if (enquiryData.serviceType) {
        emailContent.push(`<p style="margin-bottom: 10px;"><strong>Service Type:</strong> ${enquiryData.serviceType}</p>`);
    }
    if (enquiryData.message) {
        emailContent.push(`<p style="margin-bottom: 10px;"><strong>Message:</strong> ${enquiryData.message}</p>`);
    }

    // Return the formatted email template
    return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h3 style="color: #007bff;">New Enquiry Received</h3>
        ${emailContent.join('')}
      </div>
    `;
};

// Export for CommonJS
module.exports = generalenquiryEmailTemplate;

// For ES6 modules, use: 
// export default generalenquiryEmailTemplate;
