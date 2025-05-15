import mongoose from "mongoose";

const MONGODB_URI =
	process.env.MONGODB_URI ||
	"mongodb+srv://cigico:fakechar11@cigi.1v9ma.mongodb.net/portfolio";

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env"
	);
}

interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
	global.mongoose = cached;
}

async function connectDB() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		};

		cached.promise = mongoose
			.connect(MONGODB_URI, opts)
			.then((mongoose) => {
				console.log("Connected to MongoDB Atlas");
				return mongoose;
			});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		console.error("Error connecting to MongoDB:", e);
		throw e;
	}

	return cached.conn;
}
export default connectDB;
