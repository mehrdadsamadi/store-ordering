import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
const cached = {};

// import all models
import "@/models/category.model"
import "@/models/brand.model"
import "@/models/feature.model"
import "@/models/specification.model"
import "@/models/product.model"
import "@/models/store.model"
import "@/models/user.model"
import "@/models/session.model"

async function connectMongo() {
    if (!MONGO_URI) {
        throw new Error('Please define the MONGO_URI environment variable inside .env.local');
    }
    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGO_URI, opts);
    }
    try {
        cached.connection = await cached.promise;
    } catch (e) {
        cached.promise = undefined;
        throw e;
    }
    return cached.connection;
}
export default connectMongo;