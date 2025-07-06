const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASSWORD,
    },
});

exports.sendVerificationEmail = async (email, token) => {
    const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_SENDER,
            to: email,
            subject: "Verify your AI Interview Coach account",
            text: `Click the following link to verify your email: ${link}`,
        });

        return { status: "Link is sent", link };
    } catch (error) {
        throw error;
    }
};
