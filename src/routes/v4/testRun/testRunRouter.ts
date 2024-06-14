import * as fastify from "fastify"

import { logSamplesV4 } from "./logSamplesV4"

export const testRunRouterV4 = (app: fastify.FastifyInstance) => {
    app.register(logSamplesV4, { prefix: "/api/v4/test-run" })
}
