const express = require('express');
const router = express.Router();
const estudiantes = require('../services/estudiantes');

/* GET estudiantes. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await estudiantes.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error mientras se carga el estudiantes `, err.message);
        next(err);
    }
});

/**
 * POST estudiantes
*/

router.post('/', async function (req, res, next) {
    try {
        res.json(await estudiantes.create(req.body));
    } catch (err) {
        console.error(`Error mientras se crea el estudiante`, err.message);
        next(err);
    }
});

/* PUT estudiantes */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await estudiantes.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error mientras se actualizaba el estudiante`, err.message);
        next(err);
    }
});

/* DELETE estudiantes */
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await estudiantes.remove(req.params.id));
    } catch (err) {
        console.error(`Error mientras se eliminaba un estudiante`, err.message);
        next(err);
    }
});

module.exports = router;
