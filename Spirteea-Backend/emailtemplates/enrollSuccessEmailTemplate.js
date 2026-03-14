// export const enrollSuccessEmailTemplate = (studentData) => {
//     return `   
//      <div>
//         <p style="margin-top: 20px; line-height: 1.5;">Dear ${studentData.nameOfTheStudent},<br><br>
//         Thank you for Joining Internship Training Program @Spirita Technologies (I) Pvt Ltd.<br>
//         If any query,Please reach out to us on<br>
//         Call 0721-2990299<br>
//         email at ITP@spireeta.com<br><br>
//         Warm regards,<br>
//         HR Spireeta Technologies (I) Pvt Ltd.</p>
//     </div>
// `;
// };
const enrollSuccessEmailTemplate = (studentData) => {
    return `   
        <div>
            <p style="margin-top: 20px; line-height: 1.5;">Dear ${studentData.nameOfTheStudent},<br><br>
            Thank you for Joining Internship Training Program @Spireeta Technologies (I) Pvt Ltd.<br>
            If any query, please reach out to us on:<br>
            Call 0721-2990299<br>
            Email at ITP@spireeta.com<br><br>
            Warm regards,<br>
            HR Spireeta Technologies (I) Pvt Ltd.</p>
        </div>
    `;
};

module.exports = enrollSuccessEmailTemplate;
