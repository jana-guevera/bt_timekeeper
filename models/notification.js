const mongoose = require("mongoose");

const connection = mongoose.createConnection(process.env.ONLINE_DB);

// Notification Types
// 1 -> Signal Alert
// 2 -> Price Alert
// 3 -> Error Alert

const notificationScheme = mongoose.Schema({
  dateAdded: {
    type: Date,
    default: new Date(),
  },
  message: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isEmailSend: {
    type: Boolean,
    default: false,
  },
});

const Notification = connection.model("Notification", notificationScheme);

module.exports = Notification;
