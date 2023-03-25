const mongoose = require("mongoose");

const URlsSchema = mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    origin: String,
    token: String,
  },
  { timestamps: true }
);

const Urls = mongoose.model("Urls", URlsSchema);

module.exports = Urls;
