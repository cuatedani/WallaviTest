// Requires
import express from 'express';
import bodyParser from 'body-parser';
import PizzaRoutes from './src/routes/Pizza';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Middlewarer
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Enrutador
app.use('/Pizza', PizzaRoutes);

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
    console.log('Escuchando en puerto:', PORT);
});
