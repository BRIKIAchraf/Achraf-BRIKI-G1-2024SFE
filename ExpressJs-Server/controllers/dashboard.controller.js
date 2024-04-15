// controllers/dashboard.controller.js

const Employe = require('../models/employe.model');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employe.countDocuments();
    const totalWithCard = await Employe.countDocuments({ login_method: 'Card' });
    const totalWithPassword = await Employe.countDocuments({ login_method: 'PassOrFingerOrCard' });
    const totalWithFingerprints = await Employe.countDocuments({ login_method: 'FingerAndPass' });

    const ageSum = (await Employe.aggregate([
      { $group: { _id: null, totalAge: { $sum: { $subtract: [new Date(), '$date_naissance'] } } } }
    ]))[0].totalAge;
    const averageAge = ageSum / totalEmployees / (365 * 24 * 60 * 60 * 1000); // Convert milliseconds to years

    res.status(200).json({
      totalEmployees,
      totalWithCard,
      totalWithPassword,
      totalWithFingerprints,
      averageAge
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats: ' + error.message });
  }
};
