const pg = require('./pgReportController');
const mongo = require('./mongoReportController');

module.exports = {
  getBySpecies: async (req, res) => {
    try {
      const postgres = await pg.getBySpecies();
      const mongoData = await mongo.getBySpecies();
      res.json({ postgres, mongo: mongoData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByType: async (req, res) => {
    try {
      const postgres = await pg.getByType();
      const mongoData = await mongo.getByType();
      res.json({ postgres, mongo: mongoData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getLiberationsPerMonth: async (req, res) => {
    try {
      const postgres = await pg.getLiberationsPerMonth();
      const mongoData = await mongo.getLiberationsPerMonth();
      res.json({ postgres, mongo: mongoData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getEvaluationsPerAnimal: async (req, res) => {
    try {
      const postgres = await pg.getEvaluationsPerAnimal();
      const mongoData = await mongo.getEvaluationsPerAnimal();
      res.json({ postgres, mongo: mongoData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getTransfersPerAnimal: async (req, res) => {
    try {
      const postgres = await pg.getTransfersPerAnimal();
      const mongoData = await mongo.getTransfersPerAnimal();
      res.json({ postgres, mongo: mongoData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
