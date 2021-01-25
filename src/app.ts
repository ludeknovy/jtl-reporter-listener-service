/* eslint-disable no-console */
import * as dotenv from "dotenv"
dotenv.config()
import fastify from "fastify"
import { MQService } from "./utils/MQService"

const PORT = 6000

import router from "./routes/router"

const app = fastify(
    {
        logger: true,
        trustProxy: true,
        pluginTimeout: 0,
    }
)

router(app)

export const start = async () => {
    try {
        await MQService.connect()
        await app.listen(PORT, "0.0.0.0")
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}
