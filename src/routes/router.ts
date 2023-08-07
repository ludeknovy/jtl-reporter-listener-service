import * as fastify from "fastify"
import { testRunRouter } from "./v2/testRun/testRunRouter"
import { testRunRouterV3 } from "./v3/testRun/testRunRouter"

export default async (app: fastify.FastifyInstance) => {
    await testRunRouter(app)
    testRunRouterV3(app)
}
