const mongoose = require("mongoose");

const connection = mongoose.createConnection(process.env.ONLINE_DB);

const timeKeeperScheme = mongoose.Schema({
  lastActive: {
    type: Date,
    default: new Date(),
  },
});

const TimeKeeper = connection.model("TimeKeeper", timeKeeperScheme);

module.exports = TimeKeeper;
