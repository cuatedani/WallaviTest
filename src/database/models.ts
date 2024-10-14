import mongoose from 'mongoose';

// Función para crear un modelo de Mongoose
const createModel = (name: string, schema: mongoose.Schema, conexion: mongoose.Connection) => {
    const model = conexion.model(name, schema);
    return model;
};

// Función para obtener un modelo o crear uno si no existe
const getModel = (name: string, schema: mongoose.Schema, conexion: mongoose.Connection, dbName: string) => {
    let message = '';
    let model;

    if (conexion.modelNames().includes(name)) {
        model = conexion.model(name);
        message = `${dbName} - ${name}`;
        console.log('Collection Found =========>> ', message);
    } else {
        model = createModel(name, schema, conexion);
        message = `${dbName} - ${name}`;
        console.log('Collection Created ========>> ', message);
    }
    return model;
};

export default getModel;
