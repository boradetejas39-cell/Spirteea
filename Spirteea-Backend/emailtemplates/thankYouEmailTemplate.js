// export const thankYouEmailTemplate = (enquiryData) => {
//     return `   
//      <div>
//         <p style="margin-top: 20px; line-height: 1.5;">Dear ${enquiryData.nameOfTheStudent},<br><br>
//         Thank you for your interest in Internship Training Program @Spirita Technologies (I) Pvt Ltd.<br>
//         Your Candidate ID and Batch ID we will inform you shortly.<br>
//         Please reach out to us on<br>
//         Call 0721-2990299<br>
//         email at ITP@spireeta.com<br><br>
//         Warm regards,<br>
//         HR Spireeta Technologies (I) Pvt Ltd.</p>
//     </div>
// `;
// };
const thankYouEmailTemplate = (enquiryData) => {
    return `   
     <div>
        <p style="margin-top: 20px; line-height: 1.5;">Dear ${enquiryData.nameOfTheStudent},<br><br>
        Thank you for your interest in the Internship Training Program @Spireeta Technologies (I) Pvt Ltd.<br>
        Your Candidate ID and Batch ID will be informed to you shortly.<br>
        Please reach out to us on:<br>
        Call: 0721-2990299<br>
        Email: ITP@spireeta.com<br><br>
        Warm regards,<br>
        HR, Spireeta Technologies (I) Pvt Ltd.</p>
    </div>
`;
};

module.exports ={ thankYouEmailTemplate} ;
