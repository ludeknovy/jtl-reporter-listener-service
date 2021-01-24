import * as fastify from "fastify"

import { testRunRouter } from "./v1/testRun/testRunRouter"

export default (app: fastify.FastifyInstance) => {
    testRunRouter(app)
}
