import * as fastify from "fastify"

import { logSamples } from "./logSamples"

export const testRunRouter = async (app: fastify.FastifyInstance) => {
    app.register(await logSamples, { prefix: "/api/v2/test-run" })
}
