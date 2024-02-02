const nodemailer = require('nodemailer');

const emailData = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true, // use SSL
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});


const InviteMail = ({ project_name, token, unique_key, email, by }) => {
    try {


        const Mailoptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: `Progress - ${by} has send an Invitation`,
            html: `${by} Invited you to join their "${project_name}" project
        <a href="${process.env.APP_URL}/invite?key=${unique_key}&token=${token}">Click here to join</a>
        `,
        };
        emailData.sendMail(Mailoptions, function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been sent: ", success.response);
            }
        });
    } catch (error) {
        console.log("Some error occured")
    }
}




















const PasswordReset = ({ token, email }) => {
    try {

        const emailData = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true, // use SSL
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const Mailoptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: "Please Verify User Account",
            html: `<p>Copy this token : ${token} and enter in otp section
         <a href="http://localhost:3000/api/reset-password?email=${email}&token=${token}">
         Reset password</a> 
        </p>
        ${token}
        `,
        };
        emailData.sendMail(Mailoptions, function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been sent: ", success.response);
            }
        });
    } catch (error) {
        console.log("Some Error Occurred while sending the email", error);
    }
}


module.exports = {  PasswordReset, InviteMail }