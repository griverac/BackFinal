// routes/proyecto.js
const express = require('express');
const router = express.Router();
const Proyecto = require('../models/proyecto');

// Crear un nuevo proyecto
router.post('/', async (req, res) => {
    const { titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto } = req.body;

    try {
        const nuevoProyecto = await Proyecto.crearProyecto({
            titulo,
            descripcion,
            completada,
            fecha_vencimiento,
            prioridad,
            asignado_a,
            categoria,
            costo_proyecto
        });
        res.status(201).json(nuevoProyecto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener todos los proyectos
router.get('/', async (req, res) => {
    try {
        const proyectos = await Proyecto.obtenerProyectos();
        res.status(200).json(proyectos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener un proyecto por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const proyecto = await Proyecto.obtenerProyectoPorId(id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json(proyecto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un proyecto por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const proyectoActualizado = await Proyecto.actualizarProyecto(id, data);
        if (!proyectoActualizado) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json(proyectoActualizado);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un proyecto por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const proyectoEliminado = await Proyecto.eliminarProyecto(id);
        if (!proyectoEliminado) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(204).send(); // Sin contenido
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
