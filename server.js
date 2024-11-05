// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const proyectoRoutes = require('./routes/proyecto');
const cors = require('cors');
const Stripe = require('stripe'); // Importa Stripe
require('dotenv').config(); // Cargar las variables de entorno

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Inicializa Stripe con tu clave secreta

app.use(bodyParser.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido - Examen final de Desarrollo');
});

// Ruta para crear una sesión de pago
app.post('/api/payment', async (req, res) => {
    const { amount, currency } = req.body; // Extrae la cantidad y la moneda del cuerpo de la solicitud

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: 'Proyecto de ' + req.body.title, // Personaliza el nombre del producto
                        },
                        unit_amount: amount, // La cantidad debe estar en la unidad más pequeña de la moneda (por ejemplo, centavos)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`, // URL de éxito
            cancel_url: `${process.env.FRONTEND_URL}/cancel`, // URL de cancelación
        });
        res.json({ id: session.id }); // Devuelve el ID de la sesión de pago
    } catch (error) {
        console.error('Error creando la sesión de pago:', error);
        res.status(500).send('Error al crear la sesión de pago');
    }
});

// Rutas de proyectos
app.use('/api/proyectos', proyectoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
