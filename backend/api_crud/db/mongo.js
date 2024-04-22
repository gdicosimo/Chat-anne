import mongoose from 'mongoose';
import { schema } from './schema.js';

const dbName = 'chatanne';
const url = `mongodb://database:27017/${dbName}?authSource=admin`;


const connectDB = async () => { 
  return mongoose.connect(url)
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    throw error;
  });
};

const connectModel = (model) => {
  return mongoose.modelNames().includes(model)
    ? mongoose.model(model)
    : mongoose.model(model, new mongoose.Schema(schema[model]));
};

const handleConnection = async (action, ...args) => {
  try {
    await connectDB();
    return await action(...args);
  } catch (error) {
    throw error.message;
  } finally {
    mongoose.connection.close();
  }
};

export const searchDB = async (model, query = {}) => {
  return handleConnection(async () => {
    const schema = connectModel(model);
    return schema.find(query);
  });
};


export const insertDB = async (model, data = {}) => {
  return handleConnection(async () => {
    const schema = connectModel(model);
    return schema.create(data);
  });
};

export const updateDB = async (model, filter = {}, update) => {
  return handleConnection(async () => {
    const schema = connectModel(model);
    return schema.findOneAndUpdate(filter, update, { new: true });
  });
};

export const deleteDB = async (model, query = {}) => {
  return handleConnection(async () => {
    const schema = connectModel(model);
    return schema.deleteOne(query);
  });
};
