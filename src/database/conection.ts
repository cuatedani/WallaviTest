import mongoose from 'mongoose';

const createConexion = (dbName: string) => {
    const uri = `mongodb+srv://admin:12345@cluster0.0ifpfe7.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
    return mongoose.createConnection(uri);
};

const getConexion = (dbName: string) => {
    let [conexion] = mongoose.connections.filter(conn => conn.name === dbName);

    if (!conexion) {
        conexion = createConexion(dbName);
    }

    return conexion;
};

export default getConexion;
