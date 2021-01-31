/* eslint-disable no-console */
import * as dotenv from "dotenv"
dotenv.config()
import fastify from "fastify"
import router from "./routes/router"
import { MongoUtils } from "./utils/MongoUtils"


const PORT = 6000

const app = fastify(
    {
        logger: true,
        trustProxy: true,
        pluginTimeout: 0,
        bodyLimit: 3048576,
    }
)

router(app)

export const start = async () => {
    try {
        await MongoUtils.connect()
        await app.listen(PORT, "0.0.0.0")
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}
