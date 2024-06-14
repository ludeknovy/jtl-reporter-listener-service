import * as fastify from "fastify"
import { testRunRouterV3 } from "./v3/testRun/testRunRouter"
import { testRunRouterV4 } from "./v4/testRun/testRunRouter"

export default (app: fastify.FastifyInstance) => {
    testRunRouterV3(app)
    testRunRouterV4(app)
}
