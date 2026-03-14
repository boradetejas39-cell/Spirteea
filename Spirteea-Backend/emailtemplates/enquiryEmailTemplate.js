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
        <div>
            <p style="font-weight:bold; margin-bottom: 10px;">New Enquiry Received:</p>
            <p style="margin-bottom: 10px;">Name: ${enquiryData.nameOfTheStudent}</p>
            <p style="margin-bottom: 10px;">Email: ${enquiryData.email}</p>
            <p style="margin-bottom: 10px;">Phone: ${enquiryData.phone}</p>
            <p style="margin-bottom: 10px;">Address: ${enquiryData.address}</p>
        </div>
    `;
};

module.exports = { enquiryEmailTemplate };  // Export as an object
