// controllers/historicoController.js
const pgHist    = require('./pgHistoricoController');
const mongoHist = require('./mongoHistoricoController');

exports.getAll = async (req, res) => {
  try {
    const { animalId } = req.params;
    const [postgres, mongo] = await Promise.all([
      pgHist.getHistoryDirect(animalId),
      mongoHist.getHistoryDirect(animalId)
    ]);
    res.json({ success: true, postgres, mongo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
