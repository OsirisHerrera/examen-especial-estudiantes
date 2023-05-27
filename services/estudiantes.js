const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, nombres, apellidos, fechanac, celular, correo, cedula
    FROM estudiantes LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(estudiantes) {
    const result = await db.query(
        `INSERT INTO estudiantes
      (nombres, apellidos, fechanac, celular, correo, cedula) 
      VALUES 
      ('${estudiantes.nombres}',
       '${estudiantes.apellidos}',
       '${estudiantes.fechanac}',
       '${estudiantes.celular}',
       '${estudiantes.correo}',
       '${estudiantes.cedula}' )`
    );

    let message = 'Error creando un estudiantes';

    if (result.affectedRows) {
        message = 'estudiantes creado exitosamente';
    }

    return { message };
}

/**PUT Juegos */
async function update(id, estudiantes) {
    const result = await db.query(
        `UPDATE estudiantes
      SET
      nombres="${estudiantes.nombres}",
      apellidos="${estudiantes.apellidos}",
      fechanac="${estudiantes.fechanac}",
      celular="${estudiantes.celular}",
      correo="${estudiantes.celular}",
      cedula="${estudiantes.cedula}"
            
    WHERE id=${id}`
    );

    let message = 'Error actualizando estudiantes';

    if (result.affectedRows) {
        message = 'estudiantes actualizado correctamente';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM estudiantes WHERE id=${id}`
    );

    let message = 'Error al eliminnar estudiantes';

    if (result.affectedRows) {
        message = 'estudiantes eliminado correctamente';
    }

    return { message };
}
module.exports = {
    getMultiple,
    create,
    update,
    remove
}
