/* eslint-disable no-console */
import { MongoClient } from "mongodb"

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27020"
const MONGO_CONNECTION_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
let mongoClient: MongoClient

export class MongoUtils {
  static async connect () {
    try {
      mongoClient = new MongoClient(MONGO_CONNECTION_STRING, MONGO_CONNECTION_CONFIG)
      await mongoClient.connect()
      console.info("Successfully connected to MongoDB")
    } catch(error) {
      console.error(`Error while connecting to MongoDB: ${error}`)
      process.exit(1)
    }
  }

  static getClient (): MongoClient {
    return mongoClient
  }
}
