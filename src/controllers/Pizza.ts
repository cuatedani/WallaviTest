import mongoose, { isValidObjectId, Types } from 'mongoose';
import PizzaModel from '../models/Pizza';

export const createPizza = async (data: any) => {
  try {
    const newPizza = new PizzaModel(data);
    await newPizza.save();
    return newPizza._id;
  } catch (error) {
    console.log("Error: ", error);
    return { pizzaId: -1 };
  }
};

export const getAll = async () => {
  try {
    const pizzas = await PizzaModel.find();
    return pizzas;
  } catch (error) {
    console.log(error);
    return "Error Interno";
  }
};

export const getOne = async (pizzaId: string) => {
    try {
      const pizza = await PizzaModel.findById(pizzaId);
      if (!pizza) throw new Error('Pizza no encontrada');
      return pizza;
    } catch (error) {
      console.error('Error al obtener la pizza:', error);
      return null;
    }
}
  

export const update = async (pizzaId: string, data: any) => {
  try {
    const updatedPizza = await PizzaModel.findByIdAndUpdate(
        pizzaId,
      data,
      { new: true }
    );
    if (!updatedPizza) throw new Error('Pizza no encontrada para actualizar');
    return updatedPizza;
  } catch (error) {
    console.error('Error al actualizar la pizza:', error);
    return null;
  }
};

export const remove = async (pizzaId: string) => {
    try {
      const deletedPizza = await PizzaModel.findByIdAndDelete(pizzaId);
      if (!deletedPizza) throw new Error('Pizza no encontrada para eliminar');
      return deletedPizza;
    } catch (error) {
      console.error('Error al eliminar la pizza:', error);
      return null;
    }
  };
  
