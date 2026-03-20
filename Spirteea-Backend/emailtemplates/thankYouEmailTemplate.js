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
     <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1B8D9B; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Thank You for Registering!</h1>
        </div>
        <div style="padding: 30px;">
            <p style="font-size: 16px;">Dear <strong>${enquiryData.nameOfTheStudent}</strong>,</p>
            <p>Thank you for your interest in the <strong>Internship Training Program</strong> at <strong>Spireeta Technologies (I) Pvt Ltd</strong>.</p>
            <p>We have received your registration details. Our HR team will review your profile and inform you about your <strong>Candidate ID</strong> and <strong>Batch ID</strong> shortly.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold; color: #1B8D9B;">Next Steps:</p>
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                    <li>Wait for the confirmation email with your ID details.</li>
                    <li>Our team may contact you for further discussion.</li>
                </ul>
            </div>

            <p>If you have any questions in the meantime, feel free to reach out to us:</p>
            <p style="margin-bottom: 5px;"><strong>Call:</strong> 0721-2990299</p>
            <p style="margin: 0;"><strong>Email:</strong> <a href="mailto:ITP@spireeta.com" style="color: #1B8D9B; text-decoration: none;">ITP@spireeta.com</a></p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="font-size: 14px; color: #777;">Warm regards,<br>
            <strong>HR Department</strong><br>
            Spireeta Technologies (I) Pvt Ltd.</p>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #999;">
            &copy; ${new Date().getFullYear()} Spireeta Technologies. All rights reserved.
        </div>
    </div>
`;
};

module.exports ={ thankYouEmailTemplate} ;
