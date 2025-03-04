require("dotenv").config();

const Notification = require("./models/notification.js");
const TimeKeeper = require("./models/timekeeper.js");
const sendMail = require("./email.js");

const timekeeperId = process.env.TIMEKEEPER_ID;

const start = async () => {
  const timekeeper = await TimeKeeper.findById(timekeeperId);

  const lastActive = new Date(timekeeper.lastActive);
  const timeNow = new Date();

  const diffInSecs = Math.abs(timeNow - lastActive);

  if (diffInSecs >= 240000) {
    const res = await sendMail({
      email: "jeevananthanjana@gmail.com",
      subject: "BeyondTraing Bot Error",
      message: "Trading server is disconnected from the internet",
    });

    if (res.success) {
      const notification = new Notification({
        message: "Trading server is disconnected from the internet",
        type: "Error Alert",
        isEmailSend: true,
      });

      await notification.save();
    }
  }

  const notifications = await Notification.find({
    type: "Error Alert",
    isEmailSend: false,
  });

  for (var i = 0; i < notifications.length; i++) {
    const notif = notifications[i];
    const res = await sendMail({
      email: "jeevananthanjana@gmail.com",
      subject: "BeyondTraing Bot Error",
      message: notif.message,
    });

    if (res.success) {
      await Notification.findOneAndUpdate(
        { _id: notif._id },
        { isEmailSend: true }
      );
    }
  }

  setTimeout(() => {
    start();
  }, 180000);
};

start();
