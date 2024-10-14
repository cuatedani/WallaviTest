// Requires
import express from 'express';
import bodyParser from 'body-parser';
import PizzaRoutes from './src/routes/Pizza';
import morgan from 'morgan';
import cors from 'cors';

//Establece la conexion a la BD
import { connectDB } from './src/database/config';

const app = express();

// Middlewarer
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Enrutador
app.use('/Pizzas', PizzaRoutes);

const PORT = process.env.PORT || 7777;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Escuchando en puerto:', PORT);
    });
}).catch((error: any) => {
    console.error('Error al conectar a la base de datos:', error);
});
