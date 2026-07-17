import transporter from "../config/nodemailer.js";

const sendOTPEmail = async (email, otp) => {

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: "CampusBag Email Verification",

        html: `
            <h2>Welcome to CampusBag</h2>

            <p>Your verification code is:</p>

            <h1>${otp}</h1>

            <p>This OTP expires in 10 minutes.</p>
        `
    });

};

export default sendOTPEmail;