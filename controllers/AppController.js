const utils = require('../utils');

const AppController = {
  getStatus: (req, res) => {
    // Check Redis and DB status using utils
    const redisStatus = utils.checkRedis();
    const dbStatus = utils.checkDB();

    // Return status with a 200 status code
    res.status(200).json({ redis: redisStatus, db: dbStatus });
  },

  getStats: (req, res) => {
    // Count users and files from collections
    const usersCount = utils.countUsers();
    const filesCount = utils.countFiles();

    // Return counts with a 200 status code
    res.status(200).json({ users: usersCount, files: filesCount });
  },
};

module.exports = AppController;
