const { createTransport } = require("nodemailer");

const sendMail = async (data) => {
  try {
    const transporter = createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "jana.teaching07@gmail.com",
        pass: process.env.BREVO_API_KEY,
      },
    });

    const mailOptions = {
      from: "jana.teaching07@gmail.com",
      to: data.email,
      subject: data.subject,
      text: data.message,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, info: info };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

module.exports = sendMail;
