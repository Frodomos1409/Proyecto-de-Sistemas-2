const UserSQL = require('../models/postgres/User.pg');
const UserMongo = require('../models/mongo/UserMongo');

exports.create = async (req, res) => {
    try {
        // Crear en PostgreSQL
        const sql = await UserSQL.create(req.body);

        // Adaptar datos para Mongo
        const userForMongo = {
            firstName: req.body.name,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        const mongo = await new UserMongo(userForMongo).save();

        res.status(201).json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAll = async (req, res) => {
    try {
        const sql = await UserSQL.findAll();
        const mongo = await UserMongo.find();
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const sql = await UserSQL.findByPk(req.params.id);
        const mongo = await UserMongo.findById(req.params.id);
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        await UserSQL.update(req.body, { where: { id: req.params.id } });
        await UserMongo.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: 'Usuario actualizado en ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await UserSQL.destroy({ where: { id: req.params.id } });
        await UserMongo.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Usuario eliminado de ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
