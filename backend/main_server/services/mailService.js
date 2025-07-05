const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const sendFeedbackEmail = async ({ subject, content, from, attachments }) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.MAIL_SENDER,     // e.g., your Gmail address
            pass: process.env.MAIL_PASSWORD    // App password
        }
    });

    const formattedAttachments = attachments.map((file) => ({
        filename: file.originalname,
        path: file.path
    }));

    const mailOptions = {
        from,
        to: process.env.FEEDBACK_RECEIVER,  // Your fixed email
        subject: `Feedback from ${from}: ${subject}`,
        text: content,
        attachments: formattedAttachments
    };
    
    console.log("Attachments received in mailer:", attachments);

    await transporter.sendMail(mailOptions);
};

module.exports = { sendFeedbackEmail };
