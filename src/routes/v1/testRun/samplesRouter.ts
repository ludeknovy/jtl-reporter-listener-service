import * as fastify from "fastify"

import { logSamples } from "./logSamples"

export const samplesRouter = async (app: fastify.FastifyInstance) => {
    app.register(await logSamples, { prefix: "/api/v1/log-samples" })
}
