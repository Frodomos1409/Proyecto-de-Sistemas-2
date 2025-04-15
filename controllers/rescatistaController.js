// --- animal.controller.js (o el nombre que le hayas dado) ---

// Importa TODOS los modelos necesarios
const AnimalSQL = require('../models/postgres/Animal.pg');
const AnimalMongo = require('../models/mongo/AnimalMongo');
const RescatistaSQL = require('../models/postgres/Rescatista.pg'); // Verifica que este path y nombre sean correctos
const RescatistaMongo = require('../models/mongo/RescatistaMongo'); // Usa el nombre exacto que exportaste

/**
 * @description Crea un Rescatista y un Animal asociados en ambas bases de datos.
 *              Espera recibir datos combinados en req.body.
 */
exports.create = async (req, res) => {
  console.log('--- Iniciando Petición POST /create ---');
  console.log('Datos recibidos en req.body:', JSON.stringify(req.body, null, 2)); // LOG 1: Verifica qué llega exactamente

  try {
    // 1. Separar los datos del request
    const {
      // Datos del Rescatista
      nombreRescatista,
      telefonoRescatista,
      fechaRescate,         // Clave esperada del JSON
      ubicacionRescate,     // Clave esperada del JSON

      // Datos del Animal (el resto)
      ...animalData // Contiene nombre, especie, raza, edad, estado, etc.
    } = req.body;

    // 2. Validaciones básicas (puedes añadir más)
    if (!nombreRescatista || !telefonoRescatista || !fechaRescate || !ubicacionRescate || !animalData.nombre) {
      console.error('Error: Faltan datos requeridos en la solicitud.');
      return res.status(400).json({ error: 'Faltan datos requeridos para el rescatista o el animal. Asegúrate de enviar: nombreRescatista, telefonoRescatista, fechaRescate, ubicacionRescate y los datos básicos del animal (ej: nombre).' });
    }

    console.log('Datos desestructurados:'); // LOG 2: Verifica los valores después de desestructurar
    console.log(`  fechaRescate: ${fechaRescate} (Tipo: ${typeof fechaRescate})`);
    console.log(`  ubicacionRescate: ${ubicacionRescate} (Tipo: ${typeof ubicacionRescate})`);

    // 3. Preparar datos para los modelos de Rescatista
    // *** ¡CRÍTICO PARA EL ERROR notNull! ***
    // Asegúrate que las CLAVES aquí ('nombre', 'telefono', 'fechaRescate', 'ubicacionRescate')
    // coincidan EXACTAMENTE con los nombres de los campos definidos en tu MODELO Sequelize RescatistaSQL.
    // Si tu modelo Sequelize usa snake_case (ej: fecha_rescate), cambia la clave aquí.
    // Basado en el error "Rescatista.fechaRescate", asumimos que el modelo usa camelCase.
    const rescatistaSqlData = {
      nombre: nombreRescatista,
      telefono: telefonoRescatista,
      fechaRescate: fechaRescate,          // Usar la variable directamente
      ubicacionRescate: ubicacionRescate   // Usar la variable directamente
    };

    // Datos para Mongo (los nombres de campo deben coincidir con RescatistaSchema)
    const rescatistaMongoData = {
      nombre: nombreRescatista,
      telefono: telefonoRescatista,
      fechaRescate: fechaRescate,
      ubicacionRescate: ubicacionRescate,
      animales: [] // Inicialmente vacío
    };

    console.log('Datos a enviar a RescatistaSQL.create:', JSON.stringify(rescatistaSqlData, null, 2)); // LOG 3: Verifica el objeto final para SQL

    // 4. Crear Rescatista en ambas BDs
    // La siguiente línea es la que probablemente lanzaba el error si los datos eran incorrectos/nulos
    const nuevoRescatistaSql = await RescatistaSQL.create(rescatistaSqlData);
    console.log('Rescatista creado en SQL:', nuevoRescatistaSql.toJSON());

    const nuevoRescatistaMongo = await new RescatistaMongo(rescatistaMongoData).save();
    console.log('Rescatista creado en Mongo:', nuevoRescatistaMongo.toJSON());

    // Obtener IDs del rescatista recién creado
    const rescatistaSqlId = nuevoRescatistaSql.id; // Asume que la PK en SQL es 'id'
    const rescatistaMongoId = nuevoRescatistaMongo._id;
    console.log(`IDs Rescatista - SQL: ${rescatistaSqlId}, Mongo: ${rescatistaMongoId}`);

    // 5. Preparar datos para los modelos de Animal
    // Asume que la Foreign Key en tu tabla SQL de Animales se llama 'rescatista_id'
    // y la referencia en el schema Mongo se llama 'rescatistaId'. AJUSTA SI ES DIFERENTE.
    const animalSqlData = {
      ...animalData,
      rescatista_id: rescatistaSqlId // Ajusta 'rescatista_id' si tu FK tiene otro nombre
    };
    // La referencia en Mongo debe coincidir con el nombre en AnimalSchema
    const animalMongoData = {
      ...animalData,
      rescatistaId: rescatistaMongoId
    };

    console.log('Datos a enviar a AnimalSQL.create:', JSON.stringify(animalSqlData, null, 2));
    console.log('Datos a enviar a AnimalMongo.save:', JSON.stringify(animalMongoData, null, 2));

    // 6. Crear Animal en ambas BDs
    const nuevoAnimalSql = await AnimalSQL.create(animalSqlData);
    console.log('Animal creado en SQL:', nuevoAnimalSql.toJSON());

    const nuevoAnimalMongo = await new AnimalMongo(animalMongoData).save();
    console.log('Animal creado en Mongo:', nuevoAnimalMongo.toJSON());

    // Obtener el ID del animal de Mongo
    const animalMongoId = nuevoAnimalMongo._id;

    // 7. Actualizar el Rescatista en Mongo para añadir la referencia al Animal
    console.log(`Actualizando Rescatista Mongo (${rescatistaMongoId}) para añadir Animal (${animalMongoId})`);
    const updatedRescatistaMongo = await RescatistaMongo.findByIdAndUpdate(
        rescatistaMongoId,
        { $push: { animales: animalMongoId } },
        { new: true } // Opción para devolver el documento actualizado
    );
    console.log('Rescatista Mongo actualizado:', updatedRescatistaMongo.toJSON());

    // 8. Responder con éxito y los datos creados
    console.log('--- Petición POST /create completada exitosamente ---');
    res.status(201).json({
        mensaje: "Rescatista y Animal creados exitosamente en ambas bases de datos.",
        rescatista: {
            sql: nuevoRescatistaSql,
            mongo: updatedRescatistaMongo // Devolvemos el rescatista ya actualizado
        },
        animal: {
            sql: nuevoAnimalSql,
            mongo: nuevoAnimalMongo
        }
    });

  } catch (err) {
    console.error("--- ERROR en Petición POST /create ---");
    console.error("Error completo:", err); // Loguea el error completo para más detalles
    // Diferenciar errores de validación de BD de otros errores
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError' || err.message.includes('notNull Violation')) {
       res.status(400).json({ error: `Error de validación de base de datos (SQL): ${err.message}` });
    } else if (err.name === 'ValidationError') { // Error de validación de Mongoose
       res.status(400).json({ error: `Error de validación de base de datos (Mongo): ${err.message}` });
    } else {
       res.status(500).json({ error: err.message || "Ocurrió un error interno en el servidor." });
    }
  }
};

