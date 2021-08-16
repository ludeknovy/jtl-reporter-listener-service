/* eslint-disable no-console */
import * as dotenv from "dotenv"
dotenv.config()
import fastify from "fastify"
import router from "./routes/router"


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
        if (!process.env.JWT_TOKEN) {
            console.log("No JWT_TOKEN found, please set JWT_TOKEN env var")
            process.exit(1)
        }
        await app.listen(PORT, "0.0.0.0")
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}
