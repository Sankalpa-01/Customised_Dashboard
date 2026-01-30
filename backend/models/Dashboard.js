const mongoose = require("mongoose");

const WidgetSchema = new mongoose.Schema({
  id: String,
  type: String,
  title: String,
  config: Object,
});

const DashboardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  layout: [String],
  widgets: [WidgetSchema],
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