// --- OTRAS FUNCIONES CRUD (GetAll, GetById, Update, Delete para Animales) ---
// (Incluye las versiones corregidas/mejoradas de la respuesta anterior si las necesitas)

/**
 * @description Obtiene todos los animales con la información de su rescatista.
 */
exports.getAll = async (req, res) => {
  try {
    // Asume que la asociación 'RescatistaSQL' está definida en AnimalSQL
    const sql = await AnimalSQL.findAll({ include: [RescatistaSQL] });
    const mongo = await AnimalMongo.find().populate('rescatistaId'); // Popula usando la referencia
    res.json({ sql, mongo });
  } catch (err) {
    console.error("Error en getAll:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * @description Obtiene un animal por su ID con la información de su rescatista.
 */
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    // Asume que la asociación 'RescatistaSQL' está definida en AnimalSQL
    const sql = await AnimalSQL.findByPk(id, { include: [RescatistaSQL] });
    const mongo = await AnimalMongo.findById(id).populate('rescatistaId');

    if (!sql && !mongo) {
        return res.status(404).json({ mensaje: 'Animal no encontrado en ninguna BD' });
    }
     if (!sql) {
        console.warn(`Animal ${id} encontrado en Mongo pero no en SQL`);
    }
    if (!mongo) {
        console.warn(`Animal ${id} encontrado en SQL pero no en Mongo`);
    }

    res.json({ sql, mongo });
  } catch (err) {
    console.error("Error en getById:", err);
    // Podría ser un ID mal formado para Mongo
    if (err.name === 'CastError') {
        return res.status(400).json({ error: `ID inválido: ${err.message}`});
    }
    res.status(500).json({ error: err.message });
  }
};

/**
 * @description Actualiza un animal existente en ambas BD. No permite cambiar rescatista.
 */
exports.update = async (req, res) => {
  try {
    const id = req.params.id; // ID del Animal a actualizar
    const dataToUpdate = req.body;

    // Prevenir cambio de rescatista por esta vía
    if (dataToUpdate.rescatistaId || dataToUpdate.rescatista_id) {
        console.warn(`Intento de actualizar rescatistaId/rescatista_id para animal ${id}`);
        return res.status(400).json({ error: "La reasignación de rescatista no está permitida en esta ruta. Usa una ruta específica si es necesario."});
    }

    // Actualizar en SQL
    const [sqlUpdatedCount] = await AnimalSQL.update(dataToUpdate, { where: { id } });

    // Actualizar en Mongo
    const mongoUpdated = await AnimalMongo.findByIdAndUpdate(id, dataToUpdate, { new: true, runValidators: true }); // new: true devuelve el doc actualizado, runValidators aplica validaciones del schema

    if (sqlUpdatedCount === 0 && !mongoUpdated) {
         // Si no se actualizó nada y tampoco se encontró en Mongo (findByIdAndUpdate devuelve null si no encuentra)
         return res.status(404).json({ mensaje: 'Animal no encontrado para actualizar en ninguna BD' });
    }
     if (sqlUpdatedCount === 0) {
         console.warn(`Animal ${id} actualizado en Mongo pero no encontrado/actualizado en SQL`);
     }
     if (!mongoUpdated) {
          console.warn(`Animal ${id} actualizado en SQL pero no encontrado/actualizado en Mongo`);
     }

    res.json({ mensaje: 'Animal actualizado en ambas BD (si existía)', sqlRowsAffected: sqlUpdatedCount, mongo: mongoUpdated });
  } catch (err) {
     console.error("Error en update:", err);
     if (err.name === 'CastError') {
        return res.status(400).json({ error: `ID inválido: ${err.message}`});
    }
    if (err.name === 'ValidationError') { // Error de validación de Mongoose al actualizar
       return res.status(400).json({ error: `Error de validación de base de datos (Mongo): ${err.message}` });
    }
    res.status(500).json({ error: err.message });
  }
};

/**
 * @description Elimina un animal de ambas BD y actualiza la referencia en el Rescatista (Mongo).
 */
exports.delete = async (req, res) => {
  try {
    const id = req.params.id; // ID del Animal a eliminar

    // 1. Encontrar el animal en Mongo para saber a qué rescatista pertenece ANTES de borrarlo
    const animalMongo = await AnimalMongo.findById(id).select('rescatistaId').lean(); // Solo necesitamos rescatistaId, lean() para objeto plano

    // 2. Eliminar el animal en SQL
    const sqlDeletedCount = await AnimalSQL.destroy({ where: { id } });

    // 3. Eliminar el animal en Mongo
    const mongoDeleted = await AnimalMongo.findByIdAndDelete(id);

    if (sqlDeletedCount === 0 && !mongoDeleted) {
       return res.status(404).json({ mensaje: 'Animal no encontrado para eliminar en ninguna BD' });
    }

    // 4. Si el animal existía en Mongo y tenía un rescatista asociado, quitar la referencia
    if (animalMongo && animalMongo.rescatistaId) {
      console.log(`Eliminando referencia del animal ${id} del rescatista ${animalMongo.rescatistaId}`);
      await RescatistaMongo.findByIdAndUpdate(
        animalMongo.rescatistaId,
        { $pull: { animales: id } } // $pull elimina el valor del array
      );
    } else if (mongoDeleted) {
        console.warn(`Animal ${id} eliminado de Mongo no tenía rescatistaId asociado o no se pudo leer antes.`);
    }

     if (sqlDeletedCount === 0) {
        console.warn(`Animal ${id} eliminado en Mongo pero no encontrado/eliminado en SQL`);
    }
    if (!mongoDeleted) {
        console.warn(`Animal ${id} eliminado en SQL pero no encontrado/eliminado en Mongo`);
    }


    res.json({ mensaje: 'Animal eliminado de ambas BD (si existía) y referencia actualizada en Rescatista (Mongo)' });
  } catch (err) {
    console.error("Error en delete:", err);
    if (err.name === 'CastError') {
        return res.status(400).json({ error: `ID inválido: ${err.message}`});
    }
    res.status(500).json({ error: err.message });
  }
};