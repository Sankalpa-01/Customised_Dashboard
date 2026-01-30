const Dashboard = require("../models/Dashboard");

exports.getDashboard = async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne({ userId: "demo" });

    if (!dashboard) {
      dashboard = { layout: [], widgets: [] };
    }
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.saveDashboard = async (req, res) => {
  const { layout, widgets } = req.body;
  try {
    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: "demo" },
      { layout, widgets },
      { new: true, upsert: true },
    );
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
