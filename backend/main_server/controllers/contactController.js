const { sendFeedbackEmail } = require("../services/mailService");
const User = require("../models/User")

exports.submitFeedback = async (req, res) => {
    try {
        const { subject, content } = req.body;

        const userCredentials = await User.findById({_id:req.user._id})

        const userEmail = userCredentials.email;

        if (!subject || !content) {
            return res.status(400).json({ message: "Subject and content are required" });
        }

        console.log("Received files:", req.files);

        const attachments = req.files || [];

        await sendFeedbackEmail({
            subject,
            content,
            from: userEmail,
            attachments
        });

        return res.status(200).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error("Feedback error:", error);
        return res.status(500).json({ message: "Failed to send feedback" });
    }
};
