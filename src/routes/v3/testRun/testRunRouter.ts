import * as fastify from "fastify"

import { logSamplesV3 } from "./logSamplesV3"

export const testRunRouterV3 = (app: fastify.FastifyInstance) => {
    app.register(logSamplesV3, { prefix: "/api/v3/test-run" })
}
