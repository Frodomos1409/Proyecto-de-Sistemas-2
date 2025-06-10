const { v4: uuidv4 } = require('uuid');
const mongo = require('./mongoGeoController');
const pg = require('./pgGeoController');

module.exports = {
  create: async (req, res) => {
    try {
      const id = uuidv4();
      const data = req.body;
      const postgres = await pg.createDirect(data, id);
      const mongoResult = await mongo.createDirect(data, id);
      res.status(201).json({ postgres, mongo: mongoResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const postgres = await pg.getAllDirect();
      const mongoResult = await mongo.getAllDirect();
      res.json({ postgres, mongo: mongoResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const postgres = await pg.getByIdDirect(req.params.id);
      const mongoResult = await mongo.getByIdDirect(req.params.id);
      res.json({ postgres, mongo: mongoResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      const postgres = await pg.updateDirect(req.params.id, data);
      const mongoResult = await mongo.updateDirect(req.params.id, data);
      res.json({ postgres, mongo: mongoResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const postgres = await pg.deleteDirect(req.params.id);
      const mongoResult = await mongo.deleteDirect(req.params.id);
      res.json({ postgres, mongo: mongoResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
