const appModel = require('../models/applicationModel');
const mongoose = require('mongoose');

async function getDashboardStats(req, res) {

  try {

    const stats = await appModel.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.user.userId) }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      totalApplications: stats.map(item => item.count).reduce((a, b) => a + b, 0),
      saved: stats.find(item => item._id === 'Saved')?.count || 0,
      interview: stats.find(item => item._id === 'Interview')?.count || 0,
      rejected: stats.find(item => item._id === 'Rejected')?.count || 0,
      offer: stats.find(item => item._id === 'Offer')?.count || 0
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching dashboard stats",
        error: error.message
    });

  }

}

async function getDashboardRecent(req, res) {
    try {
        const recentApplications = await appModel.find({ user: req.user.userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('resume', 'title fileUrl');

            if(!recentApplications || recentApplications.length === 0) {
                return res.status(404).json({ recentApplications: [] });
            }
            
        res.status(200).json({
            message: "Recent applications fetched successfully",
            recentApplications: recentApplications.map(app => ({
                companyName: app.companyName,
                jobTitle: app.jobTitle,
                status: app.status,
                createdAt: app.createdAt,
            }))
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching recent applications",
            error: error.message
        });
    }
}

async function getDashboardMonthly(req, res) {
     try {

    const monthly = await appModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.userId)
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    const formatted = monthly.map(item => ({
      year: item._id.year,
      month: item._id.month,
      applications: item.count
    }));

    res.status(200).json({
      message: "Monthly analytics fetched successfully",
      monthlyApplications: formatted
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching monthly analytics"
    });

  }
}

module.exports = { getDashboardStats, getDashboardRecent, getDashboardMonthly };