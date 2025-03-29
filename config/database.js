const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado a Compass'))
.catch(err => console.log('Error en la conexión con MongoDB:', err));

module.exports = mongoose;
