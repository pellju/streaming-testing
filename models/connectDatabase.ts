import { db } from './index'

const connectToDatabase = async(action: () => Promise<void>) => {
    try {
        const mongoUrl: string = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`; 
        console.log(mongoUrl);
        await db.mongoose.connect(mongoUrl);
        await action();
    } catch (e: any) {
        console.log("Error:");
        console.log(e.message);
        process.exit(1);
    }
}

export { connectToDatabase }