import mongoose from "mongoose";

async function connectDB() {
	await mongoose.connect(process.env.DB_URL, {
		family: 4,
		dbName: process.env.DB_NAME,
	});
}

export { connectDB };
