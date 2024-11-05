const pool = require('../db');

// Crear un nuevo proyecto
const crearProyecto = async ({ titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto }) => {
    const fecha_creacion = new Date(); // Asignar la fecha actual
    const query = `
        INSERT INTO proyectos (titulo, descripcion, completada, fecha_creacion, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    `;
    const values = [titulo, descripcion, completada, fecha_creacion, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto];

    const res = await pool.query(query, values);
    return res.rows[0];
};

// Obtener todos los proyectos
const obtenerProyectos = async () => {
    const query = 'SELECT * FROM proyectos';
    const res = await pool.query(query);
    return res.rows;
};

// Obtener un proyecto por ID
const obtenerProyectoPorId = async (id) => {
    const query = 'SELECT * FROM proyectos WHERE id = $1';
    const res = await pool.query(query, [id]);
    return res.rows[0];
};

// Actualizar un proyecto por ID
const actualizarProyecto = async (id, data) => {
    const { titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto } = data;
    const query = `
        UPDATE proyectos
        SET titulo = $1, descripcion = $2, completada = $3, fecha_vencimiento = $4, prioridad = $5, asignado_a = $6, categoria = $7, costo_proyecto = $8
        WHERE id = $9
        RETURNING *;
    `;
    const values = [titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto, id];

    const res = await pool.query(query, values);
    return res.rows[0];
};

// Eliminar un proyecto por ID
const eliminarProyecto = async (id) => {
    const query = 'DELETE FROM proyectos WHERE id = $1 RETURNING *;';
    const res = await pool.query(query, [id]);
    return res.rows[0];
};

// Exportar los métodos
module.exports = {
    crearProyecto,
    obtenerProyectos,
    obtenerProyectoPorId,
    actualizarProyecto,
    eliminarProyecto,
};
