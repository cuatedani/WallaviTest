import mongoose, { Schema, Document } from 'mongoose';
import getConexion from '../database/conection';

interface IPizza extends Document {
  name: string;
  price: number;
  ingredients: { ingredient: string }[];
  favorite: boolean;
  active: boolean;
}

const PizzaSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: [
    {
      _id: false,
      ingredient: { type: String, required: true },
    }
  ],
  favorite: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
});

const db = "APIPizzas";
const connection = getConexion(db);
const PizzaModel = connection.model<IPizza>("Pizzas", PizzaSchema);

export default PizzaModel;
